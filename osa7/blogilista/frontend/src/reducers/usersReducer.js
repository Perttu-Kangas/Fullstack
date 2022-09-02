import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    clearUsers() {
      return initialState
    },
  },
})

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const { setUsers, clearUsers } = usersSlice.actions
export default usersSlice.reducer
