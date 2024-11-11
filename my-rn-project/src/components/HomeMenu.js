import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Users from "../screens/Users";
import Post from "../screens/Post";

const Tab = createBottomTabNavigator();

function HomeMenu (){
    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <FontAwesome6 name="house" size={24} color="black" />}}/>
            <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: () => <FontAwesome6 name="user-large" size={24} color="black" />}}/>
            <Tab.Screen name="Users" component={Users} options={{tabBarIcon: () => <FontAwesome6 name="user-group" size={24} color="black" />}}/>
            <Tab.Screen name="Post" component={Post} options={{tabBarIcon: () => <FontAwesome6 name="feather-pointed" size={24} color="black" />}}/>
        </Tab.Navigator>
    )
}

export default HomeMenu;