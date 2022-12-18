import { View, FlatList, StyleSheet } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItemList from './RepositoryItemList'
import { useState } from 'react'
import { RadioButton, List, Searchbar } from 'react-native-paper'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositorySorter = ({ setOrder, setKeyword }) => {
  const [expanded, setExpanded] = useState(true)
  const [value, setValue] = useState('Latest repositories')
  const [searchQuery, setSearchQuery] = useState('')

  const handlePress = () => setExpanded(!expanded)

  const onSortingPress = (value) => {
    setValue(value)
    if (value === 'Highest rated repositories') {
      setOrder({
        orderDirection: 'DESC',
        orderBy: 'RATING_AVERAGE',
      })
    } else if (value === 'Lowest rated repositories') {
      setOrder({
        orderDirection: 'ASC',
        orderBy: 'RATING_AVERAGE',
      })
    } else {
      setOrder({
        orderDirection: 'DESC',
        orderBy: 'CREATED_AT',
      })
    }
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    setKeyword(query)
  }

  return (
    <View>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <List.Section>
        <List.Accordion title={value} onPress={handlePress}>
          <RadioButton.Group
            onValueChange={(newValue) => onSortingPress(newValue)}
            value={value}>
            <RadioButton.Item
              label='Latest repositories'
              value='Latest repositories'
            />
            <RadioButton.Item
              label='Highest rated repositories'
              value='Highest rated repositories'
            />
            <RadioButton.Item
              label='Lowest rated repositories'
              value='Lowest rated repositories'
            />
          </RadioButton.Group>
        </List.Accordion>
      </List.Section>
    </View>
  )
}

export const RepositoryListContainer = ({
  repositories,
  setOrder,
  setKeyword,
  onEndReach,
}) => {
  const renderItem = ({ item }) => <RepositoryItemList repo={item} />

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositorySorter setOrder={setOrder} setKeyword={setKeyword} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const RepositoryList = () => {
  const [order, setOrder] = useState({
    orderDirection: 'DESC',
    orderBy: 'RATING_AVERAGE',
  })
  const [keyword, setKeyword] = useState('')

  const { repositories, fetchMore } = useRepositories({
    order,
    keyword,
    first: 8,
  })

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrder={setOrder}
      setKeyword={setKeyword}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
