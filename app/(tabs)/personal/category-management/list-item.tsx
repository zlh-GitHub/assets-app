import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";

type Props = {
  data: { id: number }
}

export default function ListItem(props: Props) {
  const { data } = props;
  const colorScheme = useColorScheme();
  // 统一管理样式
  const styles = createStyles(colorScheme);
  return (
    <View style={styles.item}>
      <Text style={styles.name}>ListItem - { JSON.stringify(data) }</Text>
    </View>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  item: {
    height: 50,
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: Colors[theme].text
  }
})