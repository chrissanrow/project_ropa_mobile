import { supabase } from "@/lib/supabase";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const donorProfile = () => {

  async function handleLogout() {
    try {
      await supabase.auth.refreshSession();
      const { error } = await supabase.auth.signOut();

      await supabase.auth.refreshSession();
      if (error) throw error;
      // message = 'Logged out successfully.'; // Store will update UI
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-2 font-text">
        Items that you donated: 12.
      </Text>
      <Text className="text-2xl mb-2 font-text">
        Items in progress: 5.
      </Text>
      <Text className="text-2xl mb-2 font-text">
        Items delivered: 7.
      </Text>
      <Text className="text-2xl mb-2 font-text">
        Pounds of clothing saved: 20.
      </Text>
      <TouchableOpacity className="bg-lightsecondary-100 rounded-[10px] px-40 p-4 justify-content items-center" onPress={handleLogout}>
          <Text className="text-2xl font-bold mb-2 font-primary">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default donorProfile;
