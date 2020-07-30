import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import * as Permissions from "expo-permissions"
import * as MediaLibrary from "expo-media-library"
import FotoItem from './FotoItem';
import { ToastAndroid } from 'react-native';
class Screen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numColumns: 4,
            photos: [],
        };
        this.state.width = Dimensions.get("window").width
        this.state.height = Dimensions.get("window").height
        this.state.fSize = this.state.width * 0.1
        this.state.fSize2 = this.state.width * 0.05
        this.changeNums = this.changeNums.bind(this)
        this.fotoTouched = this.fotoTouched.bind(this)
        this.remove = this.remove.bind(this)
        this.goToBigPhoto = this.goToBigPhoto.bind(this)
        this.goToCam = this.goToCam.bind(this)
        this.updateGallery = this.updateGallery.bind(this)
    }

    async updateGallery() {
        console.log("WYDARZYLO SIE")
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo',
            createdAfter: 1572562800000,
        })
        for (let i = 0; i < obj.assets.length; i++) {
            obj.assets[i].checked = false
        }
        obj.assets.sort((a, b) => (a.creationTime < b.creationTime) ? 1 : -1)
        this.setState({
            photos: obj.assets
        })
    }

    goToCam() {
        this.props.navigation.navigate("s4", { updating: this.updateGallery })
    }

    goToBigPhoto(receivedID2) {
        console.log(receivedID2)
        var uri = null
        var id = receivedID2
        for (let i = 0; i < this.state.photos.length; i++) {
            if (this.state.photos[i].id == receivedID2) {
                uri = this.state.photos[i].uri
            }
        }
        this.props.navigation.navigate("s3", { u: uri, i: id, updating: this.updateGallery })
    }
    async remove(allPhotos) {
        console.log("usuwamy wybrane zdj")
        var tabToDelete = []
        for (let i = 0; i < allPhotos.length; i++) {
            if (allPhotos[i].checked == true) {
                tabToDelete.push(allPhotos[i].id)
            }
        }
        console.log(tabToDelete)
        if (tabToDelete.length != 0) {
            await MediaLibrary.deleteAssetsAsync(tabToDelete)
            let obj = await MediaLibrary.getAssetsAsync({
                first: 100,
                mediaType: 'photo',
                createdAfter: 1572562800000,
            })
            for (let i = 0; i < obj.assets.length; i++) {
                obj.assets[i].checked = false
            }
            obj.assets.sort((a, b) => (a.creationTime < b.creationTime) ? 1 : -1)
            this.setState({
                photos: obj.assets
            })
        }
        else {
            ToastAndroid.showWithGravity(
                'zaznacz zdjęcia do usunięcia!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

    }

    fotoTouched(receivedID) {
        var before = this.state.photos
        for (let i = 0; i < before.length; i++) {
            if (before[i].id == receivedID) {
                if (before[i].checked == true) {
                    before[i].checked = false
                }
                else {
                    before[i].checked = true
                }
            }
        }
        this.setState({
            photos: before
        })
    }

    changeNums() {
        if (this.state.numColumns == 4) {
            this.setState({
                numColumns: 1
            })
        }
        else {
            this.setState({
                numColumns: 4
            })
        }

    }

    async componentDidMount() {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo',
            createdAfter: 1572562800000,
        })
        for (let i = 0; i < obj.assets.length; i++) {
            obj.assets[i].checked = false
        }
        obj.assets.sort((a, b) => (a.creationTime < b.creationTime) ? 1 : -1)
        this.setState({
            photos: obj.assets
        })
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around" }}>
                    <TouchableOpacity onPress={this.changeNums}>
                        <Text style={{ fontSize: this.state.fSize2 / 1.5, fontWeight: "bold" }}> GRID /LIST </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToCam}>
                        <Text style={{ fontSize: this.state.fSize2 / 1.5, fontWeight: "bold" }}> OPEN CAMERA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.remove.bind(this, this.state.photos)}>
                        <Text style={{ fontSize: this.state.fSize2 / 1.5, fontWeight: "bold" }}> REMOVE SELECTED</Text>
                    </TouchableOpacity>
                </View >
                <View style={{ flex: 20 }}>
                    <FlatList
                        style={{}}
                        data={this.state.photos}
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                        renderItem={({ item, i }) => <FotoItem info={item} cW={this.state.width} nC={this.state.numColumns} cH={this.state.height} touched={this.fotoTouched} checked={this.state.listOfTouched} bF={this.goToBigPhoto}></FotoItem>}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </View>
        );
    }
}

export default Screen2;
