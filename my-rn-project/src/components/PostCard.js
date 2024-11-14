import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from "../firebase/config";
import firebase from 'firebase/app';

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post,
            liked: false,
            likeCount: this.props.post.data.likes.length,
            condicion: this.props.condicion
        };
    }

    componentDidMount() {
        this.setState({ liked: this.state.post.data.likes.includes(auth.currentUser.email) });
        console.log(this.state.post);
    }

    like() {
        db.collection("posts")
            .doc(this.state.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ liked: true, likeCount: this.state.likeCount + 1 });
                console.log("Like exitoso");
            })
            .catch(error => {
                console.error("Error al dar like: ", error);
            });
    }

    unlike() {
        db.collection("posts")
            .doc(this.state.post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ liked: false, likeCount: this.state.likeCount - 1 });
                console.log("Unlike exitoso");
            })
            .catch(error => {
                console.error("Error al quitar like: ", error);
            });
    }

    handleDelete = (postId) => {
        db.collection("posts").doc(postId).delete()
            .then(() => {
                console.log("Post eliminado!");
            })
            .catch(error => {
                console.error("Error al eliminar el post: ", error);
            });
    }

    render() {
        const { post, liked, likeCount, condicion } = this.state;
        const createdAt = new Date(post.data.createdAt).toLocaleDateString();

        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.username}>{post.data.user}</Text>
                    <Text style={styles.date}>{createdAt}</Text>
                </View>
                <Text style={styles.tweet}>{post.data.tweet}</Text>
                <View style={styles.footer}>
                    <Text style={styles.likes}>Liked by {likeCount}</Text>
                    <TouchableOpacity onPress={() => (liked ? this.unlike() : this.like())} style={styles.likeButton}>
                        <Text style={styles.likeButtonText}>{liked ? "Unlike" : "Like"}</Text>
                    </TouchableOpacity>
                </View>
                {condicion && (
                    <TouchableOpacity style={styles.eliminarButton} onPress={() => this.handleDelete(post.id)}>
                        <Text style={styles.eliminarButtonText}>Eliminar</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '95%',
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10
    },
    date: {
        color: '#657786',
        fontSize: 14
    },
    tweet: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e1e8ed',
        paddingTop: 10
    },
    likes: {
        color: '#657786',
        fontSize: 14
    },
    likeButton: {
        backgroundColor: '#1DA1F2',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20
    },
    likeButtonText: {
        color: '#fff',
        fontSize: 14
    },
    eliminarButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    eliminarButtonText: {
        color: '#fff',
        fontSize: 14
    }
});

export default PostCard;