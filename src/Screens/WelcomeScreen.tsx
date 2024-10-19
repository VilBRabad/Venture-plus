import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import welcomeImage from "../assets/images/welcome.png";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation';
import * as Keychain from "react-native-keychain";
import { useGetUserQuery } from '../hooks/userHook';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSaveList } from '../redux/saveList/savelistSlice';
import { useAppDispatch } from '../hooks';

export default function WelcomeScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetUserQuery();

    const checkUser = async () => {
        if (!data) {
            await Keychain.resetGenericPassword();
            await AsyncStorage.removeItem("username");
            // Snackbar.show({
            //     text: "Session expire please login again",
            //     backgroundColor: "#ff0000"
            // })
        }
        else {
            dispatch(setSaveList(data.user.saveList));

            await AsyncStorage.setItem("username", `${data.user.name}`);
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }]
            });
        }
    }

    useEffect(() => {
        if (!isLoading) {
            checkUser();
        }
    }, [isLoading]);

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', width: '100%', height: '85%', justifyContent: 'center' }}>
                <Text style={styles.normalText}>Naviti Management</Text>
                <Image style={styles.image} source={welcomeImage} />
                <View style={{ marginVertical: 10, alignItems: 'center' }}>
                    <Text style={styles.descText}>Welcome to</Text>
                    <Text style={styles.descText}>Your Investment Guid</Text>
                </View>
                <Text style={styles.smallText}>Lorem Ipsum is simply dummy text of the printing and typesetting </Text>
            </View>
            <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center', height: '15%' }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Message")}>
                    <View style={styles.innerBtn}>
                        <Text style={{ color: "#000000", paddingRight: 10 }}>Next</Text>
                        <View style={styles.arrow}>
                            <Icon name='arrow-right' size={22} color="#FFFFFF" />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: 'center',
    },
    normalText: {
        fontSize: 20,
        fontWeight: '700',
        color: "#AC84FF"
    },
    image: {
        width: "100%",
        marginVertical: 10
    },
    descText: {
        fontSize: 18,
        fontWeight: '600',
        color: "#FFFFFF",
    },
    smallText: {
        textAlign: 'center',
        width: '59%',
        marginTop: 40
    },
    btn: {
        height: 47,
        width: 170,
        backgroundColor: "#AC84FF",
        borderRadius: 100,
    },
    innerBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "100%",
        flexDirection: 'row',
        position: 'relative'
    },
    arrow: {
        position: 'absolute',
        right: 5,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center'
    }
})