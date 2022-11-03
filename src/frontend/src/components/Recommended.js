import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, USER_GENRE } from '../queries'

const Recommended = (props) => {
  const result = useQuery(ALL_BOOKS)
  const resultUser = useQuery(USER_GENRE)

  const [books, setBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks.filter(book => book.genres.includes(resultUser.data.me.favoriteGenre)))
    }
  }, [result, resultUser])

  if (!props.show) {
    return null
  }

  if (result.loading || resultUser.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre {resultUser.data.me.favoriteGenre}
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended