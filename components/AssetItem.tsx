import React, { useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme';

import { formatDate } from '@/utils';

import { Colors } from '@/constants/Colors';
import { ICON } from '@/constants/Icon';
import { createDddAssetAction, createDeleteAssetAction, createUpdateAssetAction } from '@/store/actionCreator/assetsActionCreator';
import * as ASSETS_ACTIONS from '@/store/actions/assetsActions';

import { AssetItemData, Category, Store } from '@/store/type';
type Props = {
  data: AssetItemData
}

export default function AssetItem({ data }: Props) {
  const router = useRouter();
  const theme = useColorScheme();
  const styles = createStyles(theme);
  const dispatch = useDispatch();
  const categories = useSelector((state: Store) => state.categories);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(data.favorite || false);
  const contentHeight = useRef(80);
  const heightAnim = useRef(new Animated.Value(contentHeight.current)).current;

  const { category, days, totalPrice, dailyCost } = useMemo(() => {
    const now = new Date().getTime();
    const days = Math.floor((now - Number(data.purchaseDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = data.otherExpenses?.reduce((acc, expense) => acc + expense.price, data.purchasePrice) || data.purchasePrice;
    const dailyCost = (totalPrice / days).toFixed(2);
    const category = categories.find(c => c.id === data.categoryId);
    return { category, days, totalPrice, dailyCost };
  }, [data]);

  const handleToggleDetail = () => {
    setShowDetail(prev => !prev);
    Animated.spring(heightAnim, {
      toValue: showDetail ? 80 : contentHeight.current,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }

  const handleToggleFavorite = () => {
    setIsFavorite(prev => !prev);
    dispatch(createUpdateAssetAction({
      ...data,
      favorite: !isFavorite,
    }));
  }

  const handleEdit = () => {
    router.push({
      pathname: '/assets/edit-asset',
      params: {
        data: JSON.stringify(data),
        type: ASSETS_ACTIONS.UPDATE_ASSET,
      },
    });
  }

  const handleSetRetired = () => {
    dispatch(createUpdateAssetAction({
      ...data,
      retiredDate: new Date().toISOString(),
    }));
  }

  const handleDelete = () => {

  }

  return (
    <Pressable
      onPress={handleToggleDetail}
    >
      <Animated.View
        style={[
          styles.assetItemContainer,
          data.retiredDate ? styles.retiredAssetItemContainer : null,
          { height: heightAnim }
        ]}
      >
        <View style={styles.briefContainer}>
          <View style={styles.iconContainer}>
            <IconSymbol name={data.icon} size={30} color='white' />
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.name, styles.whiteColor]}>{data.name}</Text>
            <Text style={[styles.price, styles.whiteColor]}>
              ${data.purchasePrice.toFixed(2)}  ·  ${dailyCost}/Day
            </Text>
          </View>
          <View style={styles.daysContainer}>
            {data.retiredDate ? (
              <Text style={[styles.retiredText, styles.whiteColor]}>Retired</Text>
            ) : null}
            <Text style={[styles.days, styles.whiteColor]}>{days}Days</Text>
          </View>
        </View>
        <View
          style={styles.detailContainer}
          onLayout={event => {
            contentHeight.current = event.nativeEvent.layout.height + 80;
          }}
        >
          <Text style={styles.detailContainerTitle}>Purchase Information</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>Purchase Date</Text>
            <Text style={styles.detailItemValue}>{formatDate(data.purchaseDate)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>Purchase Price</Text>
            <Text style={styles.detailItemValue}>${data.purchasePrice.toFixed(2)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>Total Price</Text>
            <Text style={styles.detailItemValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          {
            category ? (
              <View style={styles.detailItem}>
                <Text style={styles.detailItemTitle}>Category</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <IconSymbol name={category.icon} size={20} color='white' />
                  <Text style={styles.detailItemValue}>{category.name}</Text>
                </View>
              </View>
            ) : null
          }
          {data.retiredDate ? (
            <View style={styles.detailItem}>
              <Text style={styles.detailItemTitle}>Retire Date</Text>
              <Text style={styles.detailItemValue}>{formatDate(data.retiredDate)}</Text>
            </View>
          ) : null}
          <View style={styles.divider} />
          {data.note && (
            <>
              <View style={[styles.detailItem, styles.columnDetailItem]}>
                <Text style={styles.detailItemTitle}>Note</Text>
                <Text style={styles.detailItemValue}>{data.note}</Text>
              </View>
              <View style={styles.divider} />
            </>
          )}
          <View style={styles.actionContainer}>
            <Pressable onPress={handleToggleFavorite}>
              <View style={styles.actionItem}>
                <IconSymbol name={ICON[isFavorite ? 'star.fill' : 'star']} size={26} color='white' />
                <Text style={styles.actionText}>Favorite</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleEdit}>
              <View style={styles.actionItem}>
                <IconSymbol name={ICON['pencil']} size={26} color='white' />
                <Text style={styles.actionText}>Edit</Text>
              </View>
            </Pressable>
            {
              !data.retiredDate ? (
                <Pressable onPress={handleSetRetired}>
                  <View style={styles.actionItem}>
                    <IconSymbol name={ICON['xmark.circle']} size={26} color='white' />
                    <Text style={styles.actionText}>Retired</Text>
                  </View>
                </Pressable>
              ) : null
            }
            <Pressable onPress={handleDelete}>
              <View style={styles.actionItem}>
                <IconSymbol name={ICON['trash']} size={26} color='white' />
                <Text style={styles.actionText}>Delete</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  assetItemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#5ab183',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  briefContainer: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  retiredAssetItemContainer: {
    backgroundColor: '#7d838b',
  },
  iconContainer: {
    width: 40,
    height: '100%',
    marginRight: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
  },
  daysContainer: {
    width: 80,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  days: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  retiredText: {
    flexGrow: 0,
    alignSelf: 'flex-end', // 这样文字宽度就不会撑开了
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 5,
    backgroundColor: 'red'
  },
  detailContainer: {
    // boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'gray',
    paddingVertical: 20,
    paddingLeft: 10,
  },
  detailContainerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  detailItem: {
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  columnDetailItem: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailItemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  detailItemValue: {
    fontSize: 16,
    color: 'white',
  },
  actionContainer: {
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  actionText: {
    fontSize: 10,
    color: 'white',
  }
})