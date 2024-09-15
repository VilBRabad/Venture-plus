import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import StartupCard from '../components/StartupCard'

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topHeading}>
                <Text>Hello, Vilas!</Text>
                <Text style={styles.heading}>Find your dream startup</Text>
            </View>
            <View style={styles.searchBar}>
                <Icon name='search1' size={27} color="#999999" />
                <TextInput
                    placeholder='Search startup...'
                    style={{ width: '81%' }}
                />
                <Icon name='filter' size={27} color="#999999" />
            </View>
            <View style={{ marginTop: 20, paddingBottom: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Recommended Startup</Text>
                    <Text style={{ color: "#999999", fontSize: 12 }}>View all</Text>
                </View>
                <View style={{ gap: 15, marginTop: 10 }}>
                    <StartupCard />
                    <StartupCard />
                    <StartupCard />
                    <StartupCard />
                    <StartupCard />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    topHeading: {
        paddingTop: 20,
        paddingBottom: 15
    },
    heading: {
        color: "#FFFFFF",
        paddingVertical: 8,
        fontSize: 18,
        fontWeight: '600'
    },
    searchBar: {
        borderWidth: 2,
        borderColor: "#AC84FF",
        borderRadius: 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        height: 50,
        marginBottom: 20,
        marginTop: 8
    }
})