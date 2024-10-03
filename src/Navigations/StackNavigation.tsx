import { StyleSheet } from 'react-native'
import React from 'react'

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from '../Screens/WelcomeScreen';
import MessageScreen from '../Screens/MessageScreen';
import AuthScreen from '../Screens/AuthScreen';
import BottomTabNavigation from './BottomTabNavigation';
import StartupProfileScreen from '../Screens/StartupProfileScreen';
import TopTabNavigation from './TopTabNavigation';

export type RootStackParamList = {
    Welcome: undefined,
    Message: undefined,
    Authentication: undefined,
    HomePage: undefined,
    StartupProfile: { companyId: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Welcome'
                screenOptions={{
                    animation: 'slide_from_right'
                }}
            >
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Message' component={MessageScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Authentication' component={AuthScreen} options={{ headerShown: false }} />
                <Stack.Screen name='HomePage' component={BottomTabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name='StartupProfile' component={StartupProfileScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})