import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigations/StackNavigation';

type ShowMessageScreenProps = {
    route: RouteProp<RootStackParamList, "showMessage">;
}

export default function ShowMessageScreen({ route }: ShowMessageScreenProps) {
    const message = route.params;
    const date = new Date(message.createdAt);

    const navigateToExternalUrl = async (url: string) => {
        const url2 = url.split('://')[1];
        const supported = await Linking.canOpenURL(`https://${url2}`);

        if (supported) {
            try {
                await Linking.openURL(`https://${url2}`);
            } catch (err) {
                console.error('Error opening URL:', err);
                Alert.alert('Error', 'Could not open the URL.');
            }
        } else {
            console.warn('The URL is not supported:', `https://${url2}`);
            Alert.alert('Unsupported URL', 'Cannot open the URL.');
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#000000", paddingHorizontal: 15, position: 'relative' }}>
            <View style={{ width: '100%', marginTop: 20, marginBottom: 10, borderBottomWidth: 0.5, paddingBottom: 6, borderBottomColor: '#AC84FF', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>To:</Text>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{message.receiver}</Text>
            </View>
            <View style={{ width: '100%', marginTop: 20, marginBottom: 10, borderBottomWidth: 0.5, paddingBottom: 6, borderBottomColor: '#AC84FF', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>Subject:</Text>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{message.subject}</Text>
            </View>
            <View style={{ width: '100%', marginTop: 30, paddingHorizontal: 10, marginBottom: 10, paddingVertical: 30, flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 0.5, borderColor: '#AC84FF', borderRadius: 6 }}>
                <Text style={{ fontSize: 15 }}>{message.content}.</Text>
            </View>
            <View style={{ width: '100%', marginTop: 40, marginBottom: 10, paddingVertical: 6, gap: 8 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>Attached Links:</Text>
                {
                    message.links && message.links.length > 0 &&
                    message.links.map((mess, ind) => (
                        <TouchableOpacity onPress={() => navigateToExternalUrl(mess.link)} key={ind} style={{ marginTop: 5, backgroundColor: "#A0A0A0", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ color: "#000000", fontWeight: '600' }}>{mess.title}</Text>
                                <Text style={{ color: "#000000", fontSize: 11 }}>{mess.link}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            {
                date &&
                <View style={{ position: 'absolute', right: 10, bottom: -30, flexDirection: 'row', gap: 5 }}>
                    <Text style={{ color: "#505050", fontWeight: '600', fontSize: 12 }}>
                        {date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })},
                    </Text>
                    <Text style={{ color: "#606060", fontWeight: '600', fontSize: 12 }}>
                        {date.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </View>
            }
        </ScrollView>
    )
}
