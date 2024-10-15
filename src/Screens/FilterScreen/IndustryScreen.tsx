import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { industries } from '../../assets/data/filtersData'
import { useAppDispatch } from '../../hooks';
import { setIndustry } from '../../redux/filter/filterSlice';

export default function IndustryScreen() {
    const [inputValue, setInputValue] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const handleInputChange = (text: string) => {
        setInputValue(text);

        const filtered = industries.filter((option) =>
            option.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleOptionPress = (option: string) => {
        setInputValue(option);
        setFilteredOptions([]); // Hide dropdown when an option is selected
    };

    const handleAddClick = () => {
        if (inputValue) {
            dispatch(setIndustry(inputValue));
            setInputValue("");
            setFilteredOptions([]);
        }
    }

    return (
        <KeyboardAvoidingView style={{ backgroundColor: '#000000', paddingVertical: 6, height: '100%' }} >
            <View style={styles.container}>
                {/* TextInput for user input */}
                <View style={[styles.input, { borderColor: inputFocus ? "#AC84FF" : "gray" }]}>
                    <TextInput
                        style={{ width: '80%' }}
                        placeholder="e.g. Financial"
                        value={inputValue}
                        onChangeText={handleInputChange}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                    />
                    <TouchableOpacity onPress={handleAddClick} style={{ height: '100%', width: '20%', backgroundColor: "#AC84FF", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#000000", fontWeight: '600' }}>ADD</Text>
                    </TouchableOpacity>
                </View>

                {/* Dropdown with filtered options */}
                {filteredOptions.length > 0 && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleOptionPress(item)}>
                                    <Text style={styles.dropdownItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    dropdown: {
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: 'gray',
        maxHeight: 260, // Limit dropdown height
        borderRadius: 5,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
})