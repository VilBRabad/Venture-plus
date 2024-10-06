import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type StartupSocilaMediaScreenProps = {
    data?: ICompany;
}

const { height } = Dimensions.get("window");

export default function StartupSocilaMediaScreen({ data }: StartupSocilaMediaScreenProps) {
    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            {data ?
                <>
                    <View style={[styles.container, { backgroundColor: '#202020' }]}>
                        {data.Facebook_url && <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>Facebook: </Text>
                            <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.Facebook_url}</Text>
                        </View>
                        }
                        {data.Twitter_url && <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>Twitter: </Text>
                            <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.Twitter_url}</Text>
                        </View>
                        }
                        {data.Linkedin_url && <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>Linkedin: </Text>
                            <Text style={{ color: "#FFFFFF", width: '90%' }} numberOfLines={7}>{data.Linkedin_url}</Text>
                        </View>
                        }
                    </View>
                    {
                        data.Phone_number &&
                        <View style={styles.container}>
                            <Text style={{ color: "#AC84FF", fontWeight: "600" }}>Contact Number</Text>
                            <Text style={{ marginLeft: 10, marginVertical: 20 }}>{data.Phone_number}</Text>
                        </View>
                    }
                </>
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
        width: '92%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 30,
        marginHorizontal: 14
    },
    pairs: {
        flexDirection: 'row',
        paddingRight: 70,
        paddingVertical: 6
    }
})