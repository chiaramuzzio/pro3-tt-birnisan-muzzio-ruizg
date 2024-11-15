import { Component } from "react";
import { TouchableOpacity, Text, View, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

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

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("Login");
            }
        });
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
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    style={styles.fieldinput}
                    keyboardType="default"
                    placeholder="Usuario"
                    onChangeText={text => this.setState({ user: text })}
                    value={this.state.user}
                />

                <TextInput
                    style={styles.fieldinput}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.fieldinput}
                    keyboardType="default"
                    placeholder="Contraseña"
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />

                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.fieldbutton}>
                    <Text style={styles.textbutton}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.linkbutton}>
                    <Text style={styles.linktext}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#14171a',
        marginBottom: 20
    },
    fieldinput: {
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        marginVertical: 10,
        width: '80%',
        backgroundColor: '#fff'
    },
    fieldbutton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbutton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    linkbutton: {
        marginVertical: 5
    },
    linktext: {
        color: '#1DA1F2',
        fontSize: 16
    }
});

export default Register;