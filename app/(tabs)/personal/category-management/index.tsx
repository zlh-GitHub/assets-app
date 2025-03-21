
import { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Animated } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaThemedView } from '@/components/SafeAreaThemedView';
import ListItem from './list-item';

import { useNavigation, useRouter } from 'expo-router';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import { useSelector } from 'react-redux';

import { HeaderRightText } from '@/constants/Category';
import { ICON } from '@/constants/Icon';
import * as CATEGORY_ACTIONS from '@/store/actions/categoryActions';
import { Colors } from '@/constants/Colors'
import { Store } from '@/store/type';

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
  const categories = useSelector((state: Store) => state.categories);
  const [isEdit, setIsEdit] = useState(false); // 管理分类是否处于编辑状态

  const handleAddCategory = () => {
    router.push({
      pathname: '/personal/edit-category',
      params: {
        type: CATEGORY_ACTIONS.ADD_CATEGORY,
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
            categories.map(item => (
              <ListItem key={item.id} data={item} isEdit={isEdit} />
            ))

          }
          <Pressable onPress={handleAddCategory}>
            <View style={styles.addCategory}>
              <IconSymbol
                name={ICON['plus.circle.fill']}
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