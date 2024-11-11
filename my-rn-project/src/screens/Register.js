import { Component } from "react";
import { TouchableOpacity, Text, View, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config"; // Asegúrate de que firestore esté configurado en config.js

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            user: "",
            password: "",
            registered: false,
            error: "",
            createdAt: ""
        };
    }

    handleSubmit = () => {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                return db.collection("users").doc(response.user.uid).set({
                    email: this.state.email,
                    user: this.state.user,
                    createdAt: Date.now()
                });
            })
            .then(() => {
                this.setState({ registered: true });
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                this.setState({ error: "Fallo el registro" });
                console.error("Error en el registro: ", error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Registro</Text>

                <TextInput
                    style={styles.fieldinput}
                    keyboardType="default"
                    placeholder="user"
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user}
                />

                <TextInput
                    style={styles.fieldinput}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.fieldinput}
                    keyboardType="default"
                    placeholder="password"
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />

                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.fieldbutton}>
                    <Text style={styles.textbutton}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.fieldbutton}>
                    <Text style={styles.textbutton}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        );
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textbutton: {
        color: "#fff"
    }
});

export default Register;