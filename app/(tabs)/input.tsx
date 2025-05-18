import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';


export default function InputScreen() {
    const { scannedData } = useLocalSearchParams<{ scannedData: string }>();
    const router = useRouter();
  
    const [name, setName] = useState('');
    const [progressData, setProgressData] = useState<string | null>(null);
    const [session, setSession] = useState(null);

    const handleAddItem = async (newItem: string) => {
        const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.replace("/login"); // Redirect if not logged in
        return;
      } 
        const { data, error } = await supabase
            .from('items')
            .insert([
                { 
                    item_name: newItem,
                    qr_code_identifier: scannedData,
                    user_id: session.user.id,
                },
            ]);

        setProgressData(newItem);
        
        if (error) {
            console.error('Error adding item', error);
        }
    }
  
    const handleSubmit = () => {
      console.log('Scanned:', scannedData);
      console.log('Name:', name);
      handleAddItem(name);
      router.replace('/donor_scan');
    };

    return (
        <View>
            <Text>Give your item a name</Text>
            <TextInput placeholder="Add a name" value={name} onChangeText={setName}/>
            <Button title="Submit" onPress={handleSubmit}/>
        </View>
    )
}