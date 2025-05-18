import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export default function InputScreen() {
    const { scannedData } = useLocalSearchParams();
    const router = useRouter();
  
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
  
    const handleSubmit = () => {
      console.log('Scanned:', scannedData);
      console.log('Name:', name);
      router.back();
    };

    return (
        <View>
            <Text>Give your item a name</Text>
            <TextInput placeholder="Add a name"/>
        </View>
    )
}