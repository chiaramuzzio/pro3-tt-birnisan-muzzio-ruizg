import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { auth } from "../firebase/config";

class Users extends Component {
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
      <View>
        <Text> Users </Text>
      </View>
    );
  }
}

export default Users;
