import { Text, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
})

const RepositoryItem = ({ repo }) => {
  return (
    <>
      <Image style={styles.image} source={{ uri: repo.ownerAvatarUrl }} />
      <Text>Full name: {repo.fullName}</Text>
      <Text>Description: {repo.description}</Text>
      <Text>Language: {repo.language}</Text>
      <Text>Stars: {repo.stargazersCount}</Text>
      <Text>Forks: {repo.forksCount}</Text>
      <Text>Reviews: {repo.reviewCount}</Text>
      <Text>Rating: {repo.ratingAverage}</Text>
    </>
  )
}

export default RepositoryItem
