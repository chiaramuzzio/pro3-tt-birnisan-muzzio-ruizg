import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from "../firebase/config";
import PostCard from './PostCard';

class PostGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        };
    }

    componentDidMount() {
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
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <PostCard post={item} />}
                    />
                </View>
            );
        }
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
    }
});

export default PostGrid;