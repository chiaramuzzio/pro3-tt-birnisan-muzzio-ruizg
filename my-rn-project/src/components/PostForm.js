import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class PostForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            posteo: ""
        }
    }
    
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.fieldinput}
                keyboardType="default"
                placeholder="What is happening?!"
                onChangeText={ text => this.setState({posteo: text})}
                value={this.state.posteo}
                />
                <TouchableOpacity onPress={() => console.log(this.state)} style={styles.fieldbutton}>
                    <Text style={styles.textbutton}>Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    fieldinput: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        width: "50%"
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
        // textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textbutton: {
        color: "#fff"
    }
})