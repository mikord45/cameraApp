import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Dimensions } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as MediaLibrary from "expo-media-library"

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.state.width = Dimensions.get("window").width
        this.state.height = Dimensions.get("window").height
        this.removeThatOne = this.removeThatOne.bind(this)
    }

    async removeThatOne() {
        await MediaLibrary.deleteAssetsAsync(this.props.i)
        await this.props.updating()
    }

    render() {
        return (
            <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={{ flex: 2, backgroundColor: "green" }}>
                    <Image
                        style={{
                            width: this.state.width,
                            height: this.state.height / 3 * 2,
                        }}
                        source={{ uri: this.props.u }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <TouchableOpacity onPress={this.removeThatOne}>
                        <Text style={{ color: "#de31c7", fontWeight: "bold", textAlign: "center" }}>
                            DELETE
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}

export default BigPhoto;
