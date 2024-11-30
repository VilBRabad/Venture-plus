import { KeyboardAvoidingView, Dimensions, Animated, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useRef } from 'react'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthHeaderPage from '../components/AuthHeaderPage';


const { height } = Dimensions.get('window');
export default function AuthScreen() {

    const width = Dimensions.get('window').width;
    const animation = useRef(new Animated.Value(0)).current;

    const loginBgInterpolate: Animated.AnimatedInterpolation<string> = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['#000000', '#AC84FF'],
    });
    const signUpBgInterpolate: Animated.AnimatedInterpolation<string> = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['#AC84FF', '#000000'],
    });

    const loginTextInterpolate: Animated.AnimatedInterpolation<string> = animation.interpolate({
        inputRange: [0, width],
        outputRange: ["#FFFFFF", "#000000"],
    })
    const signUpTextInterpolate: Animated.AnimatedInterpolation<string> = animation.interpolate({
        inputRange: [0, width],
        outputRange: ["#000000", "#FFFFFF"],
    })

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={[styles.formContainer, styles.normalContainer]}>
                <Text style={styles.headText}>Login or</Text>
                <Text style={[styles.headText, { marginBottom: 8 }]}>Sign Up Today</Text>
                <Text style={styles.smallText}>We value your privacy and never share your data.</Text>
                <View style={styles.btnContainer}>
                    <TouchableWithoutFeedback>
                        <AuthHeaderPage title='Log in' backgroundColor={loginBgInterpolate} textColor={loginTextInterpolate} />
                    </TouchableWithoutFeedback>
                    <AuthHeaderPage title='Sign up' backgroundColor={signUpBgInterpolate} textColor={signUpTextInterpolate} />
                </View>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={{ width: '100%', marginVertical: 25, gap: 15 }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: animation } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <LoginForm />
                    <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false}>
                        <RegisterForm />
                    </ScrollView>
                </Animated.ScrollView>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        paddingTop: 50,
        height
    },
    normalContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: "100%",
        position: 'relative',
        paddingVertical: 50
    },
    headText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: '600'
    },
    smallText: {
        color: "#AAAAAA",
        width: '50%',
        textAlign: 'center',
        marginVertical: 10
    },
    btnContainer: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: "#AC84FF",
        height: 48,
        width: "80%",
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10,
    },
    setBtn: {
        backgroundColor: "#000000",
    },
    textBlack: {
        color: "#000000"
    },
    textWhite: {
        color: "#FFFFFF"
    },
})