import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'

type StartupGeneralScreenProps = {
    data?: ICompany;
}

const { height } = Dimensions.get("window");

export default function StartupGeneralScreen({ data }: StartupGeneralScreenProps) {

    return (
        <ScrollView style={{ backgroundColor: "#000000" }} showsVerticalScrollIndicator={false}>
            {data ?
                <>
                    <View style={[styles.container, { padding: 15, backgroundColor: '#202020', marginTop: 30 }]}>
                        <Text style={{ color: "#AC84FF", fontWeight: "bold" }}>About</Text>
                        <View style={{ marginVertical: 5, marginBottom: 20 }}>
                            {/* <Text style={{ color: "#AC84FF", width: '35%' }}>Description: </Text> */}
                            <Text style={{ color: "#FFFFFF" }} numberOfLines={10}>{data.Short_description}</Text>
                        </View>
                        <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>Company Name: </Text>
                            <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.Company}</Text>
                        </View>
                        <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>Industry: </Text>
                            <Text style={{ color: "#FFFFFF", textTransform: 'capitalize' }} numberOfLines={3}>{data.Industry}</Text>
                        </View>
                        <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '34%' }}>Founded Year: </Text>
                            <Text style={{ color: "#FFFFFF", marginLeft: 2 }} numberOfLines={3}>{data.Founded_year}</Text>
                        </View>
                        <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>Address: </Text>
                            <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.Address}</Text>
                        </View>
                        <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '34%' }}>Private/Govt.: </Text>
                            <Text style={{ color: "#FFFFFF", marginLeft: 2 }} numberOfLines={3}>Private</Text>
                        </View>
                        <View style={styles.pairs}>
                            <Text style={{ color: "#AC84FF", width: '35%' }}>SIC Codes: </Text>
                            <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.SIC_codes}</Text>
                        </View>
                    </View>
                    <Text style={{ marginTop: 30, marginLeft: 15, color: "#AC84FF", fontWeight: '600' }}>Other Information</Text>
                    <View style={[styles.container, { paddingBottom: 20, paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }]}>
                        <View style={styles.box}>
                            <Text style={{ color: "#AC84FF" }}>No. Of Employee</Text>
                            <View style={styles.innerbox}>
                                <Text style={{ color: "#FFFFFF", fontSize: 30, fontWeight: '700' }}>{Number(data.Employees).toLocaleString()}</Text>
                            </View>
                        </View>
                        {
                            data.Stock_symbol &&
                            <View style={styles.box}>
                                <Text style={{ color: "#AC84FF", fontWeight: '500' }}>Stock Symbol</Text>
                                <View style={styles.innerbox}>
                                    <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: '700' }}>{data.Stock_symbol}</Text>
                                </View>
                            </View>
                        }
                    </View>
                    <View style={[styles.container, { marginBottom: 20, marginLeft: 15 }]}>
                        <Text style={{ color: "#AC84FF", fontWeight: '600', marginBottom: 15 }}>Industry:</Text>
                        <View style={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                data.Keywords &&
                                data.Keywords.map((keyword, ind) => (
                                    <View key={ind} style={{ backgroundColor: "#AC84FF", paddingHorizontal: 18, paddingVertical: 5, borderRadius: 20 }}>
                                        <Text style={{ color: "#000000", fontWeight: '600', textTransform: "capitalize" }}>{keyword}</Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
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
        width: '95%',
        // paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 18,
        marginHorizontal: 10
    },
    pairs: {
        flexDirection: 'row',
        paddingRight: 70,
        paddingVertical: 6
    },
    box: {
        padding: 18,
        width: '48%',
        height: 130,
        backgroundColor: '#202020',
        borderRadius: 13,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10.84,
        elevation: 4,
    },
    innerbox: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

// {
//     "CIN": "U68200BR2023PTC061990",
//     "CompanyName": "SAATHIYAA REAL ESTATE PRIVATE LIMITED",
//     "CompanyROCcode": "ROC Patna",
//     "CompanyCategory": "Company limited by shares",
//     "CompanySubCategory": "Non-government company",
//     "CompanyClass": "Private",
//     "AuthorizedCapital": "100000.00",
//     "PaidupCapital": "100000.00",
//     "CompanyRegistrationdate_date": "2023-03-15",
//     "Registered_Office_Address": "C/o Rajak Miyan, Vill- Dudha, Tola-DudhaPanchdhokrahaMajhaulia Rs-Bettiah-Bihar-845454-India",
//     "Listingstatus": "Unlisted",
//     "CompanyStatus": "Active",
//     "CompanyStateCode": "bihar",
//     "isIndianCompany": "Indian",
//     "nic_code": "68200",
//     "CompanyIndustrialClassification": "REAL ESTATE ACTIVITIES"
// },