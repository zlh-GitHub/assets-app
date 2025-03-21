import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";

import { SafeAreaThemedView } from "@/components/SafeAreaThemedView";
import HeaderTextButton from "@/components/HeaderTextButton";

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";

import { Colors } from "@/constants/Colors";
import * as CATEGORY_ACTIONS from '@/store/actions/categoryActions';
export default function EditCategory() {
  const { type, data } = useLocalSearchParams();
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
      headerRight: () => <HeaderTextButton text="Save" onClick={onSaveHandle} />,
      headerLeft: () => <HeaderTextButton text="Cancel" onClick={onCancelHandle} />,
    })
  }, [navigation, onSaveHandle, onCancelHandle])
  
  return (
    <SafeAreaThemedView style={styles.container}>
      <Text style={[styles.textColor, styles.title]}>{type === CATEGORY_ACTIONS.ADD_CATEGORY ? "Add Category" : "Edit Category"}</Text>
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