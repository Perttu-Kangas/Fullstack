import { View, StyleSheet, Pressable, Alert } from 'react-native'
import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 16,
    padding: 16,
    backgroundColor: theme.colors.textPrimary,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => Alert.alert('You pressed the text!')}>
        <Text color='textWhite'>Repositories</Text>
      </Pressable>
    </View>
  )
}

export default AppBar
