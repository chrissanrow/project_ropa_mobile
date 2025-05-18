import { Link } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const ProgressTest = () => {
  return (
    <View className="pt-48 pl-10 pr-10 flex-1">
      <Text>ProgressTest</Text>
      <Link href = "../progress/meow" asChild>
        <TouchableOpacity>
            <Text>Go to Progress Details</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default ProgressTest