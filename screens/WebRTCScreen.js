import React, { useEffect, useState } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc'

export default function WebRTCScreen() {
    const [stream, setStream] = useState(null)
    useEffect(() => {
        const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] }
        const pc = new RTCPeerConnection(configuration)

        let isFront = true
        mediaDevices.enumerateDevices().then((sourceInfos) => {
            console.log(sourceInfos)
            let videoSourceId
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i]
                if (
                    sourceInfo.kind == 'videoinput' &&
                    sourceInfo.facing == (isFront ? 'front' : 'environment')
                ) {
                    videoSourceId = sourceInfo.deviceId
                }
            }
            mediaDevices
                .getUserMedia({
                    audio: true,
                    video: {
                        mandatory: {
                            minWidth: 500, // Provide your own width, height and frame rate here
                            minHeight: 300,
                            minFrameRate: 30
                        },
                        facingMode: isFront ? 'user' : 'environment',
                        optional: videoSourceId ? [{ sourceId: videoSourceId }] : []
                    }
                })
                .then((stream) => {
                    // Got stream!

                    setStream(stream)
                })
                .catch((error) => {
                    // Log error
                    console.log('error:', error)
                })
        })

        pc.createOffer().then((desc) => {
            pc.setLocalDescription(desc).then(() => {
                // Send pc.localDescription to peer
            })
        })

        pc.onicecandidate = function (event) {
            // send event.candidate to peer
        }

        // also support setRemoteDescription, createAnswer, addIceCandidate, onnegotiationneeded, oniceconnectionstatechange, onsignalingstatechange, onaddstream
    }, [])

    console.log('stream:', stream)

    return (
        <View style={styles.welcomeContainer}>
            {stream ? (
                <RTCView
                    streamURL={stream.toURL()}
                    style={{
                        flex: 1,
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'black',
                        zIndex: 4000
                    }}
                />
            ) : (
                <Text>Waiting for stream</Text>
            )}
        </View>
    )
}

WebRTCScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%'
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center'
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        // position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)'
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center'
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center'
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center'
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7'
    }
})
