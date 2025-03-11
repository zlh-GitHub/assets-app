import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { useColorScheme, ColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaThemedView } from "@/components/SafeAreaThemedView";
import { Colors } from "@/constants/Colors";
const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  return (
    <SafeAreaThemedView style={styles.container}>
      <Text style={styles.textColor}>翻译</Text>
    </SafeAreaThemedView>
  )
}

const createStyles = (theme: ColorScheme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  textColor: {
    color: Colors[theme].text,
  }
})
