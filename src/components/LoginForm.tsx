import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Snackbar from 'react-native-snackbar';
import showError from '../utils/ServerErrorSnackbar';


const loginUser = async (user: { email: string, password: string }) => {
    return await axios.post("http://192.168.43.37:8000/api/v1/user/login", user);
}


export default function LoginForm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { mutateAsync } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log(data);
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }]
            })
        },
        onError: (error) => {
            showError(error);
        }
    })

    const loginHandler = async () => {
        if (email.trim() === "" || password.trim() === "") {
            Snackbar.show({
                text: "All fields required!",
                backgroundColor: "#C70039"
            })
            return;
        }

        try {
            mutateAsync({ email, password });
        } catch (error) {
            console.log(error);
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
                <TextInput
                    placeholder='Password'
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#333444"
                    value={password}
                    onChangeText={setPassword}
                />
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
                <TouchableOpacity style={styles.submitBtn} onPress={loginHandler}>
                    <Text style={styles.text}>Log in</Text>
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
        backgroundColor: "#AC84FF",
        height: 48,
        borderRadius: 100,
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
        paddingVertical: 50
    },
    button: {
        width: "100%",
        paddingVertical: 30
    },
})