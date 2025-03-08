import React from 'react';
import { View, Text } from "react-native";

type Props = {
  title?: string
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode
}

export default function Header({ title = '' }: Props) {
  return (
    <View>
      <Text>{ title }</Text>
    </View>
  )
}