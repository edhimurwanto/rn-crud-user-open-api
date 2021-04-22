import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Modal, TextInput, Button, ToastAndroid } from "react-native";
import SearchComponent from '../../components/SearchComponent';
import VectorIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Feather'
import { createUser, editUser, listUser, removeUser } from '../users/UserService'
import CardUserComponent from './CardUserComponent';
import RadioButton from '../../components/RadioButton';
import { sort } from '../../utils'

const sortList = [
    {
        label: 'Nama A-Z',
        desc: 'asc',
        isActive: true
    },
    {
        label: 'Nama Z-A',
        desc: 'desc',
        isActive: false
    },
    {
        label: 'Email A-Z',
        desc: 'email-asc',
        isActive: false
    },
    {
        label: 'Email Z-A',
        desc: 'email-desc',
        isActive: false
    },
]


const initialForm = {
    id: "",
    name: "",
    gender: "",
    email: "",
    status: ""
}

const UserScreen = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const [users, setUsers] = useState([])
    const [form, setForm] = useState(initialForm)
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [sortBy, setSortBy] = useState(sortList)

    const handleSearchModalVisible = () => {
        setSearchModalVisible(!searchModalVisible)
    }

    const handleSelectedSort = (data) => {
        const newSortOrder = sortBy.map(sort => {
           if(sort.label == data.label){
               sort.isActive = true
           } else {
               sort.isActive = false
           }
           return sort;
        })

        setSortBy(newSortOrder)
        const sortedUser = sort(users, data.desc)
        setUsers(sortedUser)
        setSearchModalVisible(!searchModalVisible)
        
    }

    const loadData = () => {
        listUser().then(resp => {
            if (resp.code == 200) {
                setUsers(resp.data)
            }
        })
    }

    const handleSave = (action) => {
        switch (action) {
            case 'CREATE': {
                createUser(form).then(resp => {
                    console.log("CREATE USER", resp);
                    if (resp.code == 201) {
                        showtToast(`User created with ID ${resp.data.id}`)
                        setModalVisible(false)
                        loadData()
                    }
                })
            }

                break;

            case 'UPDATE': {
                editUser(form).then(resp => {
                    if (resp.code == 200) {
                        showtToast(`User updated with ID ${resp.data.id}`)
                        setModalVisible(false)
                        setForm(initialForm)
                        loadData()
                    }
                })
            }
                break;

            default:
                break;
        }
    }

    const showtToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }

    const handleTextInput = (name, text) => {
        setForm({ ...form, [name]: text })
    }

    const handleSelectedUser = (user) => {
        setForm(user)
        setModalVisible(true)
    }

    const handleDeleteUser = (id) => {
        removeUser(id).then(resp => {
            if(resp.code == 204){
                showtToast(`User with ID ${id} deleted`)
                loadData()
            }
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <View style={styles.container}>
            <SearchComponent placeholder={'Search User. . .'} sortTitle={'SORT'} handleSort={handleSearchModalVisible}/>
            <FlatList
                data={users}
                renderItem={({ item: user }) => <CardUserComponent data={user} handleClicked={handleSelectedUser} handleDeleteUser={handleDeleteUser}/>}
                keyExtractor={({ id }) => id}
                style={{padding: 10}}
            />
            <VectorIcon name='add-circle' size={66} style={{ position: 'absolute', bottom: 10, right: 10 }} color={'green'}
                onPress={() => setModalVisible(!modalVisible)}
            />
            <Modal
                visible={modalVisible}
                animationType='fade'
                presentationStyle='overFullScreen'
            >
                <View style={styles.centeredModal}>
                    <View style={styles.modalView}>
                        <View style={styles.title}>
                            <Text style={styles.modalTitle}>New User</Text>
                            <Icon
                                name='x'
                                size={24}
                                onPress={() => setModalVisible(false)}
                            />
                        </View>

                        <TextInput
                            value={form.name}
                            placeholder="Name"
                            onChangeText={(text) => handleTextInput('name', text)}
                        />
                        <TextInput
                            value={form.gender}
                            placeholder="Gender"
                            onChangeText={(text) => handleTextInput('gender', text)}
                        />
                        <TextInput
                            value={form.email}
                            placeholder="email"
                            onChangeText={(text) => handleTextInput('email', text)}
                        />
                        <TextInput
                            value={form.status}
                            placeholder="status"
                            onChangeText={(text) => handleTextInput('status', text)}
                        />
                        <Button
                            title="Save"
                            onPress={() => {
                                if (!form.id) {
                                    handleSave('CREATE')
                                } else {
                                    handleSave('UPDATE')
                                }
                            }}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                    visible={searchModalVisible}
                    onDismiss={handleSearchModalVisible}
                    transparent={true}
                    onRequestClose={handleSearchModalVisible}
                    onMagicTap={handleSearchModalVisible}
                    animationType={'fade'}
                >
                    <View style={styles.centeredModal}>
                        <View style={styles.modalContainer}>
                            <RadioButton
                                data={sortBy}
                                styles={{ paddingVertical: 16 }}
                                selectedColor='orange'
                                unselectedColor='white'
                                handleSelectedSort={handleSelectedSort}
                                />
                        </View>
                    </View>
                </Modal>

        </View>);
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centeredModal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    modalView: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 16,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalContainer: {
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30, backgroundColor: 'white',
        borderRadius: 4
    },

})