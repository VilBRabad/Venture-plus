import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation';
import TopTabNavigation from '../Navigations/TopTabNavigation';


const { width } = Dimensions.get("window");


export default function StartupProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
        <TouchableNativeFeedback onPress={() => navigation.pop()}>
          <Feather name='arrow-left' size={23} color="#FFFFFF" />
        </TouchableNativeFeedback>
        <Feather name='more-vertical' size={22} color="#FFFFFF" />
      </View>

      <View style={{ marginTop: 10, flexDirection: 'row', gap: 18, alignItems: 'center' }}>
        <FontAwesome name='building-o' size={60} color="#FFFFFF" />
        <View style={{ paddingRight: 100 }}>
          <Text
            style={{ color: "#FFFFFF", fontSize: 18, fontWeight: '600' }}
            numberOfLines={3}
          >
            SAATHIYAA REAL ESTATE PVT. LTD.
          </Text>
          <Text>Dahanu Road, MH</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "#202020", height: 2, width, marginTop: 20, marginLeft: -15 }} />

      {/* TopTabNavigation should not be inside ScrollView */}
      <View style={{ flex: 1, marginTop: 10 }}>
        <TopTabNavigation />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1, // Ensure the container takes full height
    paddingHorizontal: 15
  }
})
