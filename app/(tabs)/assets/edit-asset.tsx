import React, { useReducer, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Switch,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaThemedView } from '@/components/SafeAreaThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import HeaderTextButton from '@/components/HeaderTextButton';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import useLatest from '@/hooks/useLatest';
import { useDispatch } from 'react-redux';

import { formatPrice, validatePrice } from '@/utils';

import { Colors } from '@/constants/Colors';
import { ICON } from '@/constants/Icon';
import * as ASSETS_ACTIONS from '@/store/actions/assetsActions';

import { AssetItemData } from '@/store/type';

const ACTIONS = {
  SET_ICON: 'setIcon',
  SET_CATEGORY: 'setCategory',
  SET_WARRANTY_DATE: 'setWarrantyDate',
  INCREASE_USAGE_COUNT: 'increaseUsageCount',
  DECREASE_USAGE_COUNT: 'decreaseUsageCount',
  SET_DAILY_PRICE: 'setDailyPrice',
  SET_IN_SERVICE: 'setInService',
  SET_NAME: 'setName',
  SET_PURCHASE_PRICE: 'setPurchasePrice',
  SET_NOTE: 'setNote',
  SET_PURCHASE_DATE: 'setPurchaseDate',
  SET_RETIRED_DATE: 'setRetiredDate',
  SET_IMAGE: 'setImage',
}

const reducer = (state: AssetItemData, action: { type: string, payload?: any }) => {
  switch (action.type) {
    case ACTIONS.SET_ICON:
      return { ...state, icon: action.payload };
    case ACTIONS.SET_CATEGORY:
      return { ...state, categoryId: action.payload };
    case ACTIONS.SET_WARRANTY_DATE:
      return { ...state, warrantyDate: action.payload };
    case ACTIONS.INCREASE_USAGE_COUNT:
      return { ...state, usageCount: (state.usageCount || 0) + 1 };
    case ACTIONS.DECREASE_USAGE_COUNT:
      return { ...state, usageCount: (state.usageCount || 0) - 1 };
    case ACTIONS.SET_DAILY_PRICE:
      return { ...state, dailyPrice: action.payload };
    case ACTIONS.SET_IN_SERVICE:
      return { ...state, inService: action.payload };
    case ACTIONS.SET_NAME:
      return { ...state, name: action.payload };
    case ACTIONS.SET_PURCHASE_PRICE:
      return { ...state, purchasePrice: action.payload };
    case ACTIONS.SET_NOTE:
      return { ...state, note: action.payload };
    case ACTIONS.SET_PURCHASE_DATE:
      return { ...state, purchaseDate: action.payload };
    case ACTIONS.SET_RETIRED_DATE:
      return { ...state, retiredDate: action.payload };
    case ACTIONS.SET_IMAGE:
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

/**
 * 验证表单数据
 * @param formData 表单数据
 * @returns 错误信息
 */
const validateFormData = (formData: AssetItemData) => {
  const errors = [];
  const { icon, categoryId, purchasePrice, dailyPrice, name, specifiedDailyPrice, purchaseDate, retiredDate } = formData;
  if (!icon) {
    errors.push('Icon is required');
  }
  if (!categoryId) {
    errors.push('Category is required');
  }
  if (!name) {
    errors.push('Name is required');
  }
  if (!validatePrice(purchasePrice)) {
    errors.push('Invalid purchase price');
  }
  if (dailyPrice && !validatePrice(dailyPrice)) {
    errors.push('Invalid daily price');
  }
  if (specifiedDailyPrice && !validatePrice(specifiedDailyPrice)) {
    errors.push('Invalid specified daily price');
  }
  if (retiredDate && purchaseDate > retiredDate) {
    errors.push('Purchase date must be before retired date');
  }
  if (errors.length > 0) {
    return errors;
  }
  return true;
}

export default function EditAsset() {
  const navigation = useNavigation();
  const router = useRouter();
  const storeDispatch = useDispatch();
  const { data: paramsData, type } = useLocalSearchParams();
  const data = paramsData ? JSON.parse(paramsData as string) : {};
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const [formData, dispatch] = useReducer(reducer, data);
  const [setWarrantyDate, toggleSetWarrantyDate] = useState<boolean>(!!formData.warrantyDate);
  const [setDailyPrice, toggleSetDailyPrice] = useState<boolean>(!!formData.dailyPrice);
  const [setUsageCount, toggleSetUsageCount] = useState<boolean>(!!formData.usageCount);

  const purchasePriceRef = useRef<TextInput>(null);
  const [purchasePriceError, setPurchasePriceError] = useState<string>('');
  const dailyPriceRef = useRef<TextInput>(null);
  const [dailyPriceError, setDailyPriceError] = useState<string>('');

  const handleSelectIcon = () => {
    console.log('select icon');
  }

  const handleSetCategory = () => {
    console.log('set category');
  }

  enum SET_USAGE_COUNT_TYPE {
    INCREASE = 'increase',
    DECREASE = 'decrease',
  }
  const handleSetUsageCount = (type: SET_USAGE_COUNT_TYPE) => {
    if (type === SET_USAGE_COUNT_TYPE.DECREASE && formData.usageCount === 0) {
      return;
    }
    dispatch({
      type: type === SET_USAGE_COUNT_TYPE.INCREASE
        ? ACTIONS.INCREASE_USAGE_COUNT
        : ACTIONS.DECREASE_USAGE_COUNT,
    });
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
    dispatch({ type: ACTIONS.SET_PURCHASE_PRICE, payload: Number(text) });
  }

  const onChangeDailyPriceHandler = (text: string) => {
    dispatch({ type: ACTIONS.SET_DAILY_PRICE, payload: Number(text) });
  }

  const onPurchaseDateChangeHandler = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      return;
    }
    dispatch({ type: ACTIONS.SET_PURCHASE_DATE, payload: new Date(selectedDate).getTime() });
  }

  const onWarrantyDateChangeHandler = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      return;
    }
    dispatch({ type: ACTIONS.SET_WARRANTY_DATE, payload: new Date(selectedDate).getTime() });
  }

  const onRetiredDateChangeHandler = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      return;
    }
    dispatch({ type: ACTIONS.SET_RETIRED_DATE, payload: new Date(selectedDate).getTime() });
  }

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    // const result = await launchImageLibrary({
    //   mediaType: 'photo',
    //   selectionLimit: 1,
    //   includeBase64: true,
    // });
    if (!result.canceled) {
      dispatch({ type: ACTIONS.SET_IMAGE, payload: result.assets[0].uri });
    }
  }

  const blurAllInputs = () => {
    purchasePriceRef.current?.blur();
    dailyPriceRef.current?.blur();
  }

  const handleSave = () => {
    blurAllInputs();
    const errors = validateFormData(formData);
    if (errors) {
      return;
    };
    storeDispatch({ type: ASSETS_ACTIONS.ADD_ASSET, payload: formData });
    router.back();
  };

  const latestHandleUpdate = useLatest<Function>(() => {
    storeDispatch({ type: ASSETS_ACTIONS.UPDATE_ASSET, payload: formData });
    router.back();
  });

  const latestHandleCancel = useLatest<Function>(() => {
    router.back();
  });

  useEffect(() => {
    if (type === ASSETS_ACTIONS.UPDATE_ASSET) {
      navigation.setOptions({
        title: '',
        headerShown: true,
        headerTransparent: true,
        headerRight: () => <HeaderTextButton text="Save" onClick={() => latestHandleUpdate.current()} />,
        headerLeft: () => <HeaderTextButton text="Cancel" onClick={() => latestHandleCancel.current()} />,
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
              ref={purchasePriceRef}
              style={[styles.subFormItem, styles.subFormItemInput]}
              defaultValue={formData.purchasePrice?.toString()}
              onChangeText={onChangePurchasePriceHandler}
              keyboardType="numeric"
              placeholder="Price"
              placeholderTextColor={Colors[colorScheme].placeholderTextColor}
            />
            <View style={styles.divider} />
            <View style={[styles.subFormItem]}>
              <Text style={styles.formItemTitle}>Purchase Date</Text>
              <View style={styles.formItemValue}>
                <DateTimePicker
                  value={formData.purchaseDate ? new Date(Number(formData.purchaseDate)) : new Date()}
                  testID="dateTimePicker"
                  mode='date'
                  is24Hour={true}
                  onChange={onPurchaseDateChangeHandler}
                />
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
                <>
                  <View style={styles.divider} />
                  <View style={styles.subFormItem}>
                    <Text style={styles.formItemTitle}>Warranty End Date</Text>
                    <View style={styles.formItemValue}>
                      <DateTimePicker
                        value={formData.warrantyDate ? new Date(Number(formData.warrantyDate)) : new Date()}
                        testID="dateTimePicker"
                        mode='date'
                        is24Hour={true}
                        onChange={onWarrantyDateChangeHandler}
                      />
                    </View>
                  </View>
                </>
              ) : null
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
                <>
                  <View style={styles.divider} />
                  <View style={styles.subFormItem}>
                    <Text style={styles.formItemTitle}>Estimated Usage Count</Text>
                    <View style={styles.formItemValue}>
                      <Pressable
                        onPress={() => handleSetUsageCount(SET_USAGE_COUNT_TYPE.DECREASE)}
                        disabled={formData.usageCount === 0}
                      >
                        <IconSymbol name={ICON['minus.circle.fill']} size={28} color="gray" />
                      </Pressable>
                      <View style={{ width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.formItemValueText}>{formData.usageCount || 0}</Text>
                      </View>
                      <Pressable onPress={() => handleSetUsageCount(SET_USAGE_COUNT_TYPE.INCREASE)}>
                        <IconSymbol name={ICON['plus.circle.fill']} size={28} color={Colors[colorScheme].primaryColor} />
                      </Pressable>
                    </View>
                  </View>
                </>
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
                <>
                  <View style={styles.divider} />
                  <TextInput
                    ref={dailyPriceRef}
                    style={[styles.subFormItem, styles.subFormItemInput]}
                    value={formData.dailyPrice?.toString()}
                    onChangeText={onChangeDailyPriceHandler}
                    keyboardType="numeric"
                    placeholder="Daily Price"
                    placeholderTextColor={Colors[colorScheme].placeholderTextColor}
                  />
                </>
              ) : null
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
                <>
                  <View style={styles.divider} />
                  <View style={styles.subFormItem}>
                    <Text style={styles.formItemTitle}>Retired Date</Text>
                    <View style={styles.formItemValue}>
                      <DateTimePicker
                        value={formData.retiredDate ? new Date(Number(formData.retiredDate)) : new Date()}
                        testID="dateTimePicker"
                        mode='date'
                        is24Hour={true}
                        onChange={onRetiredDateChangeHandler}
                      />
                    </View>
                  </View>
                </>
              ) : null
            }
          </View>
          <View style={styles.addImage}>
            <Text style={styles.addImageTitle}>Add Image</Text>
            {
              formData.image ? (
                <Image source={{ uri: formData.image }} style={styles.image} />
              ) : (
                <Pressable onPress={handleAddImage}>
                  <View style={styles.addImageButton}>
                    <IconSymbol name={ICON['photo.on.rectangle.angled']} size={60} color={Colors[colorScheme].primaryColor} />
                    <Text style={styles.addImageButtonText}>Tap to Add Image</Text>
                  </View>
                </Pressable>
              )
            }
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
            <Pressable
              onPress={handleSave}
              style={{ width: '100%', paddingHorizontal: 12 }}
            >
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
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
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
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    paddingHorizontal: formItemPaddingValue,
  },
})