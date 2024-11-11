import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeMenu from './src/components/HomeMenu';
import Profile from './src/screens/Profile';
import Post from './src/screens/Post';
import Users from './src/screens/Users';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Post" component={Post} options={{headerShown: false}}/>
        <Stack.Screen name="Users" component={Users} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}