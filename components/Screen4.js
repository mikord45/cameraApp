import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Button } from 'react-native';
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as MediaLibrary from "expo-media-library"
import { BackHandler } from "react-native"

class Screen4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
        this.state.width = Dimensions.get("window").width
        this.state.height = Dimensions.get("window").height
        this.changeCamera = this.changeCamera.bind(this)
        this.takePhoto = this.takePhoto.bind(this)
        this.handleBackPress = this.handleBackPress.bind(this)
    }
    async handleBackPress() {
        await this.props.navigation.state.params.updating()
        this.props.navigation.goBack()
    }

    async takePhoto() {
        let foto = await this.camera.takePictureAsync();
        let asset = await MediaLibrary.createAssetAsync(foto.uri);
        await this.props.navigation.state.params.updating()
        // domyslnie zapisuje w DCIM
        // alert(JSON.stringify(asset, null, 4))
    }

    changeCamera() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }
    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    render() {
        const hasCameraPermission = this.state.hasCameraPermission;
        // const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 10 }}>

                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: "row", alignItems: "baseline" }} onPress={this.changeCamera}>
                                    <Image
                                        source={require("./img/leftArrow.png")}
                                        style={{ width: 50, height: 50 }}
                                        resizeMode="contain"

                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: "row", alignItems: "baseline" }} onPress={this.takePhoto}>
                                    <Image
                                        source={require("./img/plus.png")}
                                        style={{ width: 50, height: 50 }}
                                        resizeMode="contain"

                                    />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: "row", alignItems: "baseline" }}>
                                    <Image
                                        source={require("./img/settings.png")}
                                        style={{ width: 50, height: 50 }}
                                        resizeMode="contain"

                                    />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </Camera>
                </View >
            );
        }
    }
}

export default Screen4;
