import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";


function Profile (props){
    return(
        <View>
            <Text>Mi Perfil</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                <Text>Salir de la app. Hacer click aquí te lleva a login.</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Profile;