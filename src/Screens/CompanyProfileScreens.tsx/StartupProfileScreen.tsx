import { ActivityIndicator, Dimensions, Image, Pressable, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../Navigations/StackNavigation';
import TopTabNavigation from '../../Navigations/TopTabNavigation';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as Keychain from "react-native-keychain";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { removeFromList, setInList } from '../../redux/saveList/savelistSlice';
import Config from 'react-native-config';
import { useAddToSaveList, useRemoveFromSaveList } from '../../hooks/userHook';
import showError from '../../utils/ServerErrorSnackbar';

const { width, height } = Dimensions.get("window");

type ProfileProps = {
  route: RouteProp<RootStackParamList, "StartupProfile">
}


const getCompanyById = async (companyId: string) => {
  const accessToken = await Keychain.getGenericPassword()
  const res = await axios.get(`${Config.BASE_URL}/api/v1/organization/get-organization-by-id?_id=${companyId}`, {
    headers: {
      "Authorization": accessToken ? accessToken.password : undefined
    }
  })
  return res.data.data.data as ICompany;
}


export default function StartupProfileScreen({ route }: ProfileProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const savelist = useAppSelector(state => state.SaveList.list)
  const { mutateAsync: addMutation } = useAddToSaveList(route.params.companyId);
  const { mutateAsync: removeMutation } = useRemoveFromSaveList(route.params.companyId);
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["company"],
    queryFn: () => getCompanyById(route.params.companyId)
  })

  // console.log(data);
  const isInSaveList = () => {
    if (savelist.length > 0) {
      for (const item of savelist) {
        if (item === route.params.companyId) {
          return true;
        }
      }
      return false;
    }
    return false;
  }


  const handleAddToSaveList = async () => {
    try {
      await addMutation();
      queryClient.invalidateQueries({ queryKey: ["get-data-of-savelist"] });
      dispatch(setInList(route.params.companyId));
    } catch (error) {
      showError(error as Error)
    }
  }

  const handleRemoveFromSaveList = async () => {
    try {
      await removeMutation();
      queryClient.invalidateQueries({ queryKey: ["get-data-of-savelist"] });
      dispatch(removeFromList(route.params.companyId));
    } catch (error) {
      showError(error as Error)
    }
  }

  return (
    <View style={styles.container}>
      {
        isLoading ?
          <ActivityIndicator size="large" />
          :
          isError ?
            <Text style={{ color: "#FFFFFF", textAlign: 'center' }}>{error.message}</Text>
            :
            data &&
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15, paddingHorizontal: 15 }}>
                <TouchableNativeFeedback onPress={() => navigation.pop()}>
                  <Feather name='arrow-left' size={23} color="#FFFFFF" />
                </TouchableNativeFeedback>
                {/* <Feather name='more-vertical' size={22} color="#FFFFFF" /> */}
                {
                  isInSaveList() ?
                    <Pressable onPress={handleRemoveFromSaveList} >
                      <Ionicons name='bookmark' size={25} />
                    </Pressable>
                    :
                    <Pressable onPress={handleAddToSaveList} >
                      <Ionicons name='bookmark-outline' size={25} />
                    </Pressable>
                }
              </View>

              <View style={{ marginTop: 10, flexDirection: 'row', gap: 18, alignItems: 'center', paddingHorizontal: 15 }}>
                {
                  data?.logo ?
                    <Image source={{ uri: data.logo }} style={styles.image} />
                    :
                    <FontAwesome name='building-o' size={60} color="#FFFFFF" />
                }
                <View style={{ paddingRight: 100 }}>
                  <Text
                    style={{ color: "#FFFFFF", fontSize: 20, fontWeight: '600' }}
                    numberOfLines={3}
                  >
                    {data?.Company}
                  </Text>
                  <Text>{data?.City}, {data?.State}, {data?.Country}</Text>
                </View>
              </View>

              <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: "#202020", height: 2, width: '94%', marginTop: 20 }} />
              </View>

              {/* TopTabNavigation should not be inside ScrollView */}
              <View style={{ flex: 1, marginTop: 10 }}>
                <TopTabNavigation data={data} />
              </View>

              <TouchableOpacity onPress={() => navigation.push("SendMessage", { companyId: data._id, companyName: data.Company })} style={styles.message}>
                <MaterialIcons name='message' size={25} color="#000000" />
              </TouchableOpacity>
            </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1, // Ensure the container takes full height
    // paddingHorizontal: 15
    minHeight: height,
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain'
  },
  message: {
    position: 'absolute',
    height: 55,
    width: 55,
    backgroundColor: '#FFFFFF',
    right: 15,
    bottom: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  }
})
