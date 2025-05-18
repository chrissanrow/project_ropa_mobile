import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

type DonatedItem = {
  item_name: string;
  donations: {
    status: string;
    updated_at: string;
  } | null;
};

type SimplifiedItem = {
  status: string;
  name: string;
  time: string;
};

const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date);
  };

export async function fetchDonatedItems(): Promise<SimplifiedItem[]> {
    const { data, error } = await supabase
    .from('items')
    .select(`
      item_name,
      donations:donation_id (
        status,
        updated_at
      )
    `) as unknown as { data: DonatedItem[]; error: any };

    if (error) {
        console.error('Error fetching donations:', error);
        return [];
    }
    
    return data.map((item) => ({
        name: item.item_name || "Unamed Item",
        status: item.donations?.status || "Status Unavailable",
        time: item.donations?.updated_at || "Time Unavailable",
  }));
}

const DonationCard = ({ name, status, time }: SimplifiedItem) => {
    return (
        <TouchableOpacity className='py-6 px-6 bg-gray-200 rounded-[20px] w-[90%] mb-3'>
            <Text className='text-2xl font-semibold font-primary'>{name}</Text>
            <Text className='text-xl text-gray-500 font-text'>{status}</Text>
            <Text className='text-sm text-gray-400 font-text'>{formatTimestamp(time)}</Text>
        </TouchableOpacity>
    )
}

export default function home() {
    const [items, setItems] = useState<SimplifiedItem[]>([]);
    const isFocused = useIsFocused();

    useEffect (() => {
        fetchDonatedItems().then(setItems);
    }, [isFocused]);

    const donationCards = [];
    for (let i = 0; i < items.length; i++) {
        let cardStatus = ""
        let cardName = ""
        let cardTime = ""
        if (items[i].status === "dropped_off_at_donation_center") {
            cardStatus = "Dropped off at Donation Center"
        } else if (items[i].status === "at_processing_center") {
            cardStatus = "At Processing Center"
        } else if (items[i].status === "mobile_closet_popup") {
            cardStatus = "At Mobile Closet Popup"
        } else if (items[i].status === "fulfilled_to_a_client") {
            cardStatus = "Successfully Distributed!"
        } else {
            cardStatus = "Status Unavailable"
        }
        if (items[i].name.length == 0){
            cardName = "Unnamed Donation"
        } else {
            cardName = items[i].name
        }

        cardTime = items[i].time;

        donationCards.push(
            <DonationCard key={i} name={cardName} status={cardStatus} time={cardTime} />
        )
    }
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView className="flex-1" contentContainerStyle={{
                justifyContent: 'flex-start',
                paddingTop: 30,
            }} >
                <View className='items-center'>
                    <Image
                        source={require('../../assets/images/project-ropa-logo.png')}
                        className=" object-contain mb-5"
                    />
                </View>
                <Text className='text-4xl font-bold px-8 py-2 mb-2 font-accent'>Recent Donations</Text>
                <View className='items-center'>
                    { donationCards.length > 0 ? (
                        donationCards
                    ) : (
                        <Text>No donations yet.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}