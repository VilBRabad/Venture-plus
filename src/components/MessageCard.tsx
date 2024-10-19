import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigations/StackNavigation';


type MessageCardProps = {
    message: IMessage;
}

export default function MessageCard({ message }: MessageCardProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const date = new Date(message.createdAt);

    return (
        <TouchableOpacity onPress={() => navigation.navigate("showMessage", message)} style={{ padding: 10, width: '100%', backgroundColor: "#AC84FF", borderRadius: 20, position: 'relative' }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Feather name='arrow-up-left' size={23} color="#000000" />
                <Text style={{ color: "#000000" }}>Sent</Text>
            </View>
            <View style={{ marginLeft: 30, position: 'relative', paddingBottom: 25 }}>
                <Text style={{ color: "#000000", fontWeight: 'bold' }}>To: {message.receiver}.</Text>
                <Text style={{ color: "#000000", fontWeight: '600' }}>Subject: {message.subject}.</Text>
                <Text style={{ color: "#000000", fontWeight: '400', marginTop: 5 }} numberOfLines={2} ellipsizeMode='tail'>{message.content}</Text>
                {
                    date &&
                    <View style={{ position: 'absolute', right: 10, bottom: 0, flexDirection: 'row', gap: 5 }}>
                        <Text style={{ color: "#404040", fontWeight: '600', fontSize: 12 }}>
                            {date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })},
                        </Text>
                        <Text style={{ color: "#404040", fontWeight: '600', fontSize: 12 }}>
                            {date.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                    </View>
                }
            </View>
            {/* <View style={{ position: "absolute", top: 10, right: 12 }}>
                <Feather name='trash' size={20} color="#000000" />
            </View> */}
        </TouchableOpacity>
    )
}
