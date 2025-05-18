import { Slot, Stack } from "expo-router";
import './globals.css';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_600SemiBold } from '@expo-google-fonts/roboto';
import { RobotoSlab_400Regular } from '@expo-google-fonts/roboto-slab';
import { View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    RobotoSlab_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1 bg-white">
      <Slot />
    </View>
  )
}
