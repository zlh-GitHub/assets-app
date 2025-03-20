import { View, Text } from 'react-native';
import { SafeAreaThemedView } from '@/components/SafeAreaThemedView';
import { useColorScheme, ColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function AddProduct() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  return (
    <SafeAreaThemedView style={styles.container}>
      <Text style={styles.textColor}>Add</Text>
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