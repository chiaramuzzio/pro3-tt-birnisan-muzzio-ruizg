import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { auth } from "../firebase/config"
import { TouchableOpacity } from "react-native";

function Home (props){

    handleSignOut = () => {
        auth.signOut()
        .then( response => {
            console.log(response)
            props.navigation.navigate("Login")
        })
        .catch( error => {
            console.log(error)
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Bienvenido {auth.currentUser.email}</Text>
            <TouchableOpacity style={styles.fieldbutton} onPress={() => handleSignOut()}>
                <Text style={styles.textbutton}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 20,
        fontWeight: "bold" 
    },
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    fieldinput: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        width: "50%"
    },
    fieldbutton: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
        marginBottom: 10,
        width: "max-width",
        // textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textbutton: {
        color: "#fff"
    }
})

export default Home;