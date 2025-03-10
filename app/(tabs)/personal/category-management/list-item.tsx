import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";
import { IconSymbol } from "@/components/ui/IconSymbol";

export type CategoryData = {
  id: number,
  name: string,
  icon: import('expo-symbols').SymbolViewProps['name'],
}

type Props = {
  data: CategoryData
}

export default function ListItem(props: Props) {
  console.log(props)
  // 速记属性 "id" 的范围内不存在任何值。请声明一个值或提供一个初始值设定项。
  // 这是因为 解构 props 的时候 data = { id } 是给 data 一个默认值
  // 如果 props.data 不存在就使用 { id: someting }，这里的 id 并没有在当前作用域中定义，所以 TS 报错
  // const { data = { id } } = props;
  const { data } = props;
  const { id, name, icon } = data;
  const router = useRouter();
  const colorScheme = useColorScheme();
  // 统一管理样式
  const styles = createStyles(colorScheme);
  const onPressHandle = () => {
    router.push({
      pathname: '/personal/edit-category',
      params: {
        id,
      },
    });
  }
  return (
    <Pressable
      onPress={onPressHandle}
    >
      <View style={styles.item}>
        <View>
          <IconSymbol
            name={icon}
            color={Colors[colorScheme].tint}
            size={26}
          />
        </View>
        <View style={styles.item}>
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
    </Pressable>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  item: {
    height: 50,
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: Colors[theme].text
  }
})