import { useIsFocused } from '@react-navigation/native';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, SafeAreaView, Text, View } from 'react-native';

export default function adminScan() {
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

  const scannedRef = useRef(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setCameraActive(false);
      scannedRef.current = false;
      setScannedData(null);
    }
  }, [isFocused]);

  const handleToggleCamera = () => {
    setCameraActive(prev => !prev);
    scannedRef.current = false;
    setScannedData(null);
  };

  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
      if (scannedRef.current) return;

      scannedRef.current = true;

      const { data } = scanningResult;
      setScannedData(data);

      Alert.alert('Scanned', `QR Data: ${data}`, [
        {
          text: 'Ok',
          onPress: () => {
            setTimeout(() => scannedRef.current = false);
        },
        },
      ]);
    };

  if (!permission) {
    return ( 
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: "center"}}>Requesting camera permissions...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: "center", marginBottom: 20  }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {cameraActive && isFocused && (
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
            <View>
            <Text style={{ marginTop: 10, textAlign: 'center' }}>
              Last scanned: {scannedData}
            </Text>
              </View>
          )}
        </View>
      </SafeAreaView>
    );
}