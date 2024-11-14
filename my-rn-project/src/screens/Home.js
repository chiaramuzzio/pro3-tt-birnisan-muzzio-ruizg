import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase/config";
import PostCard from '../components/PostCard';

class Home extends Component {
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

        db.collection("posts").orderBy('createdAt', 'desc').onSnapshot(
            querySnapshot => {
                let posts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }));
                this.setState({ posts: posts, loading: false });
                console.log("Posts: ", posts);
            },
            error => {
                console.error("Error fetching posts: ", error);
            }
        );
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
                    <Text style={styles.texto}>Bienvenido de nuevo, {this.state.user}</Text>

                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <PostCard condicion={false} post={item} />}
                    />
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
    }
});

export default Home;