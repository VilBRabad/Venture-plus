import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from "react-native-vector-icons/AntDesign"
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Snackbar from 'react-native-snackbar'
import showError from '../utils/ServerErrorSnackbar'

type NewUser = {
    name: string;
    email: string;
    password: string;
}

const addUser = async (user: NewUser) => {
    return await axios.post("http://192.168.43.37:8000/api/v1/user/register", user);
}

export default function RegisterForm() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const { mutateAsync: registerUser } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            Snackbar.show({
                text: "User register successfully",
                backgroundColor: "#228B22"
            });
            setName("");
            setEmail("");
            setPassword("");
        },
        onError: (error) => {
            showError(error);
        }
    });

    const handleRegister = async () => {
        if (email.trim() === "" || password.trim() === "" || name === "") {
            console.log("error");
            return;
        }
        try {
            registerUser({ name, email, password });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <KeyboardAvoidingView style={{ width: Dimensions.get('window').width }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', gap: 18 }}>
                <TextInput
                    placeholder='Enter name'
                    style={styles.input}
                    placeholderTextColor="#333444"
                    value={name}
                    onChangeText={setName}
                />
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
            <View style={{ marginTop: 30, width: '98%', bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
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
                <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
                    <Text style={styles.text}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        paddingTop: 30
    },
})