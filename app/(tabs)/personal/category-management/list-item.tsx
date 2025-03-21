import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";

import { useRouter } from "expo-router";
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";

import { Colors } from "@/constants/Colors";
import { Category } from "@/store/type";
import * as CATEGORY_ACTIONS from '@/store/actions/categoryActions';

type Props = {
  data: Category,
  isEdit: boolean
}

export default function ListItem(props: Props) {
  // 速记属性 "id" 的范围内不存在任何值。请声明一个值或提供一个初始值设定项。
  // 这是因为 解构 props 的时候 data = { id } 是给 data 一个默认值
  // 如果 props.data 不存在就使用 { id: someting }，这里的 id 并没有在当前作用域中定义，所以 TS 报错
  // const { data = { id } } = props;
  const { data, isEdit } = props;
  const { id, name, icon } = data;
  const router = useRouter();
  const colorScheme = useColorScheme();
  // 统一管理样式
  const styles = createStyles(colorScheme);

  const onPressHandle = () => {
    router.push({
      pathname: '/personal/edit-category',
      params: {
        data: JSON.stringify(data),
        type: CATEGORY_ACTIONS.UPDATE_CATEGORY,
      },
    });
  }
  return (
    <Pressable
      onPress={onPressHandle}
    >
      <View style={styles.item}>
        {
          isEdit && (
            <View>
              <IconSymbol
                name='minus.circle.fill'
                color='#ea5544'
                size={26}
              />
            </View>
          )
        }
        <View style={styles.icon}>
          <IconSymbol
            name={icon}
            color={Colors[colorScheme].primaryColor}
            size={26}
          />
        </View>
        <View style={styles.borderBottomView}>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View>
            <IconSymbol
              name='chevron.right'
              color={Colors[colorScheme].text}
              size={12}
            />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  item: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  icon: {
    width: 35,
  },
  name: {
    fontSize: 18,
    color: Colors[theme].text
  },
  borderBottomView: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#3d3c40',
    paddingRight: 20,
  }
})