import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { flagColor } from '../../utils';


const CardUserComponent = ({ data, handleClicked, handleDeleteUser }) => {

    const handleDelete = () => {
        Alert.alert(
            "Delete User",
            "Are you sure to remove this user ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => handleDeleteUser(data.id) }
            ]
        );
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: 
            data.status === 'Active' ? 'rgba(123, 239, 178, 0.2)' : 'rgba(253, 227, 167, 0.2)'
        }]} onPress={() => handleClicked(data)}>
            <View style={[styles.cardColor, { backgroundColor: flagColor(data.status)}]}></View>
            <Icon
                name='x'
                size={24}
                style={styles.title}
                onPress={handleDelete}
            />
            <View style={styles.dataContainer}>
                <Text style={styles.textNameStyle}>{data.name}</Text>
                <Text style={styles.text}>{data.gender}</Text>
                <Text style={styles.text}>{data.email}</Text>
                <Text style={styles.text}>{data.status}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default CardUserComponent;

const styles = StyleSheet.create({
    container: {
        height: 124,
        flexDirection: 'row',
        backgroundColor: 'white',
        display: 'flex',
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    title: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    dataContainer: {
        padding: 16,
        justifyContent: 'center',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8
    },
    cardColor: {
        height: 124,
        width: 10,
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8
    },
    textNameStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        fontWeight: '900'
    }
})
