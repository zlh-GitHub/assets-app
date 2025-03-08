import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView
} from 'react-native';


const { width } = Dimensions.get('window');


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>翻译</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
});
