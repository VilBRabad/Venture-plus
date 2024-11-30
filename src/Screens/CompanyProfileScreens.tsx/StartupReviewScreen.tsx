import { View, Text, ScrollView, Dimensions, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import ReviewCard from '../ReviewCard';
import axios from 'axios';
import * as Keychain from "react-native-keychain";
import { useMutation, useQuery } from '@tanstack/react-query';
import showError from '../../utils/ServerErrorSnackbar';
import Ionicons from "react-native-vector-icons/Ionicons"
import Config from 'react-native-config';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get("window");


type userDetailsType = {
    name: string;
    address?: string;
}

interface reviewResponseType {
    _id: string;
    star?: number;
    message: string;
    createdAt: Date;
    userDetails: userDetailsType;
}

const getLatestReviews = async (companyId: string | undefined): Promise<reviewResponseType[]> => {
    const res = await axios.get(`${Config.BASE_URL}/api/v1/user/get-latest-reviews?companyId=${companyId}`);

    return res.data.data;
}

const sendReview = async (message: string, companyId: string | undefined) => {
    const accessToken = await Keychain.getGenericPassword();
    if (!accessToken) throw new Error("Please login to send messages!");

    const res = await axios.post(`${Config.BASE_URL}/api/v1/user/send-review-to-company`,
        { message, companyId },
        {
            headers: {
                "Authorization": accessToken.password
            }
        }
    )

    return res.data;
}

const StartupReviewScreen = ({ data }: { data: string | undefined }) => {
    const [message, setMessage] = useState<string>("");
    const [isSendingMsgLoading, setSendingMsgLoding] = useState<boolean>(false);

    const { mutateAsync } = useMutation({
        mutationFn: () => sendReview(message, data)
    })

    // console.log("ID: ", data);

    const { data: reviewsData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["latest-reviews"],
        queryFn: () => getLatestReviews(data)
    })

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    const sendReviewHandler = async () => {
        try {
            if (!message) throw new Error("Message must be given!");
            setSendingMsgLoding(true)
            await mutateAsync();
            setMessage("");
            await refetch();

        } catch (error) {
            showError(error as Error);
        }
        finally {
            setSendingMsgLoding(false);
        }
    }

    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            <View style={{ width, alignItems: 'center' }}>
                <View style={{ width: '90%', marginTop: 20 }}>
                    <Text style={{ color: "#FFFFFF" }}>Add Your Review</Text>
                    <TextInput
                        placeholder='Write something.....'
                        style={{
                            borderWidth: 1,
                            borderColor: "#AC84FF",
                            paddingHorizontal: 15,
                            minHeight: 100,
                            borderRadius: 5,
                            maxHeight: 180,
                            marginTop: 10,
                            marginBottom: 6
                        }}
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                        textAlignVertical="top"
                    />
                    <Pressable onPress={sendReviewHandler} style={{ height: 43, width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: '#AC84FF', borderRadius: 5 }}>
                        {
                            isSendingMsgLoading ?
                                <ActivityIndicator size="small" color="#000000" />
                                :
                                <Text style={{ color: "#000000", fontWeight: "600" }}>Submit</Text>
                        }
                    </Pressable>
                </View>
                <View style={{ width: "98%", borderTopWidth: 1, borderColor: "#A0A0A0", marginTop: 10 }}></View>
                <View style={{ width: "90%", marginTop: 10 }}>
                    <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>Latest</Text>
                    <View style={{ width: "100%", marginTop: 10, alignItems: 'center', gap: 10, marginBottom: 15 }}>
                        {
                            isLoading ?
                                <ActivityIndicator size="small" color="#AC84FF" />
                                :
                                isError ?
                                    <View style={{ height: "90%", width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                                        <Pressable onPress={async () => await refetch()}>
                                            <Ionicons name='reload' size={24} color="#FFFFFF" />
                                        </Pressable>
                                        <Text>Somethin went wrong, try again</Text>
                                        <Text>{error.message}</Text>
                                    </View>
                                    :
                                    reviewsData && reviewsData?.length > 0 ?
                                        reviewsData.map((review, ind) => (
                                            <ReviewCard key={ind} data={{
                                                name: review.userDetails.name,
                                                location: review.userDetails.address?.slice(0, 30),
                                                message: review.message
                                            }} />
                                        ))
                                        :
                                        <View style={{ height: "90%", width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                                            <Text>No reviews yet!</Text>
                                        </View>

                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default StartupReviewScreen