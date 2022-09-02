import { useSelector } from 'react-redux'

import UserListUser from './UserListUser'

const UserList = () => {
  const users = useSelector(state => state.users)

  return <div id='users'>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <UserListUser
            key={user.id}
            user={user}
          />
        )}

      </tbody>
    </table>
  </div>
}

export default UserList