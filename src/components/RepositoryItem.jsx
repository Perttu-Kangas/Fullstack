import { StyleSheet, View } from 'react-native'
import RepositoryInfo from './RepositoryInfo.jsx'
import RepositoryStats from './RepositoryStats'

const repoStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
  },
})

const RepositoryItem = ({ repo }) => {
  return (
    <View style={repoStyles.container}>
      <RepositoryInfo repo={repo} />
      <RepositoryStats repo={repo} />
    </View>
  )
}

export default RepositoryItem
