import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PostForm from '../components/PostForm';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Post </Text>
        <PostForm/>
      </View>
    );
  }
}

export default Post;
