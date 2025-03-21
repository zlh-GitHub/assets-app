import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  Pressable,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
// import { MenuView, MenuComponentRef } from '@react-native-menu/menu';
import React, { useState, useRef } from 'react';
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaThemedView } from "@/components/SafeAreaThemedView";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import AssetItem from '@/components/AssetItem';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { Store } from '@/store/type';

const { width } = Dimensions.get('window');

const ICON_COLOR: Map<boolean, string> = new Map([
  [true, "#ffffff4d"],
  [false, "white"],
]);

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FILTER_TYPE = [{
  label: 'All',
  value: 'All',
}, {
  label: 'Active',
  value: 'Active',
}, {
  label: 'Retired',
  value: 'Retired',
}, {
  label: 'Favorite',
  value: 'Favorite',
}];


export default function HomeScreen() {
  const assets = useSelector((state: Store) => state.assets);
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const [searchIng, setSearchIng] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const bottom = useBottomTabOverflow();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // const menuRef = useRef<MenuComponentRef>(null);

  const searchInputOnChangeHandle = (nativeEvent: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log(nativeEvent.nativeEvent.text);
  }

  const handleToggleSearchIng = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSearchIng(prev => !prev);
  }

  const handleToggleSort = () => {
    setShowSort(prev => !prev);
  }

  const handleToggleFilter = () => {
    setShowFilter(prev => !prev);
  }

  return (
    <SafeAreaThemedView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.View style={styles.headerTop}>
            {
              searchIng ? (
                <>
                  <IconSymbol
                    name='magnifyingglass'
                    size={22}
                    color='white'
                  />
                  <TextInput
                    placeholder='Search Assets'
                    style={styles.searchInput}
                    inputMode='search'
                    placeholderTextColor='#ffffff4d'
                    textAlign='left'
                    onChange={searchInputOnChangeHandle}
                    clearButtonMode='while-editing' // 当编辑的时候 input 框右边显示清除按钮
                    selectionColor="#FFF"
                    autoFocus
                  />
                  <Pressable onPress={handleToggleSearchIng}>
                    <Text style={[styles.whiteColor, { fontSize: 18 }]}>Cancel</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <View style={styles.headerTitle}>
                    <Text style={[styles.whiteColor, { fontSize: 22, fontWeight: 'bold' }]}>My Assets</Text>
                    <Text style={[styles.whiteColor, { fontSize: 18 }]}>5/2</Text>
                  </View>
                  <View style={styles.actions}>
                    <Pressable
                      onPress={handleToggleSearchIng}
                    >
                      <IconSymbol
                        name='magnifyingglass'
                        size={22}
                        color={ICON_COLOR.get(searchIng) || 'white'}
                      />
                    </Pressable>
                    <Pressable
                      onPress={handleToggleSort}
                    >
                      <IconSymbol
                        name='arrow.up.arrow.down'
                        size={25}
                        color={ICON_COLOR.get(showSort) || 'white'}
                      />
                    </Pressable>
                    <Pressable
                      onPress={handleToggleFilter}
                    >
                      <View style={styles.filterIcon}>
                        <Text style={{ fontSize: 18, color: ICON_COLOR.get(showFilter) || 'white' }}>All</Text>
                        <IconSymbol
                          name='chevron.down'
                          size={20}
                          color={ICON_COLOR.get(showFilter) || 'white'}
                        />
                      </View>
                    </Pressable>
                  </View>
                </>
              )
            }
          </Animated.View>
          <View style={styles.headerBottom}>
            <View style={[styles.headerBottomItem, { paddingRight: 20 }]}>
              <Text style={styles.headerBottomItemTitle}>Total Assets</Text>
              {/* adjustsFontSizeToFit 是 iOS 的属性，在宽度不够的时候可以自动缩小字体的大小，Android 需要使用 numberOfLines 和 ellipsizeMode */}
              <Text adjustsFontSizeToFit={true} numberOfLines={1} ellipsizeMode='tail' style={styles.headerBottomItemValue}>$100,000</Text>
            </View>
            <View style={styles.headerBottomItemSeparator} />
            <View style={[styles.headerBottomItem, { paddingLeft: 20 }]}>
              <Text style={styles.headerBottomItemTitle}>Total Daily Cost</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.headerBottomItemValue}>$100,000</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.assetList}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ bottom, top: 0, right: 0 }} // 设置滚动条的偏移量，防止底部被TabBar遮挡
          contentContainerStyle={{ paddingBottom: bottom }} // 底部留白，防止底部内容被TabBar遮挡
        >
          {
            assets.map((item) => (
              <AssetItem key={item.id} data={item} />
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaThemedView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  whiteColor: {
    color: 'white',
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: Colors[theme].primaryColor,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerTop: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  filterIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  headerBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBottomItem: {
    width: '50%',
    boxSizing: 'border-box',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBottomItemTitle: {
    height: 20,
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
    marginBottom: 10,
  },
  headerBottomItemValue: {
    height: 30,
    fontSize: 24,
    lineHeight: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  headerBottomItemSeparator: {
    width: StyleSheet.hairlineWidth,
    height: '80%',
    backgroundColor: '#9BA1A6',
  },
  assetList: {
    flex: 1,
  },
})
