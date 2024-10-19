import { StyleSheet, Text, ScrollView, View, Dimensions, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Keychain from "react-native-keychain";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigations/StackNavigation';
import UserHistory from '../components/UserHistory';
import { useGetUserQuery } from '../hooks/userHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import showError from '../utils/ServerErrorSnackbar';
import { useAppDispatch } from '../hooks';
import { clearSaveList } from '../redux/saveList/savelistSlice';

const { width, height } = Dimensions.get("window");

export default function UserProfileScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { data, isLoading, isError, error } = useGetUserQuery();
    const user = data?.user;
    const userProfile = data?.userProfile || undefined;
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();


    const logoutUser = async () => {
        if (!user) {
            queryClient.removeQueries({ queryKey: ["get-user", "companies", "messages"] })
            await Keychain.resetGenericPassword();
            await AsyncStorage.removeItem("username");
            navigation.reset({
                index: 0,
                routes: [{ name: "Authentication" }]
            })
            showError(error as Error);
            return;
        }
    }


    useEffect(() => {
        if (!isLoading && !data) {
            logoutUser();
        }
    }, [isLoading]);


    const navigateToUpdateProfile = () => {
        if (user) {
            navigation.navigate("UpdateProfile", { user, userProfile });
        }
    }


    const handleLogout = async () => {
        queryClient.removeQueries({ queryKey: ["get-user"] })
        await Keychain.resetGenericPassword();
        await AsyncStorage.removeItem("username");
        dispatch(clearSaveList());
        navigation.reset({
            index: 0,
            routes: [{ name: "Authentication" }]
        })
    }


    return (
        <ScrollView>
            {
                user && !isLoading ? <>
                    <View style={{ position: 'relative', height: 180, flexDirection: 'row', justifyContent: "space-between" }}>
                        <Image
                            source={{ uri: "https://img.freepik.com/premium-photo/empty-conference-room-table-with-blurred-background-people-meeting_1034924-34411.jpg" }}
                            style={{ height: '100%', width: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />
                        <View style={{ position: 'absolute', left: 10, top: 10 }}>
                            <Feather name='arrow-left' color="#FFFFFF" size={25} />
                        </View>
                        <Pressable onPress={handleLogout} style={{ position: 'absolute', right: 10, top: 10 }}>
                            <AntDesign name='logout' color="#FFFFFF" size={25} />
                        </Pressable>
                    </View>
                    <View style={styles.container}>
                        <Pressable onPress={navigateToUpdateProfile} style={{ position: 'absolute', right: 15, top: 15 }}>
                            <Feather name='edit-2' color="#FFFFFF" size={20} />
                        </Pressable>
                        <View style={{ alignItems: 'center', marginTop: -60, width }}>
                            <View style={styles.profileImage}>
                                <Image
                                    source={{ uri: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" }}
                                    style={{ height: '100%', width: '100%' }}
                                />
                                {/* <Feather name='camera' color="#000000" size={35} /> */}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', width, marginTop: 15 }}>
                            <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: '600' }}>{user.name}</Text>
                            <Text style={{ color: "#B0B0B0", fontSize: 13, marginTop: 5, fontWeight: '500' }}>{user.address}</Text>
                        </View>
                        {
                            userProfile ? <>
                                <View style={{ width, marginTop: 15, paddingHorizontal: 15 }}>
                                    <Text style={{ color: "#FFFFFF" }}>Interested In</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginVertical: 7 }}>
                                        {
                                            userProfile.focus && userProfile.focus.map((industry, ind) => (
                                                <View key={ind} style={styles.focusContainer}>
                                                    <Text style={styles.focusText}>{industry}</Text>
                                                </View>
                                            ))
                                        }
                                    </View>

                                </View>
                                <View style={{ width, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 30, paddingHorizontal: 18 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', color: "#AC84FF", fontSize: 15 }}>{userProfile.geographicPreferences}</Text>
                                        <Text style={{ fontSize: 10, color: "#A0A0A0" }}>Geo Preference</Text>
                                    </View>
                                    <View style={{ width: 1, backgroundColor: "#606060" }}></View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', color: "#AC84FF", fontSize: 15 }}>$ {Number(userProfile.fundingAmount).toLocaleString()}</Text>
                                        <Text style={{ fontSize: 10, color: "#A0A0A0" }}>Funding Amount</Text>
                                    </View>
                                    <View style={{ width: 1, backgroundColor: "#606060" }}></View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', color: "#AC84FF", fontSize: 15 }}>0</Text>
                                        <Text style={{ fontSize: 10, color: "#A0A0A0" }}>Investments</Text>
                                    </View>
                                </View>
                            </>
                                :
                                <View style={{ height: 140, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '70%', justifyContent: 'center' }}>
                                        <Text style={{ marginBottom: 10, textAlign: 'center', color: "#FFFFFF", fontWeight: '600' }}>Complete your profile to use AI</Text>
                                        <Image
                                            source={{ uri: "https://logos-world.net/wp-content/uploads/2023/05/Google-Bard-AI-Logo.png" }}
                                            style={{ height: 23, width: 23, marginLeft: 10 }}
                                        />
                                        <Text style={{ marginBottom: 10, marginTop: -8, textAlign: 'center', color: "#FFFFFF", fontWeight: '600' }}>based recommendation feature.</Text>
                                    </View>
                                    <Pressable onPress={navigateToUpdateProfile} style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#AC84FF", borderRadius: 100 }}>
                                        <Text style={{ color: "#000000", fontWeight: '600' }}>Complet Now</Text>
                                    </Pressable>
                                </View>
                        }
                        <View style={{ backgroundColor: "#101010", height: 15, width, marginVertical: 7 }}></View>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: "#FFFFFF", fontWeight: '600' }}>History</Text>
                                <Text style={{ fontSize: 12, color: "#AC84FF" }}>See all</Text>
                            </View>
                            {
                                user.history && user.history?.length > 0 ?
                                    <UserHistory />
                                    :
                                    <View style={{ flexDirection: 'column', gap: 10, marginTop: 10 }}>
                                        <View style={{ height: 250, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#303030" }}>No History</Text>
                                        </View>
                                    </View>
                            }
                        </View>
                    </View>
                </>
                    :
                    <View style={{ flex: 1, height, width, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            isLoading &&
                            <ActivityIndicator size="large" color="#AC84FF" />
                        }
                    </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        marginTop: -30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'relative'
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 100,
        // backgroundColor: "#A0A0A0",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#FFFFFF",
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden'
    },
    focusText: {
        fontSize: 12
    },
    focusContainer: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: "#505050",
        borderRadius: 10,
        // marginVertical: 5
    }
})