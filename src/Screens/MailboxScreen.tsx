
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Feather from "react-native-vector-icons/Feather"

export default function MailboxScreen() {
    return (
        <ScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
            <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: "#FFFFFF", fontSize: 17, fontWeight: '600' }}>Messages</Text>
                <Feather name='filter' size={23} color="#FFFFFF" />
            </View>
            <View style={{ gap: 10, marginTop: 10 }}>
                <View style={{ padding: 10, width: '100%', backgroundColor: "#AC84FF", borderRadius: 20, position: 'relative' }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Feather name='arrow-up-left' size={23} color="#000000" />
                        <Text style={{ color: "#000000" }}>Sent</Text>
                    </View>
                    <View style={{ marginLeft: 30, position: 'relative', paddingBottom: 14 }}>
                        <Text style={{ color: "#000000", fontWeight: 'bold' }}>To: RELIANCE PVT. LTD.</Text>
                        <Text style={{ color: "#000000", fontWeight: '600' }}>Message: Hello their, ...</Text>
                        <Text style={{ color: "#404040", fontWeight: '600', fontSize: 12, position: 'absolute', right: 10, bottom: 0 }}>13 Jan 2024, 23:45</Text>
                    </View>
                    <View style={{ position: "absolute", top: 10, right: 12 }}>
                        <Feather name='trash' size={20} color="#000000" />
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

