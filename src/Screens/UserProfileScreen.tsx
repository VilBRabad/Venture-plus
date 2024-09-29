import { StyleSheet, Text, ScrollView, View, Dimensions } from 'react-native'
import React from 'react'
import Feather from "react-native-vector-icons/Feather";
import StartupCard from '../components/StartupCard';

const {width} = Dimensions.get("window");

export default function UserProfileScreen() {

  return (
    <ScrollView>
        <View style={{backgroundColor: "#AC84FF", height: 150, flexDirection: 'row', justifyContent: "space-between"}}>
            <View style={{marginTop: 15, marginLeft: 10}}>
                <Feather name='arrow-left' color="#000000" size={25}/>
            </View>
            <View style={{marginTop: 15, marginRight: 10}}>
                <Feather name='more-vertical' color="#000000" size={25}/>
            </View>
        </View>
        <View style={styles.container}>
            <View style={{position: 'absolute', right: 15, top: 15}}>
                <Feather name='edit-2' color="#FFFFFF" size={20}/>
            </View>
            <View style={{alignItems: 'center', marginTop: -60, width}}>
                <View style={styles.profileImage}>
                    <Feather name='camera' color="#000000" size={35}/>
                </View>
            </View>
            <View style={{alignItems: 'center', width, marginTop: 15}}>
                <Text style={{color: "#FFFFFF", fontSize: 17, fontWeight: '600'}}>Vilas B. Rabad</Text>
                <Text style={{color: "#B0B0B0", fontSize: 13, marginTop: 5, fontWeight: '500'}}>Pune, MH</Text>
            </View>
            <View style={{width, marginTop: 15, paddingHorizontal: 15}}>
                <Text style={{color: "#FFFFFF"}}>Interested In</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginVertical: 7}}>
                    <View style={styles.focusContainer}>
                        <Text style={styles.focusText}>IT</Text>
                    </View>
                    <View style={styles.focusContainer}>
                        <Text style={styles.focusText}>Aggriculture</Text>
                    </View>
                    <View style={styles.focusContainer}>
                        <Text style={styles.focusText}>Trading</Text>
                    </View>
                    <View style={styles.focusContainer}>
                        <Text style={styles.focusText}>Health Care</Text>
                    </View>
                    <View style={styles.focusContainer}>
                        <Text style={styles.focusText}>Cunsulting</Text>
                    </View>
                    <View style={styles.focusContainer}>
                        <Text style={styles.focusText}>Trading Company</Text>
                    </View>
                </View>

            </View>
            <View style={{width, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 30, paddingHorizontal: 18}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: "#AC84FF", fontSize: 15}}>Mumbai</Text>
                    <Text style={{fontSize: 10, color: "#A0A0A0"}}>Geo Preference</Text>
                </View>
                <View style={{width: 1, backgroundColor: "#606060"}}></View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: "#AC84FF", fontSize: 15}}>₹ 500K</Text>
                    <Text style={{fontSize: 10, color: "#A0A0A0"}}>Funding Amount</Text>
                </View>
                <View style={{width: 1, backgroundColor: "#606060"}}></View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: "#AC84FF", fontSize: 15}}>10</Text>
                    <Text style={{fontSize: 10, color: "#A0A0A0"}}>Investments</Text>
                </View>
            </View>
            <View style={{backgroundColor: "#101010", height: 15, width, marginVertical: 7}}></View>
            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: "#FFFFFF", fontWeight: '600'}}>History</Text>
                    <Text style={{fontSize: 12, color: "#AC84FF"}}>See all</Text>
                </View>
                <View style={{flexDirection: 'column', gap: 10, marginTop: 10}}>
                    <StartupCard/>
                    <StartupCard/>
                    <StartupCard/>
                    <StartupCard/>
                    <StartupCard/>
                </View>
            </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000000",
        marginTop: -30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'relative'
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 100,
        backgroundColor: "#A0A0A0",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#FFFFFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 20
    },
    focusText: {
        fontSize: 12
    },
    focusContainer: {
        paddingVertical: 3, 
        paddingHorizontal: 8, 
        backgroundColor: "#505050",
        borderRadius: 10,
        // marginVertical: 5
    }
})