import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from "react-native-keychain";
import showError from '../utils/ServerErrorSnackbar';
import Config from 'react-native-config';


const loginUser = async (userCredentials: { email: string, password: string }): Promise<{ user: IUser, token: { accessToken: string, refreshToken: string } }> => {
    // console.log(Config.BASE_URL);
    // const res = await axios.post(`${Config.BASE_URL}/api/v1/user/login`, userCredentials);
    const res = await axios.post(`${Config.BASE_URL}/api/v1/user/login`, userCredentials);
    // console.log(res);
    return res.data.data;
}


export default function LoginForm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoding, setLoding] = useState<boolean>(false);

    const [isVisiblePassword, setVisiblePassword] = useState(false);

    const { mutateAsync } = useMutation({
        mutationKey: ["login-user"],
        mutationFn: () => loginUser({ email, password })
    })


    const loginHandler = async () => {
        if (isLoding) return;
        try {
            setLoding(true);
            const data = await mutateAsync();
            // console.log("Data", data);
            if (data) {
                await AsyncStorage.setItem("username", data.user.name);
                await Keychain.setGenericPassword("accessToken", `${data.token.accessToken}`);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "HomePage" }]
                })
            }
        } catch (error) {
            // console.log(error);
            showError(error as Error);
        } finally {
            setLoding(false);
        }
    }

    return (
        <View style={{ width: Dimensions.get('window').width, paddingTop: 45 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 18 }}>
                <TextInput
                    placeholder='E-mail address'
                    style={styles.input}
                    keyboardType="email-address"
                    placeholderTextColor="#333444"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{ width: '80%', flexDirection: 'row', backgroundColor: "#AC84FF", paddingHorizontal: 20, borderRadius: 100, }}>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={isVisiblePassword ? false : true}
                        // style={styles.input}
                        placeholderTextColor="#333444"
                        value={password}
                        onChangeText={setPassword}
                        style={{ width: "89%", color: '#000000' }}
                    />
                    {
                        !isVisiblePassword ?
                            <Pressable onPress={() => setVisiblePassword(true)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#000000", fontWeight: '600', fontSize: 11 }}>SHOW</Text>
                            </Pressable>
                            :
                            <Pressable onPress={() => setVisiblePassword(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#000000", fontWeight: '600', fontSize: 12 }}>HIDE</Text>
                            </Pressable>

                    }
                </View>
            </View>
            <View style={{ marginTop: 50, width: '98%', bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <View style={{ height: 1, width: '40%', backgroundColor: "#AC84FF" }}></View>
                <Text style={{ color: "#AC84FF", fontWeight: 'thin' }}>Or</Text>
                <View style={{ height: 1, width: '40%', backgroundColor: "#AC84FF" }}></View>
            </View>
            <View style={[styles.oauthContainer, styles.normalContainer]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <SimpleLineIcons name='social-google' size={28} color="#AC84FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <SimpleLineIcons name='social-facebook' size={28} color="#AC84FF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <AntIcon name='apple-o' size={28} color="#AC84FF" />
                </TouchableOpacity>
            </View>
            <View style={[styles.button, styles.normalContainer]}>
                <TouchableOpacity style={[styles.submitBtn, { backgroundColor: "#AC84FF" }]} onPress={loginHandler}>
                    {
                        isLoding ?
                            <ActivityIndicator size="small" color="#000000" />
                            :
                            <Text style={styles.text}>Log in</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitBtn, { marginBottom: 10, borderWidth: 2, borderColor: "#AC84FF" }]} onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "HomePage" }]
                    })}
                >
                    <Text style={{ fontWeight: '500', color: "#FFFFFF" }}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#AC84FF",
        width: "80%",
        paddingHorizontal: 20,
        borderRadius: 100,
        color: "#000000"
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "#AC84FF",
        height: 50,
        width: 50,
        borderRadius: 100
    },
    submitBtn: {
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "#AC84FF",
        height: 48,
        borderRadius: 100,
        marginTop: 10
    },
    text: {
        color: "#000000",
        fontWeight: '600'
    },
    normalContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: "100%",
        position: 'relative',
        paddingVertical: 50
    },
    oauthContainer: {
        width: "100%",
        flexDirection: "row",
        gap: 15,
        paddingVertical: 30
    },
    button: {
        width: "100%",
        paddingVertical: 30
    },
})