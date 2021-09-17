import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Home SCREEN</Text>
            <Button title='Go to User Screen' onPress={() => navigation.navigate('UserScreen') }/>
        </SafeAreaView>
    );
}

export default HomeScreen;