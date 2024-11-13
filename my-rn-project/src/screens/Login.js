import { Component } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from "../firebase/config";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.props.navigation.navigate("HomeMenu")
            }
        })
    }

    login = () => {
        const { email, password } = this.state;

        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.props.navigation.navigate("HomeMenu");
            })
            .catch(error => {
                if (!email.includes("@")) {
                    console.log("Email mal formateado");
                }
        
                if (password.length < 6) {
                    console.log("La password debe tener una longitud mínima de 6 caracteres");
                }
                
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    console.log("Credenciales incorrectas");
                }
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Ingresar</Text>

                <TextInput style={styles.fieldinput}
                keyboardType="email-adress"
                placeholder="email"
                onChangeText={ text => this.setState({email: text})}
                value={this.state.email}
                />

                <TextInput style={styles.fieldinput}
                keyboardType="default"
                placeholder="password"
                onChangeText={ text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
                />

                <TouchableOpacity style={styles.fieldbutton} onPress={() => this.login()}>
                    <Text style={styles.textbutton}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fieldbutton} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.textbutton}>No tengo cuenta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fieldbutton} onPress={() => this.props.navigation.navigate("HomeMenu")}>
                    <Text style={styles.textbutton}>Entrar en la app</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({ 
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


export default Login;