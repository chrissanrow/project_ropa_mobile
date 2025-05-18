import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const _layout = () => {

  const getUserId = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
    } else {
      console.log('User:', user?.id);
    }

    return user?.id;
  };

  useEffect(() => {
    // Fetch user role when the component mounts
    getUserId();
  }, []);

  return (
    <Tabs>
        <Tabs.Screen
            name="home"
            options={{
            title: 'Home',
            headerShown: false,
            }}
        />
        <Tabs.Screen
            name="admin_scan"
            options={{
            title: 'Scan',
            headerShown: false,
            }}
        />
        <Tabs.Screen
            name="donor_profile"
            options={{
            title: 'Profile',
            headerShown: false,
            }}
        />
        <Tabs.Screen
            name="admin_profile"
            options={{
            title: 'Profile',
            headerShown: false,
            }}
        />
    </Tabs>
  )
}

export default _layout