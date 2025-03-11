import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { SafeAreaThemedView } from "@/components/SafeAreaThemedView";
export default function App() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <SafeAreaThemedView style={styles.container}>
      <Link href="/personal/category-management">
        <View>
          <Text style={styles.text}>Category Management</Text>
        </View>
      </Link>
    </SafeAreaThemedView>
  );
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: Colors[theme].text,
  }
});
