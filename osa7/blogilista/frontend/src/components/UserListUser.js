import React from 'react'

import { Link } from 'react-router-dom'

const UserListUser = ({ user }) => {
  return (
    <>
      <tr>
        <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
        <th>{user.blogs.length}</th>
      </tr>
    </>
  )
}

export default UserListUser