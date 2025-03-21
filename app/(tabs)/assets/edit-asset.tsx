import { useReducer, useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Switch,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import { SafeAreaThemedView } from '@/components/SafeAreaThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import HeaderTextButton from '@/components/HeaderTextButton';

import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import useLatest from '@/hooks/useLatest';

import { Colors } from '@/constants/Colors';
import { ICON } from '@/constants/Icon';
import * as ASSETS_ACTIONS from '@/store/actions/assetsActions';

import { AssetItemData } from '@/store/type';

const ACTIONS = {
  SET_ICON: 'setIcon',
  SET_CATEGORY: 'setCategory',
  SET_WARRANTY_DATE: 'setWarrantyDate',
  SET_USAGE_COUNT: 'setUsageCount',
  SET_DAILY_PRICE: 'setDailyPrice',
  SET_IN_SERVICE: 'setInService',
  SET_NAME: 'setName',
  SET_PRICE: 'setPrice',
  SET_NOTE: 'setNote',
}

const reducer = (state: AssetItemData, action: { type: string, payload: any }) => {
  switch (action.type) {
    case ACTIONS.SET_ICON:
      return { ...state, icon: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, category: action.payload };
    case ACTIONS.SET_WARRANTY_DATE:
      return { ...state, warrantyDate: action.payload };
    case ACTIONS.SET_USAGE_COUNT:
      return { ...state, usageCount: action.payload };
    case ACTIONS.SET_DAILY_PRICE:
      return { ...state, dailyPrice: action.payload };
    case ACTIONS.SET_IN_SERVICE:
      return { ...state, inService: action.payload };
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };
    case ACTIONS.SET_PRICE:
      return { ...state, price: action.payload };
    case ACTIONS.SET_NOTE:
      return { ...state, note: action.payload };
    default:
      return state;
  }
};

export default function AddProduct() {
  const navigation = useNavigation();
  const router = useRouter();
  const { data: paramsData, type } = useLocalSearchParams();
  const data = paramsData ? JSON.parse(paramsData as string) : {};
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const [formData, dispatch] = useReducer(reducer, data);
  const [setWarrantyDate, toggleSetWarrantyDate] = useState<boolean>(!!formData.warrantyDate);
  const [setDailyPrice, toggleSetDailyPrice] = useState<boolean>(!!formData.dailyPrice);
  const [setUsageCount, toggleSetUsageCount] = useState<boolean>(!!formData.usageCount);

  const handleSelectIcon = () => {
    console.log('select icon');
  }

  const handleSetCategory = () => {
    console.log('set category');
  }

  const handleSetWarrantyDate = () => {
    console.log('set warranty date');
  }

  const handleSetUsageCount = () => {
    console.log('set usage count');
  }

  const handleSetDailyPrice = () => {
    console.log('set daily price');
  }

  const handleSetInService = (value: boolean) => {
    dispatch({ type: ACTIONS.SET_IN_SERVICE, payload: value });
  }

  const onChangeNameHandler = (text: string) => {
    dispatch({ type: ACTIONS.SET_NAME, payload: text });
  }

  const onChangeNoteHandler = (text: string) => {
    dispatch({ type: ACTIONS.SET_NOTE, payload: text });
  }

  const onChangePurchasePriceHandler = (text: string) => {
    dispatch({ type: ACTIONS.SET_PRICE, payload: text });
  }

  const onChangeDailyPriceHandler = (text: string) => {
    dispatch({ type: ACTIONS.SET_DAILY_PRICE, payload: text });
  }

  const handleSave = useLatest<Function>(() => {
    console.log('save');
  });

  const handleCancel = useLatest<Function>(() => {
    router.back();
  });

  useEffect(() => {
    if (type === ASSETS_ACTIONS.UPDATE_ASSET) {
      navigation.setOptions({
        title: '',
        headerShown: true,
        headerTransparent: true,
        headerRight: () => <HeaderTextButton text="Save" onClick={() => handleSave.current()} />,
        headerLeft: () => <HeaderTextButton text="Cancel" onClick={() => handleCancel.current()} />,
      });
    }
  }, [type]);

  return (
    <SafeAreaThemedView style={{ flex: 1, backgroundColor: Colors[colorScheme].modalBackground }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingTop: 30,
            paddingBottom: 10,
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={handleSelectIcon}>
            <View style={styles.selectIcon}>
              <Text style={styles.selectIconText}>Select Icon</Text>
            </View>
          </Pressable>
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Select Category</Text>
            <View style={styles.formItemValue}>
              <Text style={styles.formItemValueText}>Uncategorized</Text>
            </View>
          </View>
          <View style={styles.subForm}>
            <TextInput
              style={[styles.subFormItem, styles.subFormItemInput]}
              value={formData.name}
              onChangeText={onChangeNameHandler}
              placeholder="Asset Name"
              placeholderTextColor={Colors[colorScheme].placeholderTextColor}
            />
            <View style={styles.divider} />
            <TextInput
              style={[styles.subFormItem, styles.subFormItemInput]}
              value={formData.purchasePrice}
              onChangeText={onChangePurchasePriceHandler}
              keyboardType="numeric"
              placeholder="Price"
              placeholderTextColor={Colors[colorScheme].placeholderTextColor}
            />
            <View style={styles.divider} />
            <View style={[styles.subFormItem]}>
              <Text style={styles.formItemTitle}>Purchase Date</Text>
              <View style={styles.formItemValue}>
                <Switch />
              </View>
            </View>
          </View>
          <View style={styles.subForm}>
            <View style={styles.subFormItem}>
              <Text style={styles.formItemTitle}>Set Warranty Date</Text>
              <View style={styles.formItemValue}>
                <Switch value={setWarrantyDate} onValueChange={toggleSetWarrantyDate} />
              </View>
            </View>
            {
              setWarrantyDate ? (
                <View style={styles.subFormItem}>
                  <Text style={styles.formItemTitle}>Warranty End Date</Text>
                  <View style={styles.formItemValue}>
                    <Switch />
                  </View>
                </View>) : null
            }
          </View>
          <View style={styles.subForm}>
            <View style={styles.subFormItem}>
              <Text style={styles.formItemTitle}>Calculate by Usage Count</Text>
              <View style={styles.formItemValue}>
                <Switch value={setUsageCount} onValueChange={toggleSetUsageCount} />
              </View>
            </View>
            {
              setUsageCount ? (
                <View style={styles.subFormItem}>
                  <Text style={styles.formItemTitle}>Estimated Usage Count</Text>
                  <View style={styles.formItemValue}>
                    <Pressable>
                      <IconSymbol name={ICON['minus.circle.fill']} size={28} color="gray" />
                    </Pressable>
                    <Text style={styles.formItemValueText}>100</Text>
                    <Pressable>
                      <IconSymbol name={ICON['plus.circle.fill']} size={28} color={Colors[colorScheme].primaryColor} />
                    </Pressable>
                  </View>
                </View>
              ) : null
            }
          </View>
          <View style={styles.subForm}>
            <View style={styles.subFormItem}>
              <Text style={styles.formItemTitle}>Specified Daily Price</Text>
              <View style={styles.formItemValue}>
                <Switch value={setDailyPrice} onValueChange={toggleSetDailyPrice} />
              </View>
            </View>
            {
              setDailyPrice ? (
                <View style={styles.subFormItem}>
                  <TextInput
                    style={styles.subFormItemInput}
                    value={formData.dailyPrice}
                    onChangeText={onChangeDailyPriceHandler}
                    keyboardType="numeric"
                    placeholder="Daily Price"
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                  />
                </View>) : null
            }
          </View>
          <View style={styles.subForm}>
            <View style={styles.subFormItem}>
              <Text style={styles.formItemTitle}>In Service</Text>
              <View style={styles.formItemValue}>
                <Switch value={formData.inService} onValueChange={handleSetInService} />
              </View>
            </View>
            {
              !formData.inService ? (
                <View style={styles.subFormItem}>
                  <Text style={styles.formItemTitle}>Retired Date</Text>
                  <View style={styles.formItemValue}>
                    <Switch />
                  </View>
                </View>
              ) : null
            }
          </View>
          <View style={styles.addImage}>
            <Text style={styles.addImageTitle}>Add Image</Text>
            <Pressable>
              <View style={styles.addImageButton}>
                <IconSymbol name={ICON['photo.on.rectangle.angled']} size={60} color={Colors[colorScheme].primaryColor} />
                <Text style={styles.addImageButtonText}>Tap to Add Image</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.note}>
            <TextInput
              style={styles.noteInput}
              placeholder="Note..."
              placeholderTextColor={Colors[colorScheme].placeholderTextColor}
              multiline={true}
              value={formData.note}
              onChangeText={onChangeNoteHandler}
            />
          </View>
        </ScrollView>
        {
          type === ASSETS_ACTIONS.ADD_ASSET ? (
            <Pressable style={{ width: '100%', paddingHorizontal: 12, backgroundColor: Colors[colorScheme].modalBackground }}>
              <View style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Add</Text>
              </View>
            </Pressable>
          ) : null
        }
      </KeyboardAvoidingView>
    </SafeAreaThemedView>
  )
}

const formItemPaddingValue = 12;
const fontSize = 18;
const createStyles = (theme: ColorScheme) => StyleSheet.create({
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors[theme].divider,
  },
  container: {
    flex: 1,
  },
  selectIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors[theme].formBackground,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectIconText: {
    fontSize,
    color: 'gray',
  },
  formItem: {
    width: '100%',
    height: 45,
    paddingHorizontal: formItemPaddingValue,
    backgroundColor: Colors[theme].formBackground,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formItemTitle: {
    fontSize,
    color: Colors[theme].text,
  },
  formItemValue: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  formItemValueText: {
    fontSize,
    color: 'gray',
  },
  subForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors[theme].formBackground,
    paddingHorizontal: formItemPaddingValue,
  },
  subFormItem: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subFormItemInput: {
    fontSize: 18,
    color: Colors[theme].text,
  },
  addImage: {
    width: '100%',
    backgroundColor: Colors[theme].formBackground,
    borderRadius: 10,
    paddingHorizontal: formItemPaddingValue,
    paddingVertical: 18,
  },
  addImageTitle: {
    fontSize,
    color: Colors[theme].text,
    marginBottom: 10,
  },
  addImageButton: {
    width: '100%',
    aspectRatio: 1, // 高度和宽度相等
    backgroundColor: Colors[theme].addImageButtonBackground,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  addImageButtonText: {
    fontSize,
    color: Colors[theme].text,
  },
  note: {
    width: '100%',
    backgroundColor: Colors[theme].formBackground,
    borderRadius: 10,
    paddingHorizontal: formItemPaddingValue,
    paddingVertical: 18,
  },
  noteInput: {
    height: 100,
    fontSize,
    color: Colors[theme].text,
  },
  saveButton: {
    height: 60,
    marginTop: 20,
    backgroundColor: Colors[theme].primaryColor,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize,
    fontWeight: 'bold',
    color: 'white',
  },
})