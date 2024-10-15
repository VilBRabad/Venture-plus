import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks';
import { setRevenue } from '../../redux/filter/filterSlice';

export default function RevenueScreen() {
    const [inputValue, setInputValue] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleAddClick = () => {
        if (inputValue) {
            dispatch(setRevenue(inputValue));
            setInputValue("");
        }
    }

    return (
        <ScrollView scrollEnabled={true} style={{ backgroundColor: '#000000', paddingVertical: 6 }} >
            <View style={styles.container}>
                {/* TextInput for user input */}
                <View style={[styles.input, { borderColor: inputFocus ? "#AC84FF" : "gray" }]}>
                    <View style={{ backgroundColor: "#AC84FF", height: '100%', justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text style={{ color: "#000000", fontWeight: "600" }}>MIN:</Text>
                    </View>
                    <Text style={{ color: "#ffffff", fontWeight: '600', fontSize: 15, paddingHorizontal: 10 }}>$</Text>
                    <TextInput
                        style={{ width: '62%' }}
                        placeholder="e.g. 100000"
                        value={inputValue}
                        keyboardType='numeric'
                        onChangeText={setInputValue}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                    />
                    <TouchableOpacity onPress={handleAddClick} style={{ height: '100%', width: '20%', backgroundColor: "#AC84FF", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#000000", fontWeight: '600' }}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingRight: 15,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        overflow: 'hidden'
    },
})