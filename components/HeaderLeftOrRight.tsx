import { Pressable, Text } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

type Props = {
  text: string,
  onClick: Function
}

export default function HeaderLeftOrRight({ onClick, text }: Props) {
  const colorScheme = useColorScheme();
  const onPressHandle = (...args: any[]) => onClick(...args);
  return (
    <Pressable onPress={onPressHandle}>
      <Text style={{ color: Colors[colorScheme].primaryColor, fontSize: 17 }}>{text}</Text>
    </Pressable >
  )
}