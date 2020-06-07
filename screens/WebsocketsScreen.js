import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

export default function WebsocketsScreen() {
    useEffect(() => {
        var ws = new WebSocket('ws://192.168.1.132:8080/ws')
        // var ws = new WebSocket('ws://localhost:8080/ws') // works on emulator

        ws.onopen = () => {
            // connection opened
            console.log('Connection opened')
            ws.send('something') // send a message
        }

        ws.onmessage = (e) => {
            // a message was received
            console.log(e.data)
        }

        ws.onerror = (e) => {
            // an error occurred
            console.log(e.message)
        }

        ws.onclose = (e) => {
            // connection closed
            console.log('Connection closed')
            console.log(e.code, e.reason)
        }
    }, [])

    return (
        <View style={{ flex: 1, padding: 50 }}>
            <Text>Lets try websockets</Text>
        </View>
    )
}
