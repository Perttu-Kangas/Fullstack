const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (last, now) => {
    return last + now.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (last, now) => {
    return last.likes > now.likes ? last : now
  }
  return blogs.length === 0
    ? undefined
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  let currentAuthor = blogs[0].author
  let currentAuthorMostBlogs = 1

  const map = {}
  blogs.forEach(blog => {
    map[blog.author] = map[blog.author] ? map[blog.author] + 1 : 1
    if (map[blog.author] > currentAuthorMostBlogs) {
      currentAuthor = blog.author
      currentAuthorMostBlogs = map[blog.author]
    }
  })

  return { author: currentAuthor, blogs: currentAuthorMostBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  let currentAuthor = blogs[0].author
  let currentAuthorMostLikes = 0

  const map = {}
  blogs.forEach(blog => {
    map[blog.author] = map[blog.author] ? map[blog.author] + blog.likes : blog.likes
    if (map[blog.author] > currentAuthorMostLikes) {
      currentAuthor = blog.author
      currentAuthorMostLikes = map[blog.author]
    }
  })

  return { author: currentAuthor, likes: currentAuthorMostLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}