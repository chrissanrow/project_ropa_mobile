import { supabase } from '@/lib/supabase';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
  
const DonationDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [progressData, setProgressData] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<string | null>(null);

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
        
        if (progressData === "dropped_off_at_donation_center") {
          setCurrentStep("Dropped off at Donation Center");
      } else if (progressData === "at_processing_center") {
          setCurrentStep("At Processing Center");
      } else if (progressData === "mobile_closet_popup") {
          setCurrentStep("At Mobile Closet Popup");
      } else if (progressData === "fulfilled_to_a_client") {
          setCurrentStep("Successfully Distributed!");
      }
    }

    const fetchDetailTime = async () => {
        const {data, error} = await supabase
            .from('donations')
            .select('updated_at')
            .eq('qr_code_identifier', id);

        if( error || !data) {
            console.error('Error fetching donation progress details:', error);
            return;
        }
        console.log(data);
        setTime(data[0].updated_at);
    }

    useEffect(() => {
        console.log(id);
        fetchDonationDetails();
    }, []);

    return (
      <View className="pt-48 pl-10 pr-10 flex-1">
        <Link href={`../(tabs)/home`} asChild>
          <TouchableOpacity className="pt-48 pl-10 pr-10 flex-1">
              <View className="bg-gray-200 p-5 text-9xl text-textprimary rounded-[20px] mb-5">
                  <Text>{currentStep}</Text>
              </View>
          </TouchableOpacity>
        </Link>
          <View className= "bg-gray-200 p-5 text-9xl text-textprimary rounded-[20px] mb-5">
              <Text>Dropped off at donation center</Text>
              <Text>Last Updated: {time}</Text>
          </View>
          <View className={`${progressData === "at_processing_center" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`}>
              <Text>At Processing Center</Text>
          </View>
          <View className={`${progressData === "mobile_closet_popup" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`}>
              <Text>At Mobile Closet</Text>
          </View>
          <View className={`${progressData === "fulfilled_to_a_client" ? "bg-lightprimary-100" : "bg-gray-200"} p-5 text-9xl text-textprimary rounded-[20px] mb-5`}>
              <Text>Distributed!</Text>
          </View>
      </View>
    )
}

export default DonationDetails