import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
  
const ProgressDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [progressData, setProgressData] = useState<string | null>(null);

    const fetchDonationDetails = async () => {
        const {data, error} = await supabase
            .from('donations')
            .select('status')
            .eq('qr_code_identifier', id);

        if( error || !data) {
            console.error('Error fetching donation progress details:', error);
            return;
        }
        console.log(data);
        setProgressData(data[0].status);
    }

    const handleChangeProgress = async (newStatus: string) => {
        const { error } = await supabase
            .from('donations')
            .update({ status: newStatus })
            .eq('qr_code_identifier', id);

        setProgressData(newStatus);
        
        if (error) {
            console.error('Error updating donation progress:', error);
        }
    }
    
    useEffect(() => {
        console.log(id);
        fetchDonationDetails();
    }, []);

    return (
    <View className="pt-48 pl-10 pr-10 flex-1">
        <TouchableOpacity className={`${progressData === "dropped_off_at_donation_center" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`} onPress={() => handleChangeProgress("dropped_off_at_donation_center")}>
            <Text>Dropped off at donation center</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${progressData === "at_processing_center" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`} onPress={() => handleChangeProgress("at_processing_center")}>
            <Text>At Processing Center</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${progressData === "mobile_closet_popup" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`} onPress={() => handleChangeProgress("mobile_closet_popup")}>
            <Text>At Mobile Closet</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${progressData === "fulfilled_to_a_client" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`} onPress={() => handleChangeProgress("fulfilled_to_a_client")}>
            <Text>Distributed!</Text>
        </TouchableOpacity>
    </View>
    )
}

export default ProgressDetails