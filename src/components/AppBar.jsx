import { Link } from 'react-router-native'
import { View, StyleSheet } from 'react-native'

import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 16,
    padding: 10,
    backgroundColor: theme.colors.textPrimary,
  },

  linkContainer: {
    flexDirection: 'row',
  },

  link: {
    padding: 10,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Link to='/' style={styles.link}>
          <Text color='textWhite'>Repositories</Text>
        </Link>
        <Link to='/signin' style={styles.link}>
          <Text color='textWhite'>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}

export default AppBar
