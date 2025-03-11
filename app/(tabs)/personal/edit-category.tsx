import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { SafeAreaThemedView } from "@/components/SafeAreaThemedView";
import { useEffect, useCallback } from "react";
import HeaderRight from "@/components/HeaderLeftOrRight";

export default function EditCategory() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const onSaveHandle = useCallback(() => {}, []);
  const onCancelHandle = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerRight: () => <HeaderRight text="Save" onClick={onSaveHandle} />,
      headerLeft: () => <HeaderRight text="Cancel" onClick={onCancelHandle} />,
    })
  }, [navigation, onSaveHandle, onCancelHandle])
  
  return (
    <SafeAreaThemedView style={styles.container}>
      <Text style={[styles.textColor, styles.title]}>{id ? "Edit Category" : "Add Category"}</Text>
    </SafeAreaThemedView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  textColor: {
    color: Colors[theme].text
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  }
})