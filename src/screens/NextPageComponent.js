// const { Component } = require("react");

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VideoPlayer from './VideoPlayer';

class NextPageComponent extends Component {

    let 

    state = {
        autoPlay: true,
        // playableUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        playableUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }

    componentDidMount() {
        // setTimeout(function() {
        //     this.setState({
        //         playableUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        //     });
        // }.bind(this), 10000);
    }

    render() {
        let msg = this.state.playableUrl;

        return (
            <View>
                <Text style={{fontSize: 48}}>
                    {msg}
                </Text>
                <VideoPlayer
                    id = 'video'
                    src = {this.state.playableUrl}
                    width = '100%'
                    height = '100%'
                    >

                </VideoPlayer>
                {/* <video
                    id="video"
                    autoPlay
                    controls
                    loop
                    style={{width: '400', height: '300'}}
                    width='100%'
                    height='600'
                    playsInline='true'
                    >
                    <source src={this.state.playableUrl} type="video/mp4"/>
                </video> */}
            </View>
        );
    }
}

export default NextPageComponent;