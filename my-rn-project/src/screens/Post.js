import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostForm from '../components/PostForm';
import { auth } from "../firebase/config";

class Post extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <PostForm/>
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
  }
});

export default Post;