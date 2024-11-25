import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StartupGeneralScreen from '../Screens/CompanyProfileScreens.tsx/StartupGeneralScreen';
import StartupSocilaMediaScreen from "../Screens/CompanyProfileScreens.tsx/StartupSocilaMediaScreen"
import { Text } from 'react-native';
import StartupFinancialScreen from '../Screens/CompanyProfileScreens.tsx/StartupFinancialScreen';
import TechnologyScreen from '../Screens/CompanyProfileScreens.tsx/TechnologyScreen';
import StartupReviewScreen from '../Screens/CompanyProfileScreens.tsx/StartupReviewScreen';

export type RootTopTabParamList = {
    General: { data: ICompany };
    Contact: { data: ICompany };
    Financial: { data: ICompany };
    Technology: { data: string[] };
    Reviews: { data: string };
}

const TopTab = createMaterialTopTabNavigator<RootTopTabParamList>();

type TopTabNavProps = {
    data?: ICompany
}

export default function TopTabNavigation({ data }: TopTabNavProps) {
    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#000000",
                },
                tabBarLabelStyle: {
                    color: '#ffffff',
                    fontSize: 12,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#AC84FF',
                },
                tabBarScrollEnabled: true,
                tabBarItemStyle: {
                    width: 120,
                },
            }}
        >
            <TopTab.Screen
                name="General"
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={{ color: focused ? '#ffffff' : '#C0C0C0' }}>
                            General
                        </Text>
                    ),
                }}
                children={() => <StartupGeneralScreen data={data} />}
            />
            <TopTab.Screen
                name="Financial"
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={{ color: focused ? '#ffffff' : '#C0C0C0' }}>
                            Financial
                        </Text>
                    ),
                }}
                children={() => <StartupFinancialScreen data={data} />}
            />
            <TopTab.Screen
                name="Contact"
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={{ color: focused ? '#ffffff' : '#C0C0C0' }}>
                            Contact
                        </Text>
                    ),
                }}
                children={() => <StartupSocilaMediaScreen data={data} />}
            />
            <TopTab.Screen
                name="Technology"
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={{ color: focused ? '#ffffff' : '#C0C0C0' }}>
                            Technology
                        </Text>
                    ),
                }}
                children={() => <TechnologyScreen data={data?.Technologies} />}
            />
            <TopTab.Screen
                name="Reviews"
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={{ color: focused ? '#ffffff' : '#C0C0C0' }}>
                            Reviews
                        </Text>
                    ),
                }}
                children={() => <StartupReviewScreen data={data?._id} />}
            />
        </TopTab.Navigator>


    )
}