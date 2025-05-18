import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRGeneratorScreen() {
    const [text, setText] = useState('{}');

    const generateNewCode = () => {
        const randomId = Math.random().toString(36).slice(2, 10);
        const data = {
            item_id: randomId,
            type: 'inventory',
        };
        setText(JSON.stringify(data));
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                Click to generate QR code
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

      <View style={{ marginTop: 30 }}>
        <Button title="Generate New QR Code" onPress={generateNewCode} />
      </View>

        </SafeAreaView>
    )
}