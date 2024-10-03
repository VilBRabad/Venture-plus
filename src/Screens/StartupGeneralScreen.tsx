import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

type StartupGeneralScreenProps = {
    data?: ICompany;
}

export default function StartupGeneralScreen({ data }: StartupGeneralScreenProps) {

    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            {data ?
                <View style={styles.container}>
                    {/* <Text style={{ color: "#FFFFFF" }}>General</Text> */}
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Company Name: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.name}</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Type: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.type}/{data.primary_role}</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Description: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={7}>{data.short_description}</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Country/State: </Text>
                        <Text style={{ color: "#FFFFFF", textTransform: 'capitalize' }} numberOfLines={3}>{data.city}, {data.region}, {data.country_code}</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '34%' }}>Private/Govt.: </Text>
                        <Text style={{ color: "#FFFFFF", marginLeft: 2 }} numberOfLines={3}>Private</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Reg. Date: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>15 March 2023</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Website: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>www.{data.domain}</Text>
                    </View>
                    <View style={styles.pairs}>
                        <Text style={{ color: "#AC84FF", width: '35%' }}>Status: </Text>
                        <Text style={{ color: "#FFFFFF" }} numberOfLines={3}>{data.isActive === undefined ? "Active" : "Closed"}</Text>
                    </View>
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