import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate("Login");
            }
        });
    }

    handleSignOut = () => {
        auth.signOut()
            .then(response => {
                console.log(response);
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.texto}>Mi Perfil</Text>

                <TouchableOpacity style={styles.fieldbutton} onPress={() => this.handleSignOut()}>
                    <Text style={styles.textbutton}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
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

export default Profile;