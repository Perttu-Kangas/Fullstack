import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    }, hideNotification(state, action) {
      return ''
    }
  },
})

export const notification = content => {
  return dispatch => {
    dispatch(showNotification(content.notification))
    setTimeout(() => {
      dispatch(hideNotification())
    }, content.time * 1000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer