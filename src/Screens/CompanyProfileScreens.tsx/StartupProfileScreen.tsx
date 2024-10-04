import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../Navigations/StackNavigation';
import TopTabNavigation from '../../Navigations/TopTabNavigation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import * as Keychain from "react-native-keychain";

const { width } = Dimensions.get("window");

type ProfileProps = {
  route: RouteProp<RootStackParamList, "StartupProfile">
}


const getCompanyById = async (companyId: string) => {
  const accessToken = await Keychain.getGenericPassword()
  const res = await axios.get(`http://192.168.43.37:8000/api/v1/organization/get-organization-by-id?_id=${companyId}`, {
    headers: {
      "Authorization": accessToken ? accessToken.password : undefined
    }
  })
  return res.data.data.data as ICompany;
}


export default function StartupProfileScreen({ route }: ProfileProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["company"],
    queryFn: () => getCompanyById(route.params.companyId)
  })

  // console.log(data);

  return (
    <View style={styles.container}>
      {
        isLoading ?
          <ActivityIndicator size="large" />
          :
          <>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15, paddingHorizontal: 15 }}>
              <TouchableNativeFeedback onPress={() => navigation.pop()}>
                <Feather name='arrow-left' size={23} color="#FFFFFF" />
              </TouchableNativeFeedback>
              <Feather name='more-vertical' size={22} color="#FFFFFF" />
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
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain'
  }
})
