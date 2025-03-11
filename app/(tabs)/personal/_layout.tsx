import { View, Text, Pressable } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useNavigation, Stack } from 'expo-router';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function PersonalStack() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const handleEditCategory = () => { };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'My',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="category-management"
        options={{
          title: '',
          // header: ({ navigation, route, options, back }) => {
          //   const { title } = options;
          //   return (
          //     <Header
          //       title={title}
          //       leftButton={null}
          //       rightButton={null}
          //     />
          //   );
          // }
          // https://docs.expo.dev/router/advanced/stack/#header-buttons
          // headerRight: () => {
          //   return (
          //     <Pressable onPress={handleEditCategory}>
          //       <Text style={{ color: Colors[colorScheme].tint, fontSize: 16 }}>Edit</Text>
          //     </Pressable>
          //   )
          // },
          headerBackTitle: 'My'
        }}
      />
      <Stack.Screen
        name='edit-category'
        options={{
          // https://docs.expo.dev/router/advanced/modals/
          presentation: 'modal', // 配置抽屉，iOS默认从底部弹出
          headerShown: true,
        }}
      />
    </Stack>
  );
}