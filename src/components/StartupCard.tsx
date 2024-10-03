import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation'

interface ICardProps {
    companyData: ICompany;
}

export default function StartupCard({ companyData }: ICardProps) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // console.log(companyData.logo_url);

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("StartupProfile", { companyId: companyData._id })}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', gap: 15 }}>
                    <View style={{ marginTop: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <View style={{ width: 50, justifyContent: 'center' }}>
                            {companyData.logo_url ?
                                <Image
                                    source={{ uri: companyData.logo_url }}
                                    style={styles.image}
                                />
                                :
                                <FontAwesome name='building' size={35} color="#000000" />
                            }
                        </View>
                        <Text style={[styles.blackText, styles.companyName]} numberOfLines={2}>{companyData.name}</Text>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: -10, width: "100%", marginBottom: 10 }}>
                            <Text style={[styles.blackText, { fontSize: 12 }]}>{companyData.city}</Text>
                            <View style={{ height: 4, width: 4, backgroundColor: "#000000", borderRadius: 100, marginTop: 5 }}></View>
                            <Text style={[styles.blackText, { fontSize: 12 }]}>{companyData.region}</Text>
                            <View style={{ height: 4, width: 4, backgroundColor: "#000000", borderRadius: 100, marginTop: 5 }}></View>
                            <Text style={[styles.blackText, { fontSize: 12 }]}>{companyData.country_code}</Text>
                        </View>
                        {/* <Text style={{ color: "#000000", fontSize: 15, marginVertical: 7 }}>{companyData.type}</Text> */}
                        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.category}>Cyber Security</Text>
                            </View>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.category}>IT</Text>
                            </View>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.category}>Counsulting</Text>
                            </View>
                            <View style={styles.categoryContainer}>
                                <Text style={styles.category}>Trading</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    <Feather name='bookmark' size={30} color="#000000" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 25,
        gap: 10,
        justifyContent: 'space-between',
        position: 'relative'
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
        backgroundColor: "#E0E0E0"
    },
    image: {
        width: 'auto',
        height: 40,
        resizeMode: "contain",
    }
})