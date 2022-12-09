import { Link } from 'react-router-native'
import { View, StyleSheet, ScrollView } from 'react-native'

import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },

  link: {
    padding: 15,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' style={styles.link}>
          <Text color='textWhite'>Repositories</Text>
        </Link>
        <Link to='/signin' style={styles.link}>
          <Text color='textWhite'>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
