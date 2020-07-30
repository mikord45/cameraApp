import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.change}>
                    <Text style={{ color: "#de31c7", fontWeight: "bold" }}> START  </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
MyButton.propTypes = {
    testProp1: PropTypes.string.isRequired
}

export default MyButton;
