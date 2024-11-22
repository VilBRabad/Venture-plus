import { Dimensions, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"

const { height, width } = Dimensions.get("window");

export default function AppFeedbackScreen() {
    const [star, setStar] = useState(0);
    const [message, setMessage] = useState<string>("");


    return (
        <View style={{ height, width, backgroundColor: "#000000", padding: 15 }}>
            <View style={{ height: 'auto' }}>
                <View
                    style={{
                        width: "100%",
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-evenly",
                        marginBottom: 20,
                        marginTop: 10
                    }}>
                    {
                        Array(5).fill(0).map((_, ind) => (
                            <Pressable onPress={() => setStar(ind + 1)} key={ind} >
                                <FontAwesome name={`${ind < star ? 'star' : 'star-o'}`} size={40} color={`${ind < star ? "#AC84FF" : "#F0F0F0"}`} />
                            </Pressable>
                        ))
                    }
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        star > 0 ?
                            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Tell us a bit more about why you chose {star}</Text>
                            :
                            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Rate us, clicking on stars</Text>
                    }
                    <TextInput
                        style={{
                            fontSize: 14,
                            width: '92%',
                            borderWidth: 2,
                            borderColor: "#AC84FF",
                            marginTop: 20,
                            paddingHorizontal: 10,
                            height: 200,
                            borderRadius: 6
                        }}
                        placeholder='What can we inprove for you....'
                        multiline={true}
                        placeholderTextColor="#888"
                        textAlignVertical="top"
                        onChangeText={setMessage}
                    />
                </View>
            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 45, marginTop: 40 }}>
                <TouchableOpacity style={{ backgroundColor: '#AC84FF', width: '92%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                    <Text style={{ color: '#FFFFFF', fontWeight: "600" }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
