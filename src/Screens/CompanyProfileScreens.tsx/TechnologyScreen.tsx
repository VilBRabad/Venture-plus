import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'


const { height } = Dimensions.get("window");

export default function TechnologyScreen({ data }: { data: string[] | undefined }) {
    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            {
                data ?
                    <View style={[styles.container, { gap: 5, flexDirection: 'row', flexWrap: 'wrap' }]}>
                        {
                            data.map((tech, ind) => (
                                <View key={ind} style={{ paddingVertical: 5, paddingHorizontal: 15, backgroundColor: "#AC84FF", borderRadius: 20 }}>
                                    <Text style={{ color: "#000000", fontWeight: '500' }}>{tech}</Text>
                                </View>
                            ))
                        }
                    </View>
                    :
                    <View style={[styles.container, { height: (height - 300), justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: "#FFFFFF" }}>Network Error!</Text>
                    </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        paddingVertical: 15,
        borderRadius: 20,
        marginTop: 18,
        marginHorizontal: 10
    },
})