import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigations/StackNavigation'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import * as Keychain from "react-native-keychain";
import axios from 'axios'
import Config from 'react-native-config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import showError from '../utils/ServerErrorSnackbar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Snackbar from 'react-native-snackbar'

type SendMessageScreenProps = {
    route: RouteProp<RootStackParamList, "SendMessage">
}


const sendMessage = async (message: string, subject: string, links: { title: string, link: string }[] | undefined, company: string) => {
    const accessToken = await Keychain.getGenericPassword();
    if (!accessToken) throw new Error("Please login to send messages!");

    await axios.post(`${Config.BASE_URL}/api/v1/user/send-message`,
        { message, subject, links, company },
        {
            headers: {
                "Authorization": accessToken.password
            }
        }
    );
}

export default function SendMessageScreen({ route }: SendMessageScreenProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isAddLinkVisible, setAddLinkVisible] = useState<boolean>(false);
    const [attachedLinks, setAttachedLinks] = useState<{ title: string, link: string }[] | undefined>(undefined);
    const [linkTitle, setLinkTitle] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: () => sendMessage(message, subject, attachedLinks, route.params.companyName)
    })

    const addIntoLinksList = () => {
        if (link !== "" && linkTitle !== "") {
            setAttachedLinks(prev => {
                if (prev) {
                    return [...prev, { title: linkTitle, link }]
                }
                return [{ title: linkTitle, link }]
            })
            setLink("");
            setLinkTitle("");
            setAddLinkVisible(false);
        }
    }

    const removeFromLinksList = (index: number) => {
        if (attachedLinks) {
            const updatedLink = [
                ...attachedLinks.slice(0, index),
                ...attachedLinks.slice(index + 1)
            ];

            setAttachedLinks(updatedLink);
        }
    }

    const sendMessageMutate = async () => {
        try {
            await mutateAsync();
            navigation.pop();
            Snackbar.show({
                text: "Message sent!",
                backgroundColor: "#008000"
            });
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        } catch (error) {
            showError(error as Error);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 15 }}>
                <View style={styles.inputContainer}>
                    <Text style={{ fontWeight: '600', color: '#101010', fontSize: 15 }}>To: </Text>
                    <View style={styles.companyDet}>
                        <Text selectable numberOfLines={2} style={{ color: '#000000', fontWeight: '600', fontSize: 15 }}>{route.params.companyName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 5, marginTop: 25, paddingLeft: 15, borderWidth: 0.7, borderColor: '#AC84FF', minHeight: 50, paddingVertical: 10, alignItems: 'flex-start', borderRadius: 10 }}>
                    <Text style={{ color: '#e0e0e0', marginTop: 10, fontWeight: '600' }}>Subject: </Text>
                    <TextInput
                        style={{ fontSize: 14, width: '78%' }}
                        placeholder='e.g. Interested to invest'
                        multiline={true}
                        placeholderTextColor="#888"
                        textAlignVertical="top"
                        onChangeText={setSubject}
                    />
                </View>
                <View style={{ paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderWidth: 0.5, borderColor: "#AC84FF", borderRadius: 10, minHeight: 200, justifyContent: 'space-between' }}>
                    <TextInput
                        style={{ fontSize: 14, width: '100%' }}
                        placeholder='Write something....'
                        multiline={true}
                        placeholderTextColor="#888"
                        textAlignVertical="top"
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity onPress={() => setAddLinkVisible(prev => !prev)} style={{ paddingBottom: 8, paddingLeft: 5 }}>
                        <Feather name='link' size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                {isAddLinkVisible && <View style={{ marginTop: 10, borderWidth: 0.5, borderColor: "#AC84FF", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, position: 'relative' }}>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', width: '100%', borderBottomWidth: 0.3, borderBlockColor: "#909090", paddingBottom: 5 }}>
                        <Text>Title: </Text>
                        <TextInput
                            placeholder='Linkedin profile'
                            style={{ paddingVertical: 0 }}
                            onChangeText={setLinkTitle}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 4 }}>
                        <Text>Link*: </Text>
                        <TextInput
                            placeholder='www.linkedin.com/vils'
                            style={{ paddingVertical: 0 }}
                            onChangeText={setLink}
                        />
                    </View>
                    <View style={{ position: 'absolute', height: 30, bottom: -35, right: 0, flexDirection: 'row', gap: 5 }}>
                        <TouchableOpacity onPress={() => setAddLinkVisible(false)} style={{ borderWidth: 0.4, borderColor: 'red', paddingHorizontal: 13, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#FFFFFF" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addIntoLinksList} style={{ backgroundColor: "#606060", paddingHorizontal: 13, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#FFFFFF" }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                <View style={{ marginTop: 40 }}>
                    <Text style={{ color: "#FFFFFF" }}>Attached Links</Text>
                    {
                        attachedLinks && attachedLinks.map((item, ind) => (
                            <View key={ind} style={{ marginTop: 5, backgroundColor: "#A0A0A0", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <Text style={{ color: "#000000", fontWeight: '600' }}>{item.title}</Text>
                                    <Text style={{ color: "#000000", fontSize: 11 }}>{item.link}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removeFromLinksList(ind)}>
                                    <Entypo name='circle-with-cross' color="#000000" size={25} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <TouchableOpacity onPress={sendMessageMutate} style={{ paddingVertical: 10, backgroundColor: "#AC84FF", marginBottom: 10, justifyContent: 'center', alignItems: "center", borderRadius: 10, flexDirection: 'row', gap: 10 }}>
                <FontAwesome name='send' color="#000000" size={18} />
                <Text style={{ color: "#000000", fontSize: 15, fontWeight: '600' }}>Send</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#000000",
        justifyContent: 'space-between'
    },
    inputContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        paddingHorizontal: 15,
        minHeight: 70,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: "#AC84FF",
        borderRadius: 10
    },
    companyDet: {
        borderBottomWidth: 0.5,
        paddingBottom: 4,
        width: '80%',
        borderBottomColor: '#F0F0F0'
    }
})