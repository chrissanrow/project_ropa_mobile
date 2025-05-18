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
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          href: null
        }}
      />
      <Tabs.Screen name="progress-test" options={{ title: "Progress Test", headerShown: false, href: isAdmin ? '/progress-test' : null }} />
      <Tabs.Screen name="admin_scan" options={{ title: "Scan", headerShown: false, href: isAdmin ? '/admin_scan' : null }} />
      <Tabs.Screen name="qr_gen" options={{ title: "Create QR", headerShown: false, href: isAdmin ? '/qr_gen' : null }} />
      <Tabs.Screen name="admin_profile" options={{ title: "Admin Profile", headerShown: false, href: isAdmin ? '/admin_profile' : null }} />
      <Tabs.Screen name="home" options={{ title: "Home", headerShown: false, href: !isAdmin ? '/home' : null }} />
      <Tabs.Screen name="donor_scan" options={{ title: "Scan", headerShown: false, href: !isAdmin ? '/donor_scan' : null }} />
      <Tabs.Screen name="donor_profile" options={{ title: "Donor Profile", headerShown: false, href: !isAdmin ? '/donor_profile' : null }} />
    </Tabs>
  )
}

export default _layout