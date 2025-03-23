import React, { useRef, useState } from 'react';
import { Pressable, View, Text, StyleSheet, Animated, PanResponder, LayoutChangeEvent } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import useLatest from '@/hooks/useLatest';

import { ICON } from '@/constants/Icon';
import { formatDate } from '@/utils';
import { Colors } from '@/constants/Colors';

import { CostItemData } from '@/store/type';

type CostItemProps = {
  cost: CostItemData;
  onEdit: (cost: CostItemData) => void;
  onDelete: (cost: CostItemData) => void;
  onPanResponderGrant: () => void;
  onPanResponderEnd: () => void;
}

// 删除按钮最小宽度
const DELETE_BTN_MIN_WIDTH = 80;
// 开始显示删除按钮的最小滑动距离
const START_SHOW_DELETE_BTN_MIN_MOVE_DISTANCE = 10;
// Y 轴滑动误差，超过该值则不响应手势
const Y_OFFSET = 10;
// 滑动超过 20 完整显示删除按钮的最小滑动距离
const DELETE_BTN_MIN_MOVE_DISTANCE = 20;
// 滑动到距离左侧小于该值则直接删除
const DELETE_DISTANCE = 20;
// 滑动到距离左侧小于该值则变成待删除状态，松手或者继续滑动则直接删除
const PENDING_DELETE_DISTANCE = 80;

function CostItem(props: CostItemProps) {
  const { cost, onEdit, onDelete, onPanResponderGrant, onPanResponderEnd } = props;
  const theme = useColorScheme();
  const styles = createStyles(theme);
  const pan = useRef(new Animated.ValueXY()).current;
  const deleteWidth = useRef(new Animated.Value(DELETE_BTN_MIN_WIDTH)).current;

  const [itemWidth, setItemWidth] = useState(0);
  const latestItemWidth = useLatest(itemWidth);
  const touching = useRef(false);
  // 通过 create 返回的对象的 panHandlers 属性可以拿到整个触摸事件的集合对象
  const panResponder = useRef(PanResponder.create({
    // x 轴滑动距离超过 30 才成为响应者
    onMoveShouldSetPanResponder: (_, gesture) => {
      if (touching.current) {
        return false;
      }
      console.log('========================onMoveShouldSetPanResponder========================', gesture.dx);
      if (Math.abs(gesture.dx) > START_SHOW_DELETE_BTN_MIN_MOVE_DISTANCE) {
        return true;
      }
      return false;
    },
    // 组件正式成为手势响应者时触发
    onPanResponderGrant: (_, gesture) => {
      touching.current = true;
      console.log('onPanResponderGrant');
      onPanResponderGrant();
    },
    // 手指移动的时候会触发
    onPanResponderMove: (_, gesture) => {
      if (gesture.dx > 0) { // 只允许向左滑动的时候才改变偏移位置和设置删除按钮宽度
        return;
      };
      if (gesture.dx < (-100)) {
        // 滑动到距离左侧小于 PENDING_DELETE_DISTANCE 则变成待删除状态
        console.log('onPanResponderMove 变成待删除状态');
        Animated.spring(pan.x, {
          toValue: DELETE_DISTANCE - latestItemWidth.current,
          useNativeDriver: false,
        }).start();
        Animated.spring(deleteWidth, {
          toValue: latestItemWidth.current - DELETE_DISTANCE,
          useNativeDriver: false,
        }).start();
      } else {
        console.log('onPanResponderMove 设置偏移');
        pan.x.setValue(gesture.dx);
        // 滑动距离大于最小删除按钮宽度，则开始同步设置删除按钮宽度
        deleteWidth.setValue(Math.max(DELETE_BTN_MIN_WIDTH, Math.abs(gesture.dx)));
      }
    },
    // 触发时机：组件变成非手势响应者时
    onPanResponderEnd: (_, gesture) => {
      touching.current = false;
      console.log('onPanResponderEnd');
      // 滑动到距离左侧小于 DELETE_DISTANCE 直接删除
      if (gesture.dx < (DELETE_DISTANCE - latestItemWidth.current)) {
        console.log('onPanResponderEnd 直接删除');
        // onDelete(cost);
      } else if (gesture.dx < (PENDING_DELETE_DISTANCE - latestItemWidth.current)) {
        // 滑动到距离左侧小于 PENDING_DELETE_DISTANCE 则变成待删除状态
        console.log('onPanResponderEnd 变成待删除状态');
        Animated.spring(pan.x, {
          toValue: DELETE_DISTANCE - latestItemWidth.current,
          useNativeDriver: false,
        }).start();
      } else if (gesture.dx < -START_SHOW_DELETE_BTN_MIN_MOVE_DISTANCE) {
        // 如果向左滑动距离超过 DELETE_BTN_MIN_MOVE_DISTANCE 则显示删除按钮
        console.log('onPanResponderEnd 显示删除按钮');
        Animated.spring(pan.x, {
          toValue: -DELETE_BTN_MIN_WIDTH,
          useNativeDriver: false,
        }).start();
      } else {
        // 否则恢复原状
        console.log('onPanResponderEnd 恢复原状');
        Animated.spring(pan.x, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
      onPanResponderEnd();
    },
    // 手指离开的时候会触发
    onPanResponderRelease: (_, gesture) => {
      touching.current = false;
      // pan.setValue({ x: 0, y: 0 });
      // 固定最后的位置
      // pan.flattenOffset();
      console.log('onPanResponderRelease');
      // 滑动到距离左侧小于 DELETE_DISTANCE 直接删除
      if (gesture.dx < (DELETE_DISTANCE - latestItemWidth.current)) {
        console.log('onPanResponderRelease 直接删除');
        // onDelete(cost);
      } else if (gesture.dx < (PENDING_DELETE_DISTANCE - latestItemWidth.current)) {
        // 滑动到距离左侧小于 PENDING_DELETE_DISTANCE 则变成待删除状态
        console.log('onPanResponderRelease 变成待删除状态');
        Animated.spring(pan.x, {
          toValue: DELETE_DISTANCE - latestItemWidth.current,
          useNativeDriver: false,
        }).start();
      } else if (gesture.dx < -START_SHOW_DELETE_BTN_MIN_MOVE_DISTANCE) {
        // 如果向左滑动距离超过 DELETE_BTN_MIN_MOVE_DISTANCE 则显示删除按钮
        console.log('onPanResponderRelease 显示删除按钮');
        Animated.spring(pan.x, {
          toValue: -DELETE_BTN_MIN_WIDTH,
          useNativeDriver: false,
        }).start();
      } else {
        // 否则恢复原状
        console.log('onPanResponderRelease 恢复原状');
        Animated.spring(pan.x, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
      onPanResponderEnd();
    },
  })).current;

  const onCostItemLayoutHandler = (event: LayoutChangeEvent) => {
    setItemWidth(event.nativeEvent.layout.width);
  }

  return (
    <View style={styles.costItem} onLayout={onCostItemLayoutHandler}>
      <Animated.View
        style={[
          styles.costItemContent,
          {
            transform: [
              { translateX: pan.x },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View>
          <View style={[styles.item, { width: itemWidth }]}>
            <View style={styles.itemLeft}>
              <View style={styles.itemLeftTop}>
                <Text style={styles.itemName}>{cost.name}</Text>
                <Text style={styles.itemAmount}>${cost.amount}</Text>
              </View>
              <Text style={styles.itemDate}>{formatDate(cost.date)}</Text>
            </View>
            <IconSymbol name={ICON['chevron.right']} size={16} color='gray' />
          </View>
        </View>
        <Animated.View
          style={[
            styles.deleteCostItem,
            {
              width: deleteWidth,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.deleteCostItemText}>Delete</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default React.memo(CostItem);

const fontSize = 18;
const createStyles = (theme: ColorScheme) => StyleSheet.create({
  costItem: {
    width: '100%',
    height: 70,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors[theme].divider,
  },
  costItemContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemName: {
    fontSize,
    color: Colors[theme].text,
    fontWeight: 'bold',
  },
  itemAmount: {
    fontSize,
    color: Colors[theme].primaryColor,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
    color: Colors[theme].text,
  },
  itemLeft: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  itemLeftTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  deleteCostItem: {
    height: '100%',
    backgroundColor: '#eb5545',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteCostItemText: {
    fontSize: 14,
    color: '#FFF',
  },
});
