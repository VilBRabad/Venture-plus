import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../Screens/HomeScreen';
import Feather from "react-native-vector-icons/Feather"
import UserProfileScreen from '../Screens/UserProfileScreen';
import SaveList from '../Screens/SaveListScreen';
import MailboxScreen from '../Screens/MailboxScreen';

export type RootTabParamList = {
    Home: undefined;
    Bookmark: undefined;
    Profile: undefined;
    Messages: undefined;
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
                        <Feather name='home' size={28} color={focused ? "#AC84FF" : "#AAAAAA"} />
                    ),
                }}
            />
            <Tab.Screen
                name='Profile'
                component={UserProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather name='user' size={28} color={focused ? "#AC84FF" : "#AAAAAA"} />
                    ),
                }}
            />
            <Tab.Screen
                name='Bookmark'
                component={SaveList}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather name='bookmark' size={28} color={focused ? "#AC84FF" : "#AAAAAA"} />
                    ),
                }}
            />
            <Tab.Screen
                name='Messages'
                component={MailboxScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather name='mail' size={28} color={focused ? "#AC84FF" : "#AAAAAA"} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})