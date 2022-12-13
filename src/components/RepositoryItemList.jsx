import { StyleSheet, View, Pressable } from 'react-native'
import RepositoryInfo from './RepositoryInfo.jsx'
import RepositoryStats from './RepositoryStats'
import { useNavigate } from 'react-router-native'

const repoStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
  },
})

const RepositoryItemList = ({ repo }) => {
  const navigate = useNavigate()

  return (
    <Pressable onPress={() => navigate(`/repository/${repo.id}`)}>
      <View testID='repositoryItemList' style={repoStyles.container}>
        <RepositoryInfo repo={repo} />
        <RepositoryStats repo={repo} />
      </View>
    </Pressable>
  )
}

export default RepositoryItemList
