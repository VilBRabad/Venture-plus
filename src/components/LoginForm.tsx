import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation';
import { loginUser } from '../redux/user/userSlice';
import { useAppDispatch } from '../hooks';


export default function LoginForm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();


    const loginHandler = async () => {
        const x = await dispatch(loginUser({ email, password }));
        console.log(x);
        if (x.payload) {
            navigation.reset({
                index: 0,
                routes: [{ name: "HomePage" }]
            })
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
                <TouchableOpacity style={styles.submitBtn} onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "HomePage" }]
                    })}
                >
                    <Text style={styles.text}>Skip for now</Text>
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