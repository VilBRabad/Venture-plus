import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StartupGeneralScreen from '../Screens/StartupGeneralScreen';

type RootTopTabParamList = {
    General: undefined;
}

const TopTab = createMaterialTopTabNavigator<RootTopTabParamList>();


export default function TopTabNavigation() {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: "#000000" },
                tabBarLabelStyle: { color: '#ffffff', fontSize: 12 },
                tabBarIndicatorStyle: { backgroundColor: '#AC84FF' }
            }}
        >
            <TopTab.Screen name="General" component={StartupGeneralScreen} />
        </TopTab.Navigator>
    )
}