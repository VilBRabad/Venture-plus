import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StartupGeneralScreen from '../Screens/StartupGeneralScreen';
import StartupSocilaMediaScreen from "../Screens/StartupSocilaMediaScreen"

export type RootTopTabParamList = {
    General: { data: ICompany };
    Social_media: { data: ICompany };
}

const TopTab = createMaterialTopTabNavigator<RootTopTabParamList>();

type TopTabNavProps = {
    data?: ICompany
}

export default function TopTabNavigation({ data }: TopTabNavProps) {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: "#000000" },
                tabBarLabelStyle: { color: '#ffffff', fontSize: 12 },
                tabBarIndicatorStyle: { backgroundColor: '#AC84FF' }
            }}
        >
            <TopTab.Screen
                name="General"
                children={() => <StartupGeneralScreen data={data} />}
            />
            <TopTab.Screen
                name="Social_media"
                children={() => <StartupSocilaMediaScreen data={data} />}
            />
        </TopTab.Navigator>
    )
}