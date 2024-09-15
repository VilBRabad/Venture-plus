import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"

export default function StartupCard() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
                <View style={{ marginTop: 5 }}>
                    <FontAwesome name='building' size={35} color="#000000" />
                </View>
                <View style={{ paddingBottom: 8 }}>
                    <Text style={[styles.blackText, styles.companyName]}>ArmourIQ</Text>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <Text style={[styles.blackText, { fontSize: 12 }]}>India</Text>
                        <View style={{ height: 4, width: 4, backgroundColor: "#000000", borderRadius: 100, marginTop: 5 }}></View>
                        <Text style={[styles.blackText, { fontSize: 12 }]}>Bootstrapped</Text>
                    </View>
                    <Text style={{ color: "#000000", fontSize: 15, marginVertical: 15 }}>Series A Funding</Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.category}>Cyber Security</Text>
                        </View>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.category}>IT</Text>
                        </View>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.category}>Counsulting</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Feather name='bookmark' size={30} color="#000000" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#AC84FF",
        borderRadius: 20,
        paddingHorizontal: 25,
        gap: 10,
        justifyContent: 'space-between'
    },
    blackText: {
        color: '#000000'
    },
    companyName: {
        fontSize: 19,
        fontWeight: '600'
    },
    category: {
        color: "#000000",
        fontSize: 11
    },
    categoryContainer: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 100,
    }
})