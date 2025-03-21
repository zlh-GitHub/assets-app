import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { ICON } from '@/constants/Icon';
// docs：https://docs.expo.dev/router/advanced/tabs/
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
        animation: 'none',
      }}
      // initialRouteName='assets'
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Assets',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={ICON['creditcard.fill']} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="assets"
        options={{
          title: 'Assets',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={ICON['creditcard.fill']} color={color} />,
          // href: null,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={ICON['plus.circle.fill']} color={color} />,
          // href: null, // 隐藏实际路由
          // tabBarButton: (props) => (
          //   <HapticTab
          //     {...props}
          //     onPress={(e) => {
          //       e.preventDefault();
          //       router.push('/(tabs)/assets/add-product', {
          //         relativeToDirectory: false,
          //       }); // 跳转到指定路由
          //     }}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: 'My',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={ICON['person.fill']} color={color} />,
        }}
      />
    </Tabs>
  );
}
