import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

type StartupFinancialScreenProps = {
    data?: ICompany;
}

const { height } = Dimensions.get("window");

function formatRevenue(value: number) {
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixIndex = 0;

    while (value >= 1000) {
        value /= 1000;
        suffixIndex++;
    }

    return `${value.toFixed(1)}${suffixes[suffixIndex]}`;
}


export default function StartupFinancialScreen({ data }: StartupFinancialScreenProps) {

    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            {
                data ?
                    <View style={[styles.container]}>
                        <View style={{ width: "100%", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {
                                data.Stock_symbol &&
                                <View style={styles.box}>
                                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Stock Symbol</Text>
                                    <Text style={{ color: "#FFFFFF", fontSize: 20, marginTop: 10, fontWeight: "700" }}>{data.Stock_symbol}</Text>
                                </View>
                            }
                            {
                                data.Annual_revenue &&
                                <View style={styles.box}>
                                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Annual Revenue</Text>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: "700" }}>$ {formatRevenue(parseInt(data.Annual_revenue as unknown as string))}</Text>
                                    </View>
                                </View>
                            }
                            {
                                data.Total_funding &&
                                <View style={styles.box}>
                                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Total Funding</Text>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: "700" }}>$ {formatRevenue(parseInt(data.Total_funding as unknown as string))}</Text>
                                    </View>
                                </View>
                            }
                            {
                                data.Latest_funding &&
                                <View style={styles.box}>
                                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Latest Funding</Text>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 15, fontWeight: "500" }} numberOfLines={3}>{data.Latest_funding}</Text>
                                    </View>
                                </View>
                            }
                            {
                                data.Latest_funding_amount &&
                                <View style={[styles.box, { paddingBottom: 30 }]}>
                                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Latest Funding Amount</Text>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: "700" }}>$ {formatRevenue(parseInt(data.Latest_funding_amount as unknown as string))}</Text>
                                    </View>
                                </View>
                            }
                            {
                                data.Last_raised_at &&
                                <View style={[styles.box, { paddingBottom: 30 }]}>
                                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Last Raised At</Text>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 19, fontWeight: "700" }}>{new Date(data.Last_raised_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</Text>
                                    </View>
                                </View>
                            }
                        </View>
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
        marginTop: 10,
        marginHorizontal: 10
    },
    box: {
        padding: 20,
        minHeight: 120,
        width: '47%',
        borderRadius: 15,
        shadowColor: '#FFFF',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10.84,
        elevation: 5,
        backgroundColor: '#202020',
        margin: 6
    }
})