import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function StartupGeneralScreen() {
    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            <View style={styles.container}>
                {/* <Text style={{ color: "#FFFFFF" }}>General</Text> */}
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>CIN: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>U68200BR2023PTC061990</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>NIC Code: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>68200</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Company Name: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>SAATHIYAA REAL ESTATE PRIVATE LIMITED</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Address: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>C/o Rajak Miyan, Vill- Dudha, Tola-DudhaPanchdhokrahaMajhaulia Rs-Bettiah-Bihar-845454-India</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Country/State: </Text>
                    <Text style={{ color: "#FFFFFF", textTransform: 'capitalize' }} numberOfLines={3}>bihar, INDIA</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Private/Govt.: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>Private</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Capital: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>₹ 100000.00</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Category: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>Company limited by shares</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Sub - Category: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>Non-government company</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Reg. Date: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>15 March 2023</Text>
                </View>
                <View style={styles.pairs}>
                    <Text style={{ color: "#AC84FF", width: '30%' }}>Status: </Text>
                    <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>Active</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#202020',
        borderRadius: 20,
        marginTop: 18
    },
    pairs: {
        flexDirection: 'row',
        paddingRight: 70,
        paddingVertical: 6
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