import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        if (this.props.nC == 4) {
            this.state.W = this.props.cW / this.props.nC
            this.state.H = this.props.cW / this.props.nC
        }
        else {
            this.state.W = this.props.cW
            this.state.H = this.props.cH / 5
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onLongPress={this.props.touched.bind(this, this.props.info.id)} onPress={this.props.bF.bind(this, this.props.info.id)}>
                    {
                        this.props.info.checked == true ?
                            <Image
                                style={{
                                    width: this.state.W,
                                    height: this.state.H,
                                    opacity: 0.5
                                }}
                                source={{ uri: this.props.info.uri }}
                            />
                            :
                            <Image
                                style={{
                                    width: this.state.W,
                                    height: this.state.H,

                                }}
                                source={{ uri: this.props.info.uri }}
                            />
                    }

                </TouchableOpacity>
                <Text style={{ position: "absolute", left: 0, bottom: 0 }}>
                    {this.props.info.id}
                </Text>
            </View>
        );
    }
}

export default FotoItem;
