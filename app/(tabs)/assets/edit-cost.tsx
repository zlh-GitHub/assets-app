import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';

import HeaderTextButton from '@/components/HeaderTextButton';
import { SafeAreaThemedView } from '@/components/SafeAreaThemedView';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import useLatest from '@/hooks/useLatest';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import { useDispatch } from 'react-redux';

import { validatePrice } from '@/utils';

import * as ASSETS_ACTIONS from '@/store/actions/assetsActions';
import { Colors } from '@/constants/Colors';
import { CostItemData } from '@/store/type';
import { createSetCurCostAction } from '@/store/actionCreator/curCostActionCreator';

const validateFormData = (formData: CostItemData) => {
  if (!formData.name) {
    return false;
  }
  if (!validatePrice(formData.amount)) {
    return false;
  }
  if (!formData.date) {
    return false;
  }
  return true;
}

export default function EditCost() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { type, data } = params;
  const [costData, setCostData] = useState<CostItemData>(() => {
    if (type === ASSETS_ACTIONS.ADD_COST) {
        return {
        name: '',
        amount: '',
        date: new Date().getTime().toString(),
        description: '',
      };
    } else {
      return JSON.parse(data as string);
    }
  });

  const dispatch = useDispatch();
  const latestHandleSave = useLatest<Function>(() => {
    if (!validateFormData(costData)) {
      return;
    }
    dispatch(createSetCurCostAction(costData));
    router.back();
  });

  const latestHandleCancel = useLatest<Function>(() => {
    router.back();
  });

  const onCostDateChangeHandler = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (!selectedDate) {
      return;
    }
    setCostData({ ...costData, date: new Date(selectedDate).getTime().toString() });
  }

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerTransparent: true,
      headerRight: () => <HeaderTextButton text={type === ASSETS_ACTIONS.ADD_COST ? 'Add' : 'Save'} onClick={() => latestHandleSave.current()} />,
      headerLeft: () => <HeaderTextButton text="Cancel" onClick={() => latestHandleCancel.current()} />,
    });
  }, [type]);

  return (
    <SafeAreaThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingHorizontal: 12 }}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <Text style={styles.pageTitle}>{type === ASSETS_ACTIONS.ADD_COST ? 'Add Cost' : 'Edit Cost'}</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.formItem}
            placeholder="Cost Name"
            placeholderTextColor={Colors[colorScheme].placeholderTextColor}
            value={costData.name}
            onChangeText={(text) => setCostData({ ...costData, name: text })}
          />
          <View style={styles.divider} />
          <TextInput
            style={styles.formItem}
            placeholder="Cost Amount"
            keyboardType='numeric'
            placeholderTextColor={Colors[colorScheme].placeholderTextColor}
            defaultValue={type === ASSETS_ACTIONS.ADD_COST ? '' : costData.amount.toString()}
            onChangeText={(text) => setCostData({ ...costData, amount: Number(text) })}
          />
          <View style={styles.divider} />
          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>Cost Date</Text>
            <DateTimePicker
              value={new Date(Number(costData.date))}
              mode="date"
              testID="dateTimePicker"
              is24Hour={true}
              onChange={onCostDateChangeHandler}
            />
          </View>
          <View style={styles.divider} />
          <TextInput
            style={styles.formItem}
            placeholder="Cost Description"
            placeholderTextColor={Colors[colorScheme].placeholderTextColor}
            value={costData.description}
            onChangeText={(text) => setCostData({ ...costData, description: text })}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaThemedView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[theme].modalBackground,
  },
  pageTitle: {
    color: Colors[theme].text,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    marginLeft: 12,
    backgroundColor: Colors[theme].divider,
  },
  form: {
    width: '100%',
    backgroundColor: Colors[theme].formBackground,
    borderRadius: 10,
  },
  formItem: {
    height: 60,
    fontSize: 18,
    paddingHorizontal: 12,
    color: Colors[theme].text,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formItemTitle: {
    fontSize: 18,
    color: Colors[theme].text,
  },
  formItemValue: {
    fontSize: 18,
  },
});
