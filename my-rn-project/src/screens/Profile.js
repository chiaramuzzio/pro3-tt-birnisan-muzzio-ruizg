import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { auth, db } from "../firebase/config";
import PostCard from '../components/PostCard';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: auth.currentUser ? auth.currentUser.email : "",
            user: "User",
            posts: [],
            loading: true
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

        db.collection("posts").where('email', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            querySnapshot => {
                let posts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }));
                this.setState({ posts: posts, loading: false });
                console.log("Posts: ", posts);
            },
            error => {
                // console.error("Error fetching posts: ", error);
            }
        );
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
        if(this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='green' />
                </View>
            );
        }

        if (this.state.posts.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>No hay posts</Text>
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <Text style={styles.texto}>Mi Perfil</Text>
                    <Text>Nombre de usuario: {this.state.user} </Text>
                    <Text>Email de usuario: {this.state.email} </Text>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <PostCard post={item} />}
                    />
                    <Text>Cantidad de posteos: {this.state.posts.length} </Text>
                    <TouchableOpacity style={styles.fieldbutton} onPress={() => this.handleSignOut()}>
                        <Text style={styles.textbutton}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            );
        }
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