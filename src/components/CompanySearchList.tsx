import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigations/StackNavigation';

type dataType = {
    Company: string;
    logo?: string;
    _id: string;
}

type CompanySearchListProps = {
    data: dataType[]
}

export default function CompanySearchList({ data }: CompanySearchListProps) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <>
            {data.map(item => (
                <Pressable
                    key={item._id}
                    onPress={() => navigation.navigate("StartupProfile", { companyId: item._id })}
                    style={{ paddingVertical: 8, flexDirection: 'row', gap: 10 }}
                >
                    <Image source={{ uri: item.logo }} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    <Text style={{ color: "#FFFFFF" }}>{item.Company}</Text>
                </Pressable>
            ))}
        </>

    )
}
