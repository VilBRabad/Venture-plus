import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Keychain from "react-native-keychain";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import StartupCard from './StartupCard';
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';

const getUserHistory = async (): Promise<ICompany[]> => {
    const accessToken = await Keychain.getGenericPassword();
    const res = await axios.get(`${Config.BASE_URL}/api/v1/user/get-user-history`, {
        headers: {
            Authorization: accessToken ? accessToken.password : undefined
        }
    })

    return res.data.data;
}

export default function UserHistory() {

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["user-history"],
        queryFn: getUserHistory
    });

    useFocusEffect(() => {
        refetch();
    })


    return (
        <View style={styles.container}>

            {
                isLoading ?
                    <ActivityIndicator size="small" />
                    :
                    !data ?
                        isError &&
                        <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#FFFFFF" }}>{error?.message}</Text>
                        </View>
                        :
                        data.map((item, ind) => (
                            <View key={ind}>
                                <StartupCard companyData={item} />
                            </View>
                        ))

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        gap: 10
    }
})