import { StyleSheet, View, Pressable, FlatList } from 'react-native'
import RepositoryInfo from './RepositoryInfo.jsx'
import RepositoryStats from './RepositoryStats'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository.js'
import useRepositoryReview from '../hooks/useRepositoryReviews.js'
import Text from './Text.jsx'
import { openURL } from 'expo-linking'
import theme from '../theme.js'
import { format } from 'date-fns'

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

  separator: {
    height: 10,
  },
})

const RepositoryItemInfo = ({ repository }) => {
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

const reviewStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
  },

  ratingContainer: {
    margin: 5,
    width: 45,
    height: 45,
    flexGrow: 0,
    borderRadius: 45 / 2,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.ratingContainer}>
        <Text color='primary'>{review.rating}</Text>
      </View>

      <View>
        <Text fontWeight='bold' fontSize='subheading'>
          {review.user.username}
        </Text>
        <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={repoStyles.separator} />

const RepositoryItem = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)
  const { reviews } = useRepositoryReview(id)

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  if (!repository || !reviews) {
    return <Text>Loading...</Text>
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItemInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default RepositoryItem
