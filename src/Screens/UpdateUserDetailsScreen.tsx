import { ActivityIndicator, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigations/StackNavigation'
import Snackbar from 'react-native-snackbar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import * as Keychain from "react-native-keychain";
import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import showError from '../utils/ServerErrorSnackbar'
import debounce from 'lodash.debounce'
import { locations } from '../assets/data/filtersData';
import Config from 'react-native-config'

const { height, width } = Dimensions.get("window");

type UpdateUserDetailsScreenProps = {
    route: RouteProp<RootStackParamList, "UpdateProfile">
}

const updateProfileDetails = async (address: string, focus: string[], fundingAmount: string, geographicPreferences: string) => {
    if (address === "" || focus.length === 0 || !fundingAmount || !geographicPreferences) {
        throw new Error("All Fields required!");
    }
    const accessToken = await Keychain.getGenericPassword();
    const res = await axios.post(`${Config.BASE_URL}/api/v1/user/update-profile`, { address, focus, fundingAmount, geographicPreferences }, {
        headers: {
            "Authorization": accessToken ? accessToken.password : undefined
        },
    });

    return res;
}


const getIndustryKeywords = async (searchText: string): Promise<string[]> => {
    const res = await axios.get(`${Config.BASE_URL}/api/v1/organization/get-industries-titles?search=${searchText}`);
    return res.data.data.industries;
}


export default function UpdateUserDetailsScreen({ route }: UpdateUserDetailsScreenProps) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [inputFocus, setInputFocus] = useState<string | null>(null);


    const user = route.params.user;
    const userProfile = route.params.userProfile;

    useEffect(() => {
        if (!user) {
            Snackbar.show({
                text: "Un-authorised request, please login!",
                backgroundColor: "#C70039"
            })
            navigation.reset({
                index: 0,
                routes: [{ name: "Authentication" }]
            })
        }
    }, []);
    //inputs:
    const [name, setName] = useState(user.name);
    const [address, setAddress] = useState(user.address ? user.address : "");

    const [industries, setIndustries] = useState(userProfile && userProfile.focus ? userProfile.focus : [])
    const [geographicPreferences, setGeographicPreferences] = useState<string>(userProfile && userProfile.geographicPreferences ? userProfile.geographicPreferences : "");
    const [fundingAmount, setFundingAmount] = useState<string>(userProfile && userProfile.fundingAmount ? userProfile.fundingAmount : "");

    const [searchText, setSearchText] = useState<string>("");
    const [isKeywordInputFocus, setIsKeywordInputFocus] = useState<boolean>(false);
    const [isShow, setShow] = useState<boolean>(false);
    const [isValid, setValid] = useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [showGeoLocations, setShowGeoLocations] = useState<boolean>(false);

    // console.log(route.params);
    const handleAddIndustry = () => {
        if (searchText !== "" && isValid) {
            setIndustries(inds => [...inds, searchText]);
            setSearchText("");
            setShow(false);
        }
    }

    const handleRemoveIndustry = (industryToBeRemove: string) => {
        setIndustries(industryList => industryList.filter(inudystry => inudystry != industryToBeRemove));
    }

    const handleInputChange = (text: string) => {
        setGeographicPreferences(text);

        const filtered = locations.filter((option) =>
            option.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleOptionPress = (option: string) => {
        setGeographicPreferences(option);
        setFilteredOptions([]); // Hide dropdown when an option is selected
        setShowGeoLocations(false);
    };

    //* Making request
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationKey: ["update-profile"],
        mutationFn: () => updateProfileDetails(address, industries, fundingAmount, geographicPreferences),
        onSuccess: () => {
            Snackbar.show({
                text: "Updated successfully!",
                backgroundColor: "#228B22"
            })
            queryClient.invalidateQueries({ queryKey: ["get-user"] });
            navigation.pop();
        },
        onError: (error) => {
            const code = showError(error);
            if (code === 401) navigation.reset({
                index: 0,
                routes: [{ name: "Authentication" }]
            })
        }

    })

    const handleSubmitForm = async () => {
        try {
            mutateAsync();
        } catch (error) {
            Snackbar.show({
                text: "Somethin went wrong!",
                backgroundColor: "#C70039"
            })
        }
    }


    const { data, isLoading, refetch } = useQuery({
        queryKey: ["get-keywords"],
        queryFn: () => getIndustryKeywords(searchText),
        enabled: isKeywordInputFocus
    })

    const debouncedSearch = useCallback(
        debounce((text: string) => {
            refetch();
        }, 500),
        []
    );

    const handleChangeText = (text: string) => {
        setSearchText(text);
        debouncedSearch(text);
    }

    useEffect(() => {
        // console.log(searchText);
        if (data && data.includes(searchText.toLowerCase())) {
            setValid(true);
        }
        else setValid(false);
    }, [searchText]);


    return (
        <ScrollView style={{ backgroundColor: "#000000" }} showsVerticalScrollIndicator={false} scrollEnabled={(!showGeoLocations && !isShow)}>
            {
                user && <>
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
                        <View style={{ marginTop: 15, zIndex: 10 }}>
                            <Text style={styles.label}>Industry type (for suggestions):</Text>
                            <View style={{
                                borderColor: isKeywordInputFocus ? "#AC84FF" : "#909090",
                                borderWidth: 2,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                height: 47,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                zIndex: 10,
                                overflow: 'hidden'
                            }}>
                                <TextInput
                                    style={{
                                        borderRadius: 20,
                                        height: 47,
                                        zIndex: 15,
                                        width: '90%',
                                        backgroundColor: '#000000'
                                    }}
                                    placeholder='ex. Cyber Security'
                                    onFocus={() => { setIsKeywordInputFocus(true); setShow(true); setShowGeoLocations(false) }}
                                    onBlur={() => setIsKeywordInputFocus(false)}
                                    value={searchText}
                                    onChangeText={handleChangeText}
                                />
                                <Pressable style={{ height: '100%', justifyContent: 'center', zIndex: 15 }} onPress={handleAddIndustry}>
                                    <Text style={{ color: isValid ? "#AC84FF" : "#909090", fontWeight: "600" }}>ADD</Text>
                                </Pressable>
                            </View>
                            {
                                isShow &&
                                <View style={{ position: 'absolute', top: -((height / 2) - 120), left: -15, height, width, alignItems: 'center' }}>
                                    <Pressable onPress={() => setShow(false)} style={{ width: '100%', height: '100%', zIndex: 5 }}></Pressable>
                                    {
                                        isLoading ?
                                            <View style={{ marginTop: 20, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                                <ActivityIndicator size="small" color="#AC84FF" />
                                            </View>
                                            :
                                            <ScrollView scrollEnabled={isShow} style={[styles.dropdown, { marginTop: 392 }]}>
                                                {
                                                    data && data?.length > 0 && data.map((item, ind) => (
                                                        <TouchableOpacity key={ind} onPress={() => handleChangeText(item)}>
                                                            <Text style={styles.dropdownItem}>{item}</Text>
                                                        </TouchableOpacity>
                                                    ))
                                                }
                                            </ScrollView>
                                    }
                                </View>
                            }
                            <View style={{ flexDirection: 'row', gap: 5, marginVertical: 10, flexWrap: 'wrap', zIndex: 0 }}>
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
                        <View style={[styles.inputConatiner, { zIndex: 5 }]}>
                            <Text style={[styles.label, { zIndex: 10 }]}>Geographical Preferences:</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: inputFocus === '4' ? "#AC84FF" : "#909090",
                                    zIndex: 10,
                                    backgroundColor: '#000000'
                                }]}
                                onFocus={() => { setInputFocus('4'); setShowGeoLocations(true); }}
                                onBlur={() => setInputFocus(null)}
                                placeholder='ex. India'
                                value={geographicPreferences}
                                onChangeText={handleInputChange}
                            />
                            {filteredOptions.length > 0 && showGeoLocations && (
                                <View style={{ position: 'absolute', top: -((height / 2) - 20), left: -15, height, width, alignItems: 'center' }}>
                                    <Pressable onPress={() => setShowGeoLocations(false)} style={{ width: '100%', height: '100%', zIndex: 5 }}></Pressable>
                                    <ScrollView scrollEnabled={showGeoLocations} style={[styles.dropdown, { marginTop: 492 }]}>
                                        {
                                            filteredOptions.map((item, ind) => (
                                                <TouchableOpacity key={ind} onPress={() => handleOptionPress(item)}>
                                                    <Text style={styles.dropdownItem}>{item}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                        <View style={[styles.inputConatiner, { zIndex: 0 }]}>
                            <Text style={styles.label}>Funding Amount:</Text>
                            <TextInput
                                style={[styles.input, {
                                    borderColor: inputFocus === '5' ? "#AC84FF" : "#909090"
                                }]}
                                onFocus={() => setInputFocus('5')}
                                onBlur={() => setInputFocus(null)}
                                placeholder='ex. $ 2,000'
                                value={fundingAmount}
                                onChangeText={setFundingAmount}
                            />
                        </View>
                        <View style={{ marginTop: 130, alignItems: 'center', paddingBottom: 2, zIndex: 0 }}>
                            <Text style={{ fontSize: 12 }}>All terms & conditions applied*</Text>
                        </View>
                        <Pressable onPress={handleSubmitForm} style={{ paddingVertical: 12, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#AC84FF", borderRadius: 10, zIndex: 50 }}>
                            <Text style={{ color: "#000000", fontSize: 15, fontWeight: '700' }}>Update Profile</Text>
                        </Pressable>
                    </View>
                </>
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 20,
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
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: 'gray',
        maxHeight: 200, // Limit dropdown height
        borderRadius: 5,
        zIndex: 20,
        width: '92.5%'
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
})