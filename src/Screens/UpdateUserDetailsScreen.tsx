import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, Touchable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigations/StackNavigation'
import Snackbar from 'react-native-snackbar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type UpdateUserDetailsScreenProps = {
    route: RouteProp<RootStackParamList, "UpdateProfile">
}

export default function UpdateUserDetailsScreen({ route }: UpdateUserDetailsScreenProps) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [inputFocus, setInputFocus] = useState<string | null>(null);

    useEffect(() => {
        if (!route.params.user) {
            Snackbar.show({
                text: "Un-authorised request, please login!",
                backgroundColor: "#C70039"
            })
            navigation.reset({
                index: 0,
                routes: [{ name: "Authentication" }]
            })
        }
        return
    }, []);
    //inputs:
    const [name, setName] = useState(route.params.user.name);
    const [address, setAddress] = useState("");

    const [industries, setIndustries] = useState([
        "Social", "Management", "Cyber Security", "Trading"
    ])
    const [industry, setIndustry] = useState("");
    const [geographicPreferences, setGeographicPreferences] = useState(route.params.userProfile ? route.params.userProfile.geographicPreferences : "");
    const [fundingAmount, setFundingAmount] = useState(route.params.userProfile ? route.params.userProfile.fundingAmount : "");

    // console.log(route.params);
    const handleAddIndustry = () => {
        if (industry !== "") {
            setIndustries(inds => [...inds, industry]);
        }
        setIndustry("");
    }

    const handleRemoveIndustry = (industryToBeRemove: string) => {
        setIndustries(industryList => industryList.filter(inudystry => inudystry != industryToBeRemove));
    }


    return (
        <ScrollView style={{ backgroundColor: "#000000" }}>
            {
                route.params.user && <>
                    <Pressable onPress={() => navigation.pop()} style={{ marginTop: 15, marginLeft: 15 }}>
                        <Feather name='arrow-left' color="#FFFFFF" size={25} />
                    </Pressable>
                    <View style={styles.container}>
                        <Text style={{ marginBottom: 10, fontSize: 17, fontWeight: '600', color: "#FFFFFF" }}>Update Profile</Text>
                        <View style={styles.inputConatiner}>
                            <Text style={styles.label}>Name:</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: inputFocus === '1' ? "#AC84FF" : "#909090"
                                }]}
                                onFocus={() => setInputFocus('1')}
                                onBlur={() => setInputFocus(null)}
                                placeholder='Vilas Rabad'
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.inputConatiner}>
                            <Text style={styles.label}>Address:</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: inputFocus === '2' ? "#AC84FF" : "#909090"
                                }]}
                                onFocus={() => setInputFocus('2')}
                                onBlur={() => setInputFocus(null)}
                                placeholder='ex. Flat 24, Bahare'
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>
                        <View style={{ marginTop: 15, }}>
                            <Text style={styles.label}>Industry type (for suggestions):</Text>
                            <View style={{
                                borderColor: inputFocus === '3' ? "#AC84FF" : "#909090",
                                borderWidth: 2,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                height: 47,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <TextInput
                                    style={{
                                        borderRadius: 20,
                                        height: 47
                                    }}
                                    placeholder='ex. Cyber Security'
                                    onFocus={() => setInputFocus('3')}
                                    onBlur={() => setInputFocus(null)}
                                    value={industry}
                                    onChangeText={setIndustry}
                                />
                                <Pressable style={{ height: '100%', justifyContent: 'center' }} onPress={handleAddIndustry}>
                                    <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>ADD</Text>
                                </Pressable>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 5, marginVertical: 10, flexWrap: 'wrap' }}>
                                {
                                    industries && industries.map((indus, ind) => (
                                        <View key={ind} style={{ paddingVertical: 3, paddingLeft: 15, paddingRight: 7, backgroundColor: "#AC84FF", borderRadius: 100, flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#000000', fontWeight: '600' }}>{indus}</Text>
                                            <Pressable
                                                onPress={() => handleRemoveIndustry(indus)}
                                            >
                                                <Entypo name='circle-with-cross' size={18} color="#000000" />
                                            </Pressable>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={styles.inputConatiner}>
                            <Text style={styles.label}>Geographical Preferences:</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: inputFocus === '4' ? "#AC84FF" : "#909090"
                                }]}
                                onFocus={() => setInputFocus('4')}
                                onBlur={() => setInputFocus(null)}
                                placeholder='ex. India'
                            />
                        </View>
                        <View style={styles.inputConatiner}>
                            <Text style={styles.label}>Funding Amount:</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: inputFocus === '5' ? "#AC84FF" : "#909090"
                                }]}
                                onFocus={() => setInputFocus('5')}
                                onBlur={() => setInputFocus(null)}
                                placeholder='ex. $ 2,000'
                            />
                        </View>
                        <View style={{ marginTop: 130, alignItems: 'center', paddingBottom: 2 }}>
                            <Text style={{ fontSize: 12 }}>All terms & conditions applied*</Text>
                        </View>
                        <View style={{ paddingVertical: 12, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#AC84FF", borderRadius: 10 }}>
                            <Text style={{ color: "#000000", fontSize: 15, fontWeight: '700' }}>Update Profile</Text>
                        </View>
                    </View>
                </>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 20
    },
    inputConatiner: {
        marginVertical: 8
    },
    label: {
        color: '#FFFFFF',
        paddingVertical: 4
    },
    input: {
        borderWidth: 2,
        // borderColor: "#AC84FF",
        paddingHorizontal: 14,
        borderRadius: 10,
        height: 47
    }
})