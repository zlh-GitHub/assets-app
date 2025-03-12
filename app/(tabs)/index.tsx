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
  Platform
} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DropDownPicker from 'react-native-dropdown-picker';
import { MenuView, MenuComponentRef } from '@react-native-menu/menu';
import React, { useState, useRef } from 'react';
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaThemedView } from "@/components/SafeAreaThemedView";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from '@/components/ui/IconSymbol';

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
}]

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const [searchIng, setSearchIng] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // const menuRef = useRef<MenuComponentRef>(null);

  const searchInputOnChangeHandle = (nativeEvent: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log(nativeEvent.nativeEvent.text);
  }

  const handleToogleSearchIng = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSearchIng(prev => !prev);
  }

  const handletoogleSort = () => {
    setShowSort(prev => !prev);
  }

  const handleToogleFilter = () => {
    setShowFilter(prev => !prev);
  }

  return (
    <SafeAreaThemedView style={styles.container}>
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
                  clearButtonMode='while-editing' // 当编辑的时候 input 框右边显示清楚按钮
                  selectionColor="#FFF"
                  autoFocus
                />
                <Pressable onPress={handleToogleSearchIng}>
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
                    onPress={handleToogleSearchIng}
                  >
                    <IconSymbol
                      name='magnifyingglass'
                      size={22}
                      color={ICON_COLOR.get(searchIng) || 'white'}
                    />
                  </Pressable>
                  <Pressable
                    onPress={handletoogleSort}
                  >
                    <IconSymbol
                      name='arrow.up.arrow.down'
                      size={25}
                      color={ICON_COLOR.get(showSort) || 'white'}
                    />
                  </Pressable>
                  <Pressable
                    onPress={handleToogleFilter}
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
          <View>
            <Text>Total Assets</Text>
            <Text>$100,000</Text>
          </View>
          <View>
            <Text>Total Daily Cost</Text>
            <Text>$100,000</Text>
          </View>
        </View>
      </View>
      {/* <MenuView
        ref={menuRef}
        title="Menu Title"
        onPressAction={({ nativeEvent }) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: 'add',
            title: 'Add',
            titleColor: '#2367A2',
            image: Platform.select({
              ios: 'plus',
              android: 'ic_menu_add',
            }),
            imageColor: '#2367A2',
            subactions: [
              {
                id: 'nested1',
                title: 'Nested action',
                titleColor: 'rgba(250,180,100,0.5)',
                subtitle: 'State is mixed',
                image: Platform.select({
                  ios: 'heart.fill',
                  android: 'ic_menu_today',
                }),
                imageColor: 'rgba(100,200,250,0.3)',
                state: 'mixed',
              },
              {
                id: 'nestedDestructive',
                title: 'Destructive Action',
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: 'trash',
                  android: 'ic_menu_delete',
                }),
              },
            ],
          },
          {
            id: 'share',
            title: 'Share Action',
            titleColor: '#46F289',
            subtitle: 'Share action on SNS',
            image: Platform.select({
              ios: 'square.and.arrow.up',
              android: 'ic_menu_share',
            }),
            imageColor: '#46F289',
            state: 'on',
          },
          {
            id: 'destructive',
            title: 'Destructive Action',
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: 'trash',
              android: 'ic_menu_delete',
            }),
          },
        ]}
        shouldOpenOnLongPress={false}
      >
        <View>
          <Text>Test</Text>
        </View>
      </MenuView> */}
    </SafeAreaThemedView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteColor: {
    color: 'white',
  },
  header: {
    width: '100%',
    height: 180,
    backgroundColor: Colors[theme].primaryColor,
    borderRadius: 15,
    paddingHorizontal: 20,
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
  headerBottom: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  }
})
