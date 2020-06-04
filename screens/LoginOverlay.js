import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

export default function LoginOverlay() {
    const [value, onChangeText] = useState('Useless Placeholder')
    const submit = () => {
        alert('Submitted ' + value)
    }
    return (
        <>
            <TextInput
                style={{
                    height: 60,
                    borderColor: 'gray',
                    borderWidth: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    padding: 12,
                    fontSize: 18,
                    position: 'absolute',
                    top: 350,
                    left: 40,
                    width: '80%'
                }}
                onChangeText={(text) => onChangeText(text)}
                value={value}
            />
            <View style={{ position: 'absolute', top: 420, left: 160 }}>
                <Text
                    onPress={submit}
                    style={{
                        color: '#fff',
                        height: 40,
                        width: 340
                    }}
                >
                    Submit
                </Text>
            </View>
        </>
    )
}
