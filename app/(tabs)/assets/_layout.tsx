import { View, Text, Pressable } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useNavigation, Stack } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function PersonalStack() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name="index"
        options={{
          title: 'Assets',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-product"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}