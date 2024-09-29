import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../Screens/HomeScreen';
import Feather from "react-native-vector-icons/Feather"
import UserProfileScreen from '../Screens/UserProfileScreen';
import SaveList from '../Screens/SaveListScreen';

export type RootTabParamList = {
    Home: undefined;
    Bookmark: undefined;
    Profile: undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#141414",
                    borderTopColor: 'transparent'
                }
            }}
            sceneContainerStyle={{ backgroundColor: "#000000" }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <Feather name='home' size={28} color="#AC84FF" />
                            :
                            <Feather name='home' size={28} color="#AAAAAA" />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={UserProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <Feather name='user' size={28} color="#AC84FF" />
                            :
                            <Feather name='user' size={28} color="#AAAAAA" />
                    ),
                }}
            />
            <Tab.Screen
                name='Bookmark'
                component={SaveList}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <Feather name='bookmark' size={28} color="#AC84FF" />
                            :
                            <Feather name='bookmark' size={28} color="#AAAAAA" />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})