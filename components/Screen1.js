import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Dimensions } from "react-native";
import { KeyboardAvoidingView, Alert } from 'react-native';
import MyButton from "./MyButton"
import * as Font from "expo-font";

class Screen1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            u: "",
            p: ""
        };
        this.state.width = Dimensions.get("window").width
        this.state.fSize = this.state.width * 0.1
        this.state.fSize2 = this.state.width * 0.05
        this.toSecond = this.toSecond.bind(this)
    }

    toSecond() {
        this.props.navigation.navigate("s2")
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#de31c7", justifyContent: "center", alignItems: "center" }}>

                    <Text style={{ fontSize: this.state.fSize }} > Camera App </Text>
                    <Text style={{ fontSize: this.state.fSize2 }}> show galery pictures</Text>
                    <Text style={{ fontSize: this.state.fSize2 }}> take pictures from camera</Text>
                    <Text style={{ fontSize: this.state.fSize2 }}> save photo to device</Text>
                    <Text style={{ fontSize: this.state.fSize2 }}> delete photo from device</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <MyButton testProp1="" change={this.toSecond}> </MyButton>
                </View>
            </View >
        );
    }
}

export default Screen1;
