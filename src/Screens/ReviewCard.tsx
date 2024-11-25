import { View, Text, Image, Pressable, Touchable } from 'react-native'
import React, { useState } from 'react'

type dataType = {
    name: string;
    location?: string;
    message: string;
}

type ReviewCardPops = {
    data: dataType
}

const ReviewCard = ({ data }: ReviewCardPops) => {
    const [isCollapse, setCollapse] = useState(false);
    const text = data.message;

    const shortenString = (text: string) => {
        if (isCollapse) return text;

        if (text.length > 130) {
            return text.substring(0, 130) + "..."
        }
        return text;
    }

    return (
        <View style={{ width: "100%", overflow: "hidden", borderWidth: 1, borderColor: "#A0A0A0", borderRadius: 10 }}>
            <View style={{ padding: 10, flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: "#0F0F0F" }}>
                <View style={{ width: 35, height: 35, borderRadius: 100 }}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                <View>
                    <Text style={{ color: "#FFFFFF" }}>{data.name}</Text>
                    {
                        data.location &&
                        <Text style={{ fontSize: 12 }}>{data.location}</Text>
                    }
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <Text>
                    {shortenString(text)}
                    {
                        text.length > 130 && (
                            isCollapse ?
                                <Text style={{ color: "#AC84FF" }} onPress={() => setCollapse(false)}>-less</Text>
                                :
                                <Text style={{ color: "#AC84FF" }} onPress={() => setCollapse(true)}>+more</Text>
                        )
                    }
                </Text>
            </View>
        </View>
    )
}

export default ReviewCard