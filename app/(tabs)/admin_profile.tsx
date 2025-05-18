import { supabase } from "@/lib/supabase";
import React from "react";
import { Button, Text, View } from "react-native";

const profile = () => {
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
      <Text>profile</Text>
      <Button title="Logout" onPress={handleLogout}></Button>
    </View>
  );
};

export default profile;
