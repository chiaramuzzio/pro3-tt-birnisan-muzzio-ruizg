import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase/config";
import PostGrid from '../components/PostGrid';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: auth.currentUser ? auth.currentUser.email : "",
            user: "User"
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate("Login");
            } 
            else {
                db.collection("users")
                    .where("email", "==", auth.currentUser.email)
                    .onSnapshot(snapshot => {
                        if (!snapshot.empty) {
                            const doc = snapshot.docs[0];
                            this.setState({ user: doc.data().user });   
                        }
                    });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.texto}>Bienvenido de nuevo, {this.state.user}</Text>
                <PostGrid/>
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
    }
});

export default Home;