const { Blog, User } = require('./models')

async function dropTables() {
  await Blog.drop()
  await User.drop()
  console.log("Dropped blogs and users")
}

dropTables()