import { supabase } from '@/lib/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


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
        <View className="pt-48 pl-10 pr-10 flex-1">
            <Text className='text-2xl font-bold mb-2 font-primary'>Give your item a name!</Text>
            <TextInput className="p-5 text-2xl text-textprimary bg-gray-200 rounded-[20px] mb-5" placeholder="Name" placeholderTextColor="#000000" value={name} onChangeText={setName}/>
            <TouchableOpacity className="bg-lightsecondary-100 rounded-[20px] p-4 justify-content items-center" onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}