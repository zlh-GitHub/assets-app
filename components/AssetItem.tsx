import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ColorScheme, useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { IconName } from '@/constants/Icon';
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { deleteItem, setItemFavorite } from '@/app/(tabs)/assets/mock-data';

export type AssetItemData = {
  id: number;
  name: string;
  price: number;
  dailyCost: number;
  days: number;
  icon: IconName;
  purchaseDate: string;
  purchasePrice: number;
  totalPrice: number;
  favorite?: boolean;
  category: {
    id: number;
    name: string;
    icon: IconName;
  },
  note?: string;
  retired?: boolean;
  retiredDate?: string;
}

type Props = {
  data: AssetItemData
}

export default function AssetItem({ data }: Props) {
  const router = useRouter();
  const theme = useColorScheme();
  const styles = createStyles(theme);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(data.favorite || false);
  const contentHeight = useRef(80);
  const heightAnim = useRef(new Animated.Value(contentHeight.current)).current;

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
    setItemFavorite(data.id, isFavorite);
  }

  const handleEdit = () => {
    router.push({
      pathname: '/assets/edit-asset',
      params: {
        data: JSON.stringify(data),
      },
    });
  }

  const handleDelete = () => {
    deleteItem(data.id);
  }

  return (
    <Pressable
      onPress={handleToggleDetail}
    >
      <Animated.View
        style={[
          styles.assetItemContainer,
          data.retired && styles.retiredAssetItemContainer,
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
              ${data.price.toFixed(2)}  ·  ${data.dailyCost.toFixed(1)}/Day
            </Text>
          </View>
          <View style={styles.daysContainer}>
            {data.retired && (
              <Text style={[styles.retiredText, styles.whiteColor]}>Retired</Text>
            )}
            <Text style={[styles.days, styles.whiteColor]}>{data.days}Days</Text>
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
            <Text style={styles.detailItemValue}>{data.purchaseDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>Purchase Price</Text>
            <Text style={styles.detailItemValue}>${data.purchasePrice.toFixed(2)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>Total Price</Text>
            <Text style={styles.detailItemValue}>${data.totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailItemTitle}>Category</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <IconSymbol name={data.category.icon} size={20} color='white' />
              <Text style={styles.detailItemValue}>{data.category.name}</Text>
            </View>
          </View>
          {data.retired && (
            <View style={styles.detailItem}>
              <Text style={styles.detailItemTitle}>Retire Date</Text>
              <Text style={styles.detailItemValue}>{data.retiredDate}</Text>
            </View>
          )}
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
                <IconSymbol name={isFavorite ? 'star.fill' : 'star'} size={26} color='white' />
                <Text style={styles.actionText}>Favorite</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleEdit}>
              <View style={styles.actionItem}>
                <IconSymbol name='pencil' size={26} color='white' />
                <Text style={styles.actionText}>Edit</Text>
              </View>
            </Pressable>
            <Pressable onPress={handleDelete}>
              <View style={styles.actionItem}>
                <IconSymbol name='trash' size={26} color='white' />
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