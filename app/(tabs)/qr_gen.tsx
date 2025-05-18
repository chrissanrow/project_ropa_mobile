import React, { useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRGeneratorScreen() {
    const [qrCodeData, setQRCodeData] = useState(() => generateNewCode());

    function generateNewCode() {
        const randomId = Math.random().toString(36).slice(2, 10);
        return randomId;
    }

    const handleGenerateNewCode = () => {
      const newCode = generateNewCode();
      setQRCodeData(newCode);
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode
        value={qrCodeData}
        size={200}
        backgroundColor="white"
      />

      <View style={{ marginTop: 30 }}>
        <Button title="Generate New QR Code" onPress={handleGenerateNewCode} />
      </View>

        </SafeAreaView>
    )
}