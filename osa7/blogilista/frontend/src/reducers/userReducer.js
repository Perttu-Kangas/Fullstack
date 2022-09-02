import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      userService.setUser(user)
      return user
    },
    clearUser() {
      userService.clearUser()
      return initialState
    }
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer