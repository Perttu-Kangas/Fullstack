import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const resultGenres = useQuery(ALL_GENRES)

  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (resultGenres.data) {
      let genresList = []
      resultGenres.data.allBooks.forEach(book => {
        book.genres.forEach(genre => {
          if (genresList.includes(genre)) {
            return
          }
          genresList.push(genre)
        })
      })
      setGenres(genresList)
    }
  }, [resultGenres])

  const filter = (genre) => {
    if (genre) {
      setBooks(result.data.allBooks.filter(book => book.genres.includes(genre)))
      return
    }
    setBooks(result.data.allBooks)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {genres.map(genre => (
          <button name={genre} key={genre} onClick={event => filter(event.target.name)}>
            {genre}
          </button>
        ))}
        <button onClick={() => filter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books