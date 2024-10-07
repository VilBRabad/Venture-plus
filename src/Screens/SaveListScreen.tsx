import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import StartupCard from '../components/StartupCard'
import * as Keychain from "react-native-keychain";
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import showError from '../utils/ServerErrorSnackbar';
import Snackbar from 'react-native-snackbar';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../hooks';
import { clearSaveList } from '../redux/saveList/savelistSlice';

const { width, height } = Dimensions.get("window");

const getSaveListData = async () => {
  const accessToken = await Keychain.getGenericPassword();
  const res = await axios.get("http://192.168.43.37:8000/api/v1/user/get-save-list-data", {
    headers: {
      Authorization: accessToken ? accessToken.password : undefined
    }
  })

  return res.data.data as ICompany[];
}


const removeAllSaveListItem = async () => {
  const accessToken = await Keychain.getGenericPassword();
  const res = await axios.post("http://192.168.43.37:8000/api/v1/user/remove-all-from-savelist", {}, {
    headers: {
      Authorization: accessToken ? accessToken.password : undefined
    }
  })

  return res.data;
}


export default function SaveList() {

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [isLoding, setLoding] = useState(false);

  const {
    data: saveListData,
    isLoading: saveListLoding,
    isError: saveListIsError,
    error: saveListError
  } = useQuery({
    queryKey: ["get-data-of-savelist"],
    queryFn: getSaveListData
  })

  const { mutateAsync } = useMutation({
    mutationFn: removeAllSaveListItem,
  })

  useEffect(() => {
    if (saveListIsError && !saveListLoding) {
      showError(saveListError);
    }
  }, [saveListIsError]);


  const handleRemoveAllClick = async () => {
    try {
      const data = await mutateAsync();
      dispatch(clearSaveList());
      Snackbar.show({
        text: data.message,
        backgroundColor: "#228B22"
      })
      setLoding(true);
      await queryClient.invalidateQueries({ queryKey: ["get-data-of-savelist"] });
      setLoding(false);
    } catch (error) {
      showError(error as Error);
    }
  }



  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, paddingVertical: 10 }}>
        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 25 }}>SaveList</Text>
        <Pressable onPress={handleRemoveAllClick}>
          <Text style={{ fontSize: 12 }}>Remove all</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: 'column', gap: 10 }}>
        {
          saveListLoding ?
            <View style={{ height: 700, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#AC84FF" />
            </View>
            :
            (
              saveListIsError ?
                <View style={{ height: 700, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 40, fontWeight: '600', opacity: 0.3 }}>Not found!</Text>
                </View>
                :
                saveListData && saveListData.map((comp) => (
                  <View key={comp._id}>
                    <StartupCard companyData={comp} />
                  </View>
                ))
            )
        }
      </View>
      {
        isLoding &&
        <View style={styles.lodingContainer}>
          <ActivityIndicator size="large" color="#AC84FF" />
        </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  lodingContainer: {
    position: 'absolute',
    top: 0,
    left: -15,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    zIndex: 100,
  }
})