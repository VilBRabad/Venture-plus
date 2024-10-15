import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/AntDesign"
import StartupCard from '../components/StartupCard'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import debounce from "lodash.debounce"
import CompanySearchList from '../components/CompanySearchList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../hooks';
import { BottomModal, SlideAnimation } from "react-native-modals";
import FilterModal from '../components/FilterModal'
import LodingAnimate from '../components/LodingAnimate';
import Config from 'react-native-config';


const { height, width } = Dimensions.get("window");

const getCompanies = async (industries: string[], countries: string[], revenue: string): Promise<ICompany[]> => {

    const res = await axios.get(`${Config.BASE_URL}/api/v1/organization/get-organization`, {
        params: { industries, countries, revenue }
    })
    return res.data.data.data;
}

const getCompaniesNames = async (search: string): Promise<ISearchCompany[]> => {
    const res = await axios.get(`${Config.BASE_URL}/api/v1/organization/get-organization-names?search=${search}`);
    return res.data.data.data;
}

export default function HomeScreen() {

    const [searchItem, setSearchItem] = useState<string>("");
    const [isInputFocus, setInputFocus] = useState<boolean>(false);
    const [username, setUserName] = useState<string>("");
    const [modalVisible, setModalVisibal] = useState<boolean>(false);
    const data = useAppSelector((state) => state.Filters);
    const industries = data.industries || [];
    const countries = data.locations || [];
    const revenue = data.revenue || "";

    const {
        data: companyData,
        error: companyError,
        isLoading: companyLoading,
        isError: companyIsError,
        refetch
    } = useQuery({
        queryKey: ["companies"],
        queryFn: () => getCompanies(industries, countries, revenue)
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


    const disableModal = () => {
        setModalVisibal(false);
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                scrollEnabled={searchItem ? false : true}
            >
                <View style={styles.topHeading}>
                    <Text>Hello, {username ? `${username.split(" ")[0]}` : "their"}!</Text>
                    <Text style={styles.heading}>Find your dream company</Text>
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
                    <Pressable onPress={() => setModalVisibal(pre => !pre)} style={{ position: 'relative' }}>
                        <Icon name='filter' size={27} color="#999999" style={{ zIndex: 40 }} />
                        {
                            ((data.industries && data.industries.length > 0) || (data.locations && data.locations.length > 0) || data.revenue) &&
                            <View style={{ position: 'absolute', right: 4, top: 2, height: 6, width: 6, backgroundColor: 'red', borderRadius: 100, zIndex: 50 }} />
                        }
                    </Pressable>
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
                            <LodingAnimate />
                        </View>
                        :
                        (
                            companyIsError ?
                                <View style={{ height: 600, alignItems: 'center', justifyContent: 'center' }}>
                                    <Pressable onPress={() => refetch()} style={{ marginBottom: 10 }}>
                                        <Icon name='reload1' size={30} color="#ffffff" />
                                    </Pressable>
                                    <Text style={{ color: "#ffffff", textAlign: 'center' }}>{companyError.message}, Please try again</Text>
                                </View>
                                :
                                <View style={{ marginTop: 20, paddingBottom: 15, zIndex: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Recommended Companies</Text>
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
            <BottomModal
                visible={modalVisible}
                onHardwareBackPress={() => { setModalVisibal(!modalVisible); return true }}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom"
                    })
                }
                onSwipeOut={(event) => {
                    setModalVisibal(!modalVisible)
                }}
                onTouchOutside={() => setModalVisibal(!modalVisible)}
            >
                <View >
                    <FilterModal disableModal={disableModal} />
                </View>
            </BottomModal>
        </>
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