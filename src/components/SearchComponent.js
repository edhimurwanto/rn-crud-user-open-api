import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

const width = Dimensions.get('window').width

const SearchComponent = ({ handleSearchInput, handleSort, placeholder, sortTitle }) => {

    return (
        <View style={styles.container}>
            <Feather name='search' size={24} color='#aaa' style={{ alignSelf: 'center', padding: 12 }} />
            <TextInput
                placeholder={placeholder}
                style={styles.search}
                onChangeText={(text) => handleSearchInput(text)}
            />
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 12, backgroundColor: 'white', borderRadius: 4, }}
                onPress={handleSort}
            >
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'orange', fontSize: 16 }}>{sortTitle}</Text>
                    <Feather name='chevron-down' size={26} color='orange' style={{ alignSelf: 'center' }} />
                </View>

            </TouchableOpacity>
        </View>
    );
}

export default SearchComponent;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 64,
        width: width - 20,
        borderColor: '#aaa',
        borderRadius: 4,
        backgroundColor: '#fff',
        margin: 10
    },
    search: {
        flex: 3,
    }
})
