import { StyleSheet, View, Pressable } from 'react-native'
import RepositoryInfo from './RepositoryInfo.jsx'
import RepositoryStats from './RepositoryStats'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository.js'
import Text from './Text.jsx'
import { openURL } from 'expo-linking'
import theme from '../theme.js'

const repoStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
  },

  open: {
    color: theme.colors.textWhite,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
  },
})

const RepositoryItem = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  if (!repository) {
    return <Text>Loading...</Text>
  }

  return (
    <View testID='repositoryItem' style={repoStyles.container}>
      <RepositoryInfo repo={repository} />
      <RepositoryStats repo={repository} />
      <Pressable onPress={() => openURL(repository.url)}>
        <Text style={repoStyles.open}>Open in GitHub</Text>
      </Pressable>
    </View>
  )
}

export default RepositoryItem
