import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type StartupSocilaMediaScreenProps = {
    data?: ICompany;
}

export default function StartupSocilaMediaScreen({ data }: StartupSocilaMediaScreenProps) {
    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            {data ?
                <View style={styles.container}>
                    {/* <Text style={{ color: "#FFFFFF" }}>General</Text> */}
                    {data.facebook_url && <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Facebook: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.facebook_url}</Text>
                    </View>
                    }
                    {data.twitter_url && <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Twitter: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.twitter_url}</Text>
                    </View>
                    }
                    {data.linkedin_url && <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Linkedin: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={7}>{data.linkedin_url}</Text>
                    </View>
                    }
                    {data.homepage_url && <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Website: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={7}>{data.domain}</Text>
                    </View>
                    }
                </View>
                :
                <Text>Network Error!</Text>
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
        backgroundColor: '#202020',
        borderRadius: 20,
        marginTop: 18,
        marginHorizontal: 14
    },
    pairs: {
        flexDirection: 'row',
        paddingRight: 70,
        paddingVertical: 6
    }
})