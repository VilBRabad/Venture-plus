
import axios from 'axios';
import React from 'react';
import { View, ScrollView, Text, ActivityIndicator, Dimensions } from 'react-native';
import Config from 'react-native-config';
import * as Keychain from "react-native-keychain";
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigations/StackNavigation';
import showError from '../utils/ServerErrorSnackbar';
import MessageCard from '../components/MessageCard';


const getAllMessages = async () => {
    const accessToken = await Keychain.getGenericPassword();
    const res = await axios.get(`${Config.BASE_URL}/api/v1/user/get-all-messages`, {
        headers: {
            "Authorization": accessToken ? accessToken.password : undefined
        }
    });
    return res.data.data.messages as IMessage[];
}

const { height } = Dimensions.get("window");

export default function MailboxScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["messages"],
        queryFn: getAllMessages
    })


    if (isError) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Authentication" }]
        });
        showError(error);
    }

    return (
        <ScrollView style={{ paddingHorizontal: 15, flex: 1, minHeight: height }}>
            <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: '600' }}>Messages</Text>
                {/* <Feather name='filter' size={23} color="#FFFFFF" /> */}
            </View>
            {
                isLoading ?
                    <ActivityIndicator size="large" color="#AC84FF" />
                    :
                    data && data.length > 0 ?
                        data.map((message, ind) => (
                            <View key={ind} style={{ gap: 10, marginTop: 10 }}>
                                <MessageCard message={message} />
                            </View>
                        ))
                        :
                        <View style={{ height: 660, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No Messages</Text>
                        </View>
            }

        </ScrollView>
    )
}
