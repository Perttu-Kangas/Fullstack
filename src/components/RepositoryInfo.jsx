import { Image, StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'

const infoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },

  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },

  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },

  descriptionContainer: {
    flexGrow: 1,
  },

  languageContainer: {
    paddingTop: 5,
    flexDirection: 'row',
  },

  language: {
    color: theme.colors.textWhite,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 5,
  },
})

const RepositoryInfo = ({ repo }) => {
  return (
    <View style={infoStyles.container}>
      <View style={infoStyles.avatarContainer}>
        <Image
          style={infoStyles.avatar}
          source={{ uri: repo.ownerAvatarUrl }}
        />
      </View>
      <View style={infoStyles.infoContainer}>
        <Text fontWeight='bold' fontSize='subheading'>
          {repo.fullName}
        </Text>
        <Text style={infoStyles.descriptionContainer}>{repo.description}</Text>
        <View style={infoStyles.languageContainer}>
          <Text style={infoStyles.language}>{repo.language}</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryInfo
