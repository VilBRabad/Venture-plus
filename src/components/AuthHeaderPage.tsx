import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

type AuthHeaderPageProps = {
    title: string;
    backgroundColor: Animated.AnimatedInterpolation<string>;
    textColor: Animated.AnimatedInterpolation<string>;
};


export default function AuthHeaderPage({ title, backgroundColor, textColor }: AuthHeaderPageProps) {
    return (
        <TouchableWithoutFeedback>
            <Animated.View style={[styles.upBtn, { backgroundColor: backgroundColor }]}>
                <Animated.Text style={{ color: textColor }}>{title}</Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    upBtn: {
        width: '48%',
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
})