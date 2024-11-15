import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { auth, db } from "../firebase/config";
import Feather from '@expo/vector-icons/Feather';
import PostCard from '../components/PostCard';

// VER POR QUE PINGO NO SE ACTUALIZA SOLO CON POSTS NUEVOS NI CUANDO SE BORRAN EN PROFILE PERO EN HOME SI

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
            } else {
                db.collection("users")
                    .where("email", "==", auth.currentUser.email)
                    .onSnapshot(snapshot => {
                        if (!snapshot.empty) {
                            const doc = snapshot.docs[0];
                            this.setState({ user: doc.data().user });
                        }
                    });

                    this.fetchPosts();
 
            }
        });
    }

    // componentDidUpdate(){
    //     this.fetchPosts()
    // }

    fetchPosts = () => {
        db.collection("posts")
        .where('email', '==', auth.currentUser.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
            let posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            this.setState({ posts: posts, loading: false });
        }, error => {
            console.error("Error: ", error);
            this.setState({ loading: false });
        });
    }

    handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log("Cerro sesion exitosamente");
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='#1DA1F2' />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.username}>{this.state.user}</Text>
                    <TouchableOpacity onPress={() => this.handleSignOut()}>
                        <Feather name="log-out" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.email}>{this.state.email}</Text>
                <Text style={styles.postCount}>Cantidad de posteos: {this.state.posts.length}</Text>
                {this.state.posts.length === 0 ? (
                    <View style={styles.noPostsContainer}>
                        <Text>No hay posts</Text>
                    </View>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <PostCard post={item} condicion={true} />}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e8ed',
        marginBottom: 10
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#14171a'
    },
    email: {
        fontSize: 16,
        color: '#657786',
        marginBottom: 10
    },
    postCount: {
        fontSize: 16,
        color: '#657786',
        marginBottom: 10
    },
    logoutButton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 14
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Profile;