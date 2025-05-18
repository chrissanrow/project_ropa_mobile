import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context';

type DonatedItem = {
  item_name: string;
  donations: {
    status: string;
  } | null;
};

type SimplifiedItem = {
  status: string;
  name: string;
};

export async function fetchDonatedItems(): Promise<SimplifiedItem[]> {
    const { data, error } = await supabase
    .from('items')
    .select(`
      item_name,
      donations:donation_id (
        status
      )
    `) as unknown as { data: DonatedItem[]; error: any };

    if (error) {
        console.error('Error fetching donations:', error);
        return [];
    }

    console.log("Raw data from Supabase:", data);

    return data.map((item) => ({
        name: item.item_name || "Unamed Item",
        status: item.donations?.status || "Status Unavailable",
  }));
}

const DonationCard = ({ name, status }: SimplifiedItem) => {
    return (
        <View className='py-6 px-6 bg-gray-200 rounded-[20px] w-[90%] mb-3'>
            <Text className='text-2xl font-semibold'>{name}</Text>
            <Text className='text-xl text-gray-500'>{status}</Text>
        </View>
    )
}

export default function home() {
    const [items, setItems] = useState<SimplifiedItem[]>([]);
    
    useEffect (() => {
        fetchDonatedItems().then(setItems);
    }, []);

    const donationCards = [];
    for (let i = 0; i < items.length; i++) {
        let cardStatus = ""
        let cardName = ""
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

        donationCards.push(
            <DonationCard key={i} name={cardName} status={cardStatus} />
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
                <Text className='text-4xl font-bold px-8 py-2 mb-2'>Recent Donations</Text>
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