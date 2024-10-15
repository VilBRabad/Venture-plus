import { Animated, Image, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Star from "../assets/images/star.png";

export default function LodingAnimate() {

    const scale = useRef(new Animated.Value(1)).current;
    const rotate = useRef(new Animated.Value(0)).current;

    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const startInfiniteAnimation = () => {
        animationRef.current = Animated.loop(
            Animated.sequence([
                // First, rotate 360 degrees
                Animated.timing(rotate, {
                    toValue: 1, // 1 full rotation
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    // Then scale up
                    Animated.timing(scale, {
                        toValue: 1.5,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    // Then scale down
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );
        animationRef.current.start();
    };

    useEffect(() => {
        startInfiniteAnimation();
    }, []);

    const animatedStyle = {
        transform: [
            {
                rotate: rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'], // Full 360 degrees
                }),
            },
            { scale: scale }, // Scaling transformation
        ],
    };

    return (
        <Animated.View style={[styles.box, animatedStyle]} >
            <Image
                source={Star}
                style={{ width: '80%', height: "80%", zIndex: 10 }}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
        marginBottom: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
})