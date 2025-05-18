import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useCallback, useState } from 'react';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';

export default function scanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');

  type Barcode = {
    data: string;
    type: string;
  };
  
  type BarcodeScannedEvent = {
    barcodes: Barcode[];
  };

  {/* TENTATIVEEEEE toggle camera, need to connect this with scanning an item */}
  const handleToggleCamera = () => {
    setCameraActive(prev => !prev);
    setScanned(false);
    setScannedData(null);
  };

  const handleBarcodeScanned = useCallback(
    (scanningResult: BarcodeScanningResult) => {
      if (scanned) {
        return;
      }

      const { data } = scanningResult;
      setScanned(true);
      setScannedData(data);

      Alert.alert('Scanned', `QR Data: ${data}`, [
        {
          text: 'Ok',
          onPress: () => {
            setScanned(false)
          },
        },
      ]);
    }, []
  );

  if (!permission) {
    return ( 
      <SafeAreaView>
        <Text>Requesting camera permissions...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <View>
        <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {cameraActive && (
          <CameraView
              style={{ flex: 1}}
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
          />
        )}

        <View style={{ padding: 16 }}>
          <Button
              title={cameraActive ? 'Stop Camera' : 'Start Camera'}
              onPress={handleToggleCamera}
          />
          {scannedData && (
            <Text style={{ marginTop: 10, textAlign: 'center' }}>
              Last scanned: {scannedData}
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
}