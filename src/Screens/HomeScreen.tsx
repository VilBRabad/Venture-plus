import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import StartupCard from '../components/StartupCard'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import debounce from "lodash.debounce"
import CompanySearchList from '../components/CompanySearchList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../hooks';

const { height, width } = Dimensions.get("window");

const getCompanies = async (): Promise<ICompany[]> => {
    const res = await axios.get("http://192.168.43.37:8000/api/v1/organization/get-organization")
    return res.data.data.data;
}

const getCompaniesNames = async (search: string): Promise<ISearchCompany[]> => {
    const res = await axios.get(`http://192.168.43.37:8000/api/v1/organization/get-organization-names?search=${search}`);
    return res.data.data.data;
}

export default function HomeScreen() {

    const [searchItem, setSearchItem] = useState<string>("");
    const [isInputFocus, setInputFocus] = useState<boolean>(false);
    const [username, setUserName] = useState<string>("");

    const savelist = useAppSelector((state) => state.SaveList.list);

    const {
        data: companyData,
        error: companyError,
        isLoading: companyLoading,
        isError: companyIsError
    } = useQuery({
        queryKey: ["companies"],
        queryFn: getCompanies
    })


    const handleSearchChange = debounce((text: string) => {
        setSearchItem(text);
    }, 500);

    const {
        data: searchData,
        error: searchError,
        isLoading: searchLoding,
        isError: searchIsError
    } = useQuery({
        queryKey: ["searchCompany", , searchItem],
        queryFn: () => getCompaniesNames(searchItem),
        enabled: !!searchItem
    })

    const getUserFromStorage = async () => {
        const user = await AsyncStorage.getItem("username");
        if (user) setUserName(user);
    }

    useEffect(() => {
        getUserFromStorage();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            scrollEnabled={searchItem ? false : true}
        >
            <View style={styles.topHeading}>
                <Text>Hello, {username && `${username.split(" ")[0]}!`}</Text>
                <Text style={styles.heading}>Find your dream startup</Text>
            </View>
            <View style={styles.searchBar}>
                <Icon name='search1' size={27} color="#999999" style={{ zIndex: 40 }} />
                <TextInput
                    placeholder='Search startup...'
                    style={{ width: '81%', zIndex: 40 }}
                    onChangeText={handleSearchChange}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                />
                <Icon name='filter' size={27} color="#999999" style={{ zIndex: 40 }} />
                {
                    searchData && <View onTouchStart={() => { if (!isInputFocus) setSearchItem("") }} style={{ position: 'absolute', top: -110, left: -15, flex: 1, height, width, alignItems: 'center', backgroundColor: 'transparent' }} />

                }
                {

                    searchItem &&
                    <View style={{
                        position: 'absolute',
                        top: 50,
                        minHeight: 80,
                        height: 'auto',
                        width: '105.7%',
                        backgroundColor: '#000000',
                        zIndex: 20,
                        borderWidth: 2,
                        borderColor: "#606060",
                        borderRadius: 20,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                    }}>
                        {
                            searchData && searchData.length !== 0 ?
                                <CompanySearchList data={searchData} />
                                :
                                searchLoding ?
                                    <ActivityIndicator size="small" style={{ marginTop: 5 }} />
                                    :
                                    <Text style={{ fontSize: 15, fontWeight: '600', marginTop: 10 }}>Search for "{searchItem}", Not found!</Text>
                        }
                    </View>
                }
            </View>
            {
                companyLoading ?
                    <View style={{ height: 600, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#AC84FF" />
                    </View>
                    :
                    (
                        companyIsError ?
                            <View style={{ height: 600, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{companyError.message}</Text>
                            </View>
                            :
                            <View style={{ marginTop: 20, paddingBottom: 15, zIndex: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Recommended Startup</Text>
                                    <Text style={{ color: "#999999", fontSize: 12 }}>View all</Text>
                                </View>
                                <View style={{ gap: 15, marginTop: 10, zIndex: 5 }}>
                                    {companyData &&
                                        companyData.map((comp, ind) => (
                                            <View key={ind}>
                                                <StartupCard companyData={comp} />
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                    )
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        position: 'relative'
    },
    topHeading: {
        paddingTop: 20,
        paddingBottom: 15
    },
    heading: {
        color: "#FFFFFF",
        paddingVertical: 8,
        fontSize: 18,
        fontWeight: '600'
    },
    searchBar: {
        borderWidth: 2,
        borderColor: "#AC84FF",
        borderRadius: 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        height: 50,
        marginBottom: 20,
        marginTop: 8,
        zIndex: 50
    }
})