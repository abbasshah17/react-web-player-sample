import React from 'react';
import { Text, View, Button } from 'react-native';
import { Range, getTrackBackground } from 'react-range';

export default class VideoPlayer extends React.PureComponent {

    container = undefined
    containerElementId = 'container'
    videoElementId = 'video'
    player = undefined
    src = ''

    state = {
        isPlaying: false,
        isBuffering: false
    }

    constructor(props) {
        super(props)

        this.onPlay = this.onPlay.bind(this)
        this.onPause = this.onPause.bind(this)
        this.onSeek = this.onSeek.bind(this)
        this.onToggleFullscreen = this.onToggleFullscreen.bind(this)

        if (this.props.id) {
            console.log('id: ' + this.props.id)

            this.videoElementId = this.props.id
        }
        else {
            this.videoElementId = 'video'
        }

        this.src = this.props.src
    }

    componentDidMount() {
        this.container.setNativeProps({
            id: this.containerElementId
        })

        this.setupPlayerListenersAndCallbacks()
    }

    setupPlayerListenersAndCallbacks() {
        this.player.onplaying = function() {
            this.setState({
                isPlaying: true,
                isBuffering: false
            })
        }.bind(this)
        this.player.onpause = function() {
            this.setState({
                isPlaying: false
            })
        }.bind(this)
        this.player.onerror = function() {
            this.props.onError()
        }.bind(this)
        this.player.onloadstart = function() {
            console.log('onLoadStart')
            this.setState({
                isBuffering: true
            })
        }.bind(this)
        this.player.onloadedmetadata = function() {
            console.log('On Loaded Metadata')
        }.bind(this)
        this.player.onloadeddata = function() {
            console.log('On Loaded Data')
        }.bind(this)
        this.player.onwaiting = function() {
            console.log('Buffering')
            this.setState({
                isBuffering: true
            })
        }.bind(this)
    }
    
    render() {

        console.log(this.videoElementId)

        let seekbarMin = 0;
        let seekbarMax = (this.player !== undefined && this.player.duration !== 'NaN' && this.player.duration > 0) ? this.player.duration : 100;

        const seekbar = 
            <Range
                step={0.1}
                min={seekbarMin}
                max={seekbarMax}
                values={[this.player !== undefined ? this.player.currentTime: 0]}
                onChange={values => this.onSeek(values)}
                renderTrack={({ props, children }) => (
                    <div
                     onMouseDown={props.onMouseDown}
                     onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: '10px',
                        display: 'flex',
                        marginStart: 100,
                        marginEnd: 100,
                        width: '100%'
                      }}>
                      <div
                        ref={props.ref}
                        style={{
                          height: '2px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: [this.player !== undefined ? this.player.currentTime: 0],
                            colors: ['#ffbf3f', '#ccc'],
                            min: seekbarMin,
                            max: seekbarMax
                          }),
                          alignSelf: 'center'
                        }}>
                        {children}
                      </div>
                    </div>
                  )}
                renderThumb={({ props }) => ( <div
                    {...props}
                    style={{
                    ...props.style,
                    height: '16px',
                    width: '16px',
                    borderRadius: 50,
                    backgroundColor: '#ffbf3f'
                    }}/>
                )}
                />

        if (this.props.src !== this.src) {
            this.src = this.props.src;
            setTimeout(function() {
                this.player.load()
            }.bind(this), 100)
        }

        return (
            <View
                id = {this.containerElementId}
                ref = {playerContainer => this.container = playerContainer}
                >
                <video
                    ref = {video => this.player = video}
                    autoPlay
                    loop
                    id = {this.videoElementId}
                    style = {{width: this.props.width, height: this.props.height}}
                    width = {this.props.width}
                    height = {this.props.height}
                    playsInline = {true}
                    >
                    <source src={this.src} type = "video/mp4"/>
                </video>

                <View id = 'controls'
                    // ref={component => this.container = component}
                    style = {{
                        flexDirection: "column",
                        position: 'absolute',
                        zIndex: 2147483648,
                        width: this.props.width,
                        height: this.props.height,
                        // backgroundColor: 'red'
                    }}
                    >
                    
                    <View
                        style = {{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingTop: 10,
                        }}
                        >
                        <Text
                            style = {{
                                color: 'white',
                                fontSize: 24,
                            }}
                            >
                            Big Buck Bunny
                        </Text>
                    </View>
                    <View
                        style = {{
                            flex: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                        >
                        <Button
                            title = 'Prev'>

                        </Button>
                        <Button
                            title = 'Rewind'>

                        </Button>
                        {
                            !this.state.isPlaying ?
                                <Button
                                    title = 'Play'
                                    onPress = {this.onPlay}
                                    style = {{
                                        alignSelf: 'center',
                                    }}
                                    >
                                </Button>
                            :
                                <Button
                                    title = 'Pause'
                                    onPress = {this.onPause}
                                    style = {{
                                        alignSelf: 'center',
                                        position: 'absolute',
                                        flex: 1,
                                    }}
                                    >
                                </Button>
                        }
                        {
                            this.state.isBuffering ?
                                <Text
                                    style = {{
                                        fontSize: 16,
                                        color: 'white',
                                        marginTop: 100,
                                        alignSelf: 'center',
                                        position: 'absolute',
                                    }}>
                                    Loading
                                </Text>
                            :
                                null
                        }
                        <Button
                            title = 'Forward'>

                        </Button>
                        <Button
                            title = 'Next'>

                        </Button>
                    </View>

                    <View
                        style = {{
                            flex: 1,
                            flexDirection: 'row',
                            paddingStart: 10,
                            paddingEnd: 10,
                            paddingBottom: 10,
                            alignItems: 'flex-end',
                        }}
                        >
                        <View
                            style = {{
                                flex: 5,
                                paddingEnd: 10
                            }}>
                            {seekbar}
                        </View>
                        <Button
                            title = 'FullScreen'
                            onPress = {this.onToggleFullscreen}
                            style = {{
                                flex: 1,
                            }}
                            >

                        </Button>
                    </View>
                </View>
            </View>
        )
    }

    onPlay() {
        if (this.player) {
            this.player.play()
        }
    }

    onPause() {
        console.log('pause')
        if (this.player) {
            this.player.pause()
        }
    }

    onSeek(time) {
        if (this.player) {
            this.player.currentTime  = time
        }
    }

    isFullscreenAvailable() {
        let isFullscreenAvailable = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen)

        console.log('Is Fullscreen Available' + isFullscreenAvailable)

        return isFullscreenAvailable
    }

    isInFullscreen() {
        let isInFullscreen = !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)

        console.log('Is in Fullscreen: ' + isInFullscreen)

        return isInFullscreen
    }

    onToggleFullscreen() {
        if (this.isInFullscreen()) {
            this.onExitFullscreen()
        }
        else {
            this.onFullscreen()
        }
    }

    onFullscreen() {
        let fullScreenContainer = document.getElementById(this.containerElementId)

        console.log(fullScreenContainer)

        if (fullScreenContainer) {
            if (fullScreenContainer.requestFullscreen) {
                console.log('requestFullscreen')
                fullScreenContainer.requestFullscreen()
            }
            else if (fullScreenContainer.mozRequestFullScreen) {
                fullScreenContainer.mozRequestFullScreen()
            }
            else if (fullScreenContainer.webkitEnterFullscreen) {
                fullScreenContainer.webkitEnterFullscreen()
            }
            else if (fullScreenContainer.msRequestFullscreen) {
                fullScreenContainer.msRequestFullscreen()
            }
            else {
                console.log('nothing matched')
            }
        }
    }

    onExitFullscreen() {
        let fullScreenContainer = document.getElementById(this.containerElementId)

        console.log(fullScreenContainer)

        if (fullScreenContainer) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            }
            else if (fullScreenContainer.webkitCancelFullScreen) {
                fullScreenContainer.webkitCancelFullScreen()
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
            else {
                console.log('nothing matched')
            }
        }
    }
}