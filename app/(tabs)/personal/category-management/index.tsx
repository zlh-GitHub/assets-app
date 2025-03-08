import { View, Text, SafeAreaView, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { useNavigation } from '@react-navigation/native';

import { Colors } from '@/constants/Colors';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';

import ListItem from './list-item';

enum HeaderRightText {
  Edit = 'Edit',
  Done = 'Done',
};

enum CategoryActions {
  Add = 'Add',
  Edit = 'Edit',
};

function HeaderRight() {
  const [headerRightText, setHeaderRightText] = useState<HeaderRightText>(HeaderRightText.Edit);
  const colorScheme = useColorScheme();
  const handleRightClick = () =>
    setHeaderRightText(prev => prev === HeaderRightText.Edit ? HeaderRightText.Done : HeaderRightText.Edit);
  return (
    <Pressable onPress={handleRightClick}>
      <Text style={{ color: Colors[colorScheme].tint, fontSize: 17 }}>{headerRightText}</Text>
    </Pressable >
  )
}

export default function App() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const navigation = useNavigation();
  const router = useRouter();
  const categoryData = new Array(30).map((_, index) => ({ id: index }))

  // 1. 为啥使用函数重载会提示标识符重复？
  // 2. 下面代码会提示需要两个参数
  // const handleAddOrEditCategory = <T extends CategoryActions>(type: T, categoryId: T extends CategoryActions.Edit ? number : undefined) => {}
  const handleAddOrEditCategory = (...args: [type: CategoryActions.Add] | [type: CategoryActions.Edit, categoryId: number]) => {
    const [type, categoryId] = args;
    router.push({
      pathname: '/personal/edit-category',
      params: {
        id: type === CategoryActions.Edit ? categoryId : undefined,
      },
    });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
      title: '',
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.categoryList}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>
              Category Management
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator}></View>
        )}
        ListFooterComponent={
          <Pressable onPress={() => handleAddOrEditCategory(CategoryActions.Add)}>
            <View>
              <Text>Add Category</Text>
            </View>
          </Pressable>
        }
        data={categoryData}
        renderItem={({ item, index }) => <ListItem data={item} />}
        keyExtractor={(_, index) => String(index)}
      />
    </SafeAreaView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'pink',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors[theme].text,
  },
  categoryList: {
    height: 500,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors[theme].text,
  }
});