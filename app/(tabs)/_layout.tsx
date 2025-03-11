import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].primaryColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
      // initialRouteName='/(tabs)/home/index'
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Assets',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: 'My',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
