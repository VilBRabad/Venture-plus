import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import StartupCard from '../components/StartupCard'

export default function SaveList() {
  return (
    <ScrollView style={{paddingHorizontal: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, paddingVertical: 10}}>
            <Text style={{color: "#FFFFFF", fontWeight: "600", fontSize: 25}}>SaveList</Text>
            <Text style={{fontSize: 12}}>Remove all</Text>
        </View>
        <View style={{flexDirection: 'column', gap: 10}}>
            <StartupCard/>
            <StartupCard/>
            <StartupCard/>
            <StartupCard/>
            <StartupCard/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})