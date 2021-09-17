import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import UserScreen from '../screens/users/UserScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import VectorIcon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const HomeTab = () => (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'purple'
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <VectorIcon name='home' size={size} color={color} />
                }}
            />
            <Tab.Screen name="History" component={HistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <VectorIcon name='bar-chart-2' size={size} color={color} />
                }}
            />
            <Tab.Screen name="Notification" component={NotificationScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => <VectorIcon name='bell' size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
)

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen" >
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='UserScreen'
                    component={UserScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HomeTab;