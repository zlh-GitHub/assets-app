import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function EditCategory() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Edit CategoryId Is {id}</Text>
    </View>
  )
}