import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BigPhoto from './BigPhoto'
import { BackHandler } from "react-native"

class Screen3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log(this.props.navigation.state.params.u)
        console.log(this.props.navigation.state.params.i)
        this.handleBackPress = this.handleBackPress.bind(this)
    }

    async handleBackPress() {
        await this.props.navigation.state.params.updating()
        this.props.navigation.goBack()
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <BigPhoto u={this.props.navigation.state.params.u} i={this.props.navigation.state.params.i} style={{ flex: 1 }} updating={this.props.navigation.state.params.updating}></BigPhoto>
            </View>
        );
    }
}

export default Screen3;
