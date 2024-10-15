import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ModalContent } from 'react-native-modals'
import Entypo from "react-native-vector-icons/Entypo"
import FilterTopTabNavigation from '../Navigations/FilterTopTabNavigation'
import { useAppDispatch, useAppSelector } from '../hooks'
import { resetAll, removeIndustry, removeLocation, removeRevenue } from '../redux/filter/filterSlice'
import { useQueryClient } from '@tanstack/react-query'

const { height } = Dimensions.get("window");

type FilterModalTypes = {
    disableModal: () => void
}

export default function FilterModal({ disableModal }: FilterModalTypes) {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.Filters)
    const industries = data.industries;
    const locatons = data.locations;
    const revenue = data.revenue;
    const founded_year = data.founded_year;
    const queryClient = useQueryClient();

    const resetAllFilters = () => {
        dispatch(resetAll());
    }

    const removeIndustryItem = (industry: string) => {
        dispatch(removeIndustry(industry));
    }

    const removeLocationItem = (location: string) => {
        dispatch(removeLocation(location));
    }

    const removeRevenueItem = () => {
        dispatch(removeRevenue());
    }

    const handleApplyClick = () => {
        queryClient.invalidateQueries({ queryKey: ["companies"] });
        disableModal();
    }

    return (
        <ModalContent style={{ width: '100%', minHeight: 550, maxHeight: height - 45, backgroundColor: "#000000", borderTopWidth: 3, borderTopColor: "#AC84FF" }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ color: "#ffffff", fontWeight: '600', fontSize: 18 }}>Filter By</Text>
                <Pressable onPress={resetAllFilters}>
                    <Text style={{ color: "#AC84FF", fontWeight: '600' }}>Reset</Text>
                </Pressable>
            </View>
            <View style={{ paddingVertical: 8 }}>
                {industries &&
                    <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
                        {
                            industries.map((indus, ind) =>
                                <Pressable onPress={() => removeIndustryItem(indus)} key={ind} style={{ backgroundColor: "#AC84FF", marginTop: 2, paddingVertical: 2, paddingLeft: 10, paddingRight: 4, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: '#000000' }}>{indus}</Text>
                                    <Entypo name='circle-with-cross' size={18} color="#000000" />
                                </Pressable>
                            )
                        }
                    </View>
                }
                {locatons &&
                    <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap', marginTop: 10 }}>
                        {
                            locatons.map((loca, ind) =>
                                <Pressable onPress={() => removeLocationItem(loca)} key={ind} style={{ backgroundColor: "#AC84FF", marginTop: 2, paddingVertical: 2, paddingLeft: 10, paddingRight: 4, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                                    <Text style={{ color: '#000000' }}>{loca}</Text>
                                    <Entypo name='circle-with-cross' size={18} color="#000000" />
                                </Pressable>
                            )
                        }
                    </View>
                }
                {founded_year &&
                    <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ color: "#ffffff" }}>Founded Year: </Text>
                        <View style={{ backgroundColor: "#AC84FF", marginTop: 2, paddingVertical: 2, paddingLeft: 10, paddingRight: 4, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                            <Text style={{ color: '#000000' }}>Max-{founded_year}</Text>
                            <Entypo name='circle-with-cross' size={18} color="#000000" />
                        </View>
                    </View>
                }
                {revenue &&
                    <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ color: "#ffffff" }}>Revenue: </Text>
                        <Pressable onPress={removeRevenueItem} style={{ backgroundColor: "#AC84FF", marginTop: 2, paddingVertical: 2, paddingLeft: 10, paddingRight: 4, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                            <Text style={{ color: '#000000' }}>Min-{revenue.toLocaleString()}</Text>
                            <Entypo name='circle-with-cross' size={18} color="#000000" />
                        </Pressable>
                    </View>
                }
            </View>
            <FilterTopTabNavigation />
            <TouchableOpacity onPress={handleApplyClick} style={{ backgroundColor: "#AC84FF", paddingVertical: 12, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: "#000000", fontWeight: '600', fontSize: 15 }}>Apply</Text>
            </TouchableOpacity>
        </ModalContent>
    )
}

const styles = StyleSheet.create({})