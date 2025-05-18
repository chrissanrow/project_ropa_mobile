import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type DonatedItem = {
  status_from: string;
  items: {
    item_name: string;
  };
};

type SimplifiedItem = {
  status: string;
  name: string;
};

export async function fetchDonatedItems(): Promise<SimplifiedItem[]> {
    const { data, error } = await supabase
    .from('donation_journey_updates')
    .select(`
      status_from,
      items (
        item_name
      )
    `) as unknown as { data: DonatedItem[]; error: any };

    if (error) {
        console.error('Error fetching donations:', error);
        return [];
    }

    return data.map((update) => ({
        status: update.status_from,
        name: update.items!.item_name,
  }));
}

type DonationCardProps = {
    name: string;
    status: string;
};

const DonationCard = ({ name, status }: DonationCardProps) => {
    return (
        <View className='py-6 px-6 bg-gray-200 rounded-[20px] w-[90%]'>
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
        cardName = items[i].name

        donationCards.push(
            <DonationCard name={cardName} status={cardStatus} />
        )
    }
    return (
        <View className="flex-1 justify-start pt-24 items-center">
            <Text className='text-4xl font-bold py-2 items-start'>Recent Donations</Text>
            { donationCards.length > 0 ? (
                donationCards
            ) : (
                <Text>No donations yet.</Text>
            )}
        </View>
    )
}