import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: "",
            user: ""
        };
    }

    componentDidMount() {
        const user = auth.currentUser;

        db.collection("users").doc(user.uid).get()
        .then(doc => {
            if (doc.exists) {
                const username = doc.data().user;
                this.setState({ user: username });
                console.log("Usuario: ", username);
            }
        })
    }

    handleSubmit() {
        const user = auth.currentUser;
        const email = user.email;

        db.collection("posts").add({
            tweet: this.state.tweet,
            email: email,
            user: this.state.user,
            likes: [],
            createdAt: Date.now(),
            userId: user.uid
        })
        .then(() => {
            console.log("Posteado");
            this.setState({ tweet: "" }); 
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Compose new Tweet</Text>
                </View>
                <TextInput
                    style={styles.fieldinput}
                    keyboardType="default"
                    placeholder="What's happening?"
                    onChangeText={text => this.setState({ tweet: text })}
                    value={this.state.tweet}
                    multiline
                />
                <TouchableOpacity onPress={() => this.handleSubmit()} style={styles.fieldbutton}>
                    <Text style={styles.textbutton}>Tweet</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fieldinput: {
        height: 100,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    fieldbutton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'flex-end',
    },
    textbutton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PostForm;