import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import welcomeImage from "../assets/images/welcome.png";
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation';

export default function MessageScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', width: '100%', height: '85%', justifyContent: 'center' }}>
                <Text style={styles.normalText}>Venture+</Text>
                <Image style={styles.image} source={welcomeImage} />
                <View style={{ marginVertical: 10, alignItems: 'center' }}>
                    <Text style={styles.descText}>Become</Text>
                    <Text style={styles.descText}>Gretest Investor</Text>
                </View>
                {/* <Text style={styles.smallText}>Lorem Ipsum is simply dummy text of the printing and typesetting </Text> */}
            </View>
            <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center', height: '15%', flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.pop()}>
                    <View style={styles.innerBtn}>
                        <View style={styles.arrowPre}>
                            <Icon name='arrow-left' size={22} color="#FFFFFF" />
                        </View>
                        <Text style={{ color: "#000000", paddingLeft: 25 }}>Previous</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Authentication")}>
                    <View style={styles.innerBtn}>
                        <Text style={{ color: "#000000", paddingRight: 10 }}>Next</Text>
                        <View style={styles.arrowNex}>
                            <Icon name='arrow-right' size={22} color="#FFFFFF" />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: 'center',
    },
    normalText: {
        fontSize: 30,
        fontWeight: '700',
        color: "#AC84FF"
    },
    image: {
        width: "100%",
        marginVertical: 10
    },
    descText: {
        fontSize: 18,
        fontWeight: '600',
        color: "#FFFFFF",
    },
    smallText: {
        textAlign: 'center',
        width: '59%',
        marginTop: 40
    },
    btn: {
        height: 47,
        width: 155,
        backgroundColor: "#AC84FF",
        borderRadius: 100,
    },
    innerBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "100%",
        flexDirection: 'row',
        position: 'relative'
    },
    arrowPre: {
        position: 'absolute',
        left: 5,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrowNex: {
        position: 'absolute',
        right: 5,
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center'
    }
})