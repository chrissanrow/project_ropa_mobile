import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRGeneratorScreen() {
    const [text, setText] = useState('placeholder-item');

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                Enter text to generate QR code
            </Text>
            <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          width: '80%',
          marginBottom: 20,
        }}
        value={text}
        onChangeText={setText}
        placeholder="Type here..."
      />

      <QRCode
        value={text}
        size={200}
        backgroundColor="white"
      />
        </SafeAreaView>
    )
}