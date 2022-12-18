import { StyleSheet, View, FlatList } from 'react-native'
import Text from './Text.jsx'
import theme from '../theme.js'
import { format } from 'date-fns'
import { GET_CURRENT_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client'

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

  separator: {
    height: 10,
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

const ItemSeparator = () => <View style={reviewStyles.separator} />

const MyReviews = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  })
  const reviews = data?.me.reviews
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  if (!reviews) {
    return <Text>Loading...</Text>
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews
