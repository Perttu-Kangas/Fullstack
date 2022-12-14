import { Link } from 'react-router-native'
import { View, StyleSheet, ScrollView, Pressable } from 'react-native'

import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

import useSignOut from '../hooks/useSignOut'
import { GET_CURRENT_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client'

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
  const { data, loading } = useQuery(GET_CURRENT_USER)
  const signOut = useSignOut()
  const loggedIn = !loading && data != undefined && data.me != null

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' style={styles.link}>
          <Text color='textWhite'>Repositories</Text>
        </Link>
        {loggedIn ? (
          <>
            <Link to='/createreview' style={styles.link}>
              <Text color='textWhite'>Create a review</Text>
            </Link>
            <Pressable style={styles.link} onPress={() => signOut()}>
              <Text color='textWhite'>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to='/signin' style={styles.link}>
              <Text color='textWhite'>Sign in</Text>
            </Link>
            <Link to='/signup' style={styles.link}>
              <Text color='textWhite'>Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
