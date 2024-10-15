import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../Navigations/StackNavigation'
import showError from '../utils/ServerErrorSnackbar'
import Snackbar from 'react-native-snackbar'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setInList, removeFromList } from '../redux/saveList/savelistSlice'
import { useQueryClient } from '@tanstack/react-query'
import Config from 'react-native-config'
import { useAddToSaveList, useRemoveFromSaveList } from '../hooks/userHook'

interface ICardProps {
    companyData: ICompany;
}


export default function StartupCard({ companyData }: ICardProps) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutateAsync: addToListMutation } = useAddToSaveList(companyData._id);
    const { mutateAsync: removeFromListMuatation } = useRemoveFromSaveList(companyData._id);


    const List = useAppSelector((state) => state.SaveList.list);

    const handleSaveClick = async () => {
        try {
            const data = await addToListMutation();
            dispatch(setInList(companyData._id));
            queryClient.invalidateQueries({ queryKey: ["get-data-of-savelist"] })
            Snackbar.show({
                text: data.message,
                backgroundColor: "#228B22"
            })
        } catch (error) {
            showError(error as Error)
        }
    }


    const handleRemoveClick = async () => {
        try {
            const data = await removeFromListMuatation();
            dispatch(removeFromList(companyData._id));
            queryClient.invalidateQueries({ queryKey: ["get-data-of-savelist"] })
            Snackbar.show({
                text: data.message,
                backgroundColor: "#228B22"
            })
        } catch (error) {
            showError(error as Error)
        }
    }

    return (
        <View style={{ zIndex: 1 }} >
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate("StartupProfile", { companyId: companyData._id })} style={{ flexDirection: 'column', gap: 15 }}>
                    <View style={{ marginTop: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <View style={{ width: 50, justifyContent: 'center' }}>
                            {companyData.logo ?
                                <Image
                                    source={{ uri: companyData.logo }}
                                    style={styles.image}
                                />
                                :
                                <FontAwesome name='building' size={35} color="#000000" />
                            }
                        </View>
                        <Text style={[styles.blackText, styles.companyName]} numberOfLines={2}>{companyData.Company}</Text>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: -10, width: "100%" }}>
                            <Text style={[styles.blackText, { fontSize: 12 }]}>{companyData.City}</Text>
                            <View style={{ height: 4, width: 4, backgroundColor: "#000000", borderRadius: 100, marginTop: 5 }}></View>
                            <Text style={[styles.blackText, { fontSize: 12 }]}>{companyData.State}</Text>
                            <View style={{ height: 4, width: 4, backgroundColor: "#000000", borderRadius: 100, marginTop: 5 }}></View>
                            <Text style={[styles.blackText, { fontSize: 12 }]}>{companyData.Country}</Text>
                        </View>
                        <Text style={{ color: "#000000", fontSize: 15, marginTop: 7, marginBottom: 9, textTransform: "capitalize", fontWeight: '600' }}>{companyData.Industry}</Text>
                        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                            {
                                companyData.Keywords &&
                                (companyData.Keywords?.length >= 4 ?
                                    companyData.Keywords?.slice(0, 4).map((keyword, ind) => (
                                        <View key={ind} style={styles.categoryContainer}>
                                            <Text style={styles.category}>{keyword}</Text>
                                        </View>
                                    ))
                                    :
                                    companyData.Keywords.map((keyword, ind) => (
                                        <View key={ind} style={styles.categoryContainer}>
                                            <Text style={styles.category}>{keyword}</Text>
                                        </View>
                                    )))
                            }
                        </View>
                    </View>
                </Pressable>
                {
                    List.includes(companyData._id) ?
                        <Pressable onPress={handleRemoveClick} style={{ position: 'absolute', right: 10, top: 10 }}>
                            <Ionicons name='bookmark' size={28} color="#000000" />
                        </Pressable>
                        :
                        <Pressable onPress={handleSaveClick} style={{ position: 'absolute', right: 10, top: 10 }}>
                            <Ionicons name='bookmark-outline' size={28} color="#000000" />
                        </Pressable>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 25,
        gap: 10,
        justifyContent: 'space-between',
        position: 'relative'
    },
    blackText: {
        color: '#000000'
    },
    companyName: {
        fontSize: 18,
        fontWeight: '600',
        width: '85%'
    },
    category: {
        color: "#000000",
        fontSize: 11
    },
    categoryContainer: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 100,
        backgroundColor: "#E0E0E0"
    },
    image: {
        width: 'auto',
        height: 40,
        resizeMode: "contain",
    }
})