import { View, Text, Pressable, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState, useCallback, useRef } from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';

import { HeaderRightText, CategoryActions } from '@/constants/Category';
import { ICON_MAPPING, ICONS } from '@/constants/Icon';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ListItem from './list-item';
import { SafeAreaThemedView } from '@/components/SafeAreaThemedView';

interface IEditCategory {
  (...args: [type: CategoryActions.Add] | [type: CategoryActions.Edit, categoryId: number]): void
}

interface IHeaderRightClick {
  (status: HeaderRightText): void
}

function HeaderRight({ onClick }: { onClick: IHeaderRightClick }) {
  const [headerRightText, setHeaderRightText] = useState<HeaderRightText>(HeaderRightText.Edit);
  const colorScheme = useColorScheme();
  const handleRightClick = () => 
    setHeaderRightText(prev => {
      const newVal = prev === HeaderRightText.Edit ? HeaderRightText.Done : HeaderRightText.Edit;
      onClick(newVal);
      return newVal;
    });
  return (
    <Pressable onPress={handleRightClick}>
      <Text style={{ color: Colors[colorScheme].primaryColor, fontSize: 17 }}>{headerRightText}</Text>
    </Pressable >
  )
}

export default function App() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const navigation = useNavigation();
  const router = useRouter();
  const bottom = useBottomTabOverflow();
  const [isEdit, setIsEdit] = useState(false); // 管理分类是否处于编辑状态
  const categoryData = new Array(6).fill(1).map((_, index) => ({ id: index, icon: ICONS[index], name: `category-${index}` }));

  // 1. 为啥使用函数重载会提示标识符重复？
  // 2. 下面代码会提示需要两个参数
  // const handleAddOrEditCategory = <T extends CategoryActions>(type: T, categoryId: T extends CategoryActions.Edit ? number : undefined) => {}
  const handleAddOrEditCategory: IEditCategory = (...args) => {
    const [type, categoryId] = args;
    router.push({
      pathname: '/personal/edit-category',
      params: {
        id: type === CategoryActions.Edit ? categoryId : undefined,
      },
    });
  }

  const handleManagementCategory: IHeaderRightClick = (status) => {
    if (status === HeaderRightText.Edit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight onClick={handleManagementCategory} />,
      title: '',
    });
  }, [navigation]);

  return (
    <SafeAreaThemedView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollContainer}
        scrollIndicatorInsets={{ bottom, top: 0, right: 0 }} // 设置滚动条的偏移量，防止底部被TabBar遮挡
        contentContainerStyle={{ paddingBottom: bottom + 15 }} // 底部留白，防止底部内容被TabBar遮挡
      >
        <Text style={[styles.title, styles.textColor]}>
          Category Management
        </Text>
        <View style={styles.categoryList}>
          {
            categoryData.map(item => (
              <ListItem key={item.id} data={item} isEdit={isEdit} />
            ))

          }
          <Pressable onPress={() => handleAddOrEditCategory(CategoryActions.Add)}>
            <View style={styles.addCategory}>
              <IconSymbol
                name='plus.circle.fill'
                color={Colors[colorScheme].primaryColor}
                size={26}
              />
              <Text style={styles.addCategoryText}>Add Category</Text>
            </View>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </SafeAreaThemedView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  textColor: {
    color: Colors[theme].text,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryList: {
    backgroundColor: Colors[theme].categoryListBackground,
    borderRadius: 10,
  },
  addCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 70,
  },
  addCategoryText: {
    color: Colors[theme].primaryColor,
    fontSize: 17,
    marginLeft: 10,
  }
});