import { StyleSheet, View } from 'react-native'
import Text from './Text'

const statsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },

  statContainer: {
    alignItems: 'center',
  },
})

const numberConverter = ({ number }) => {
  let num = parseInt(number)
  if (num < 1000) {
    return number
  }
  return (num / 1000).toFixed(1).toString() + 'k'
}

const RepositoryStats = ({ repo }) => {
  return (
    <View style={statsStyles.container}>
      <View style={statsStyles.statContainer}>
        <Text fontWeight='bold' fontSize='subheading'>
          {numberConverter({ number: repo.stargazersCount })}
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={statsStyles.statContainer}>
        <Text fontWeight='bold' fontSize='subheading'>
          {numberConverter({ number: repo.forksCount })}
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={statsStyles.statContainer}>
        <Text fontWeight='bold' fontSize='subheading'>
          {numberConverter({ number: repo.reviewCount })}
        </Text>
        <Text>Reviews</Text>
      </View>
      <View style={statsStyles.statContainer}>
        <Text fontWeight='bold' fontSize='subheading'>
          {numberConverter({ number: repo.ratingAverage })}
        </Text>
        <Text>Rating</Text>
      </View>
    </View>
  )
}

export default RepositoryStats
