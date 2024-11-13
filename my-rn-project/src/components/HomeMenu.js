import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { auth } from "../firebase/config";
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Users from '../screens/Users';
import Post from '../screens/Post';

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate("Login");
            }
        });
    }

    render() {
        return (
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{ tabBarIcon: () => <Feather name="home" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{ tabBarIcon: () => <Feather name="user" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name="Users"
                    component={Users}
                    options={{ tabBarIcon: () => <Feather name="users" size={24} color="black" /> }}
                />
                <Tab.Screen
                    name="Post"
                    component={Post}
                    options={{ tabBarIcon: () => <Feather name="feather" size={24} color="black" /> }}
                />
            </Tab.Navigator>
        );
    }
}

export default HomeMenu;