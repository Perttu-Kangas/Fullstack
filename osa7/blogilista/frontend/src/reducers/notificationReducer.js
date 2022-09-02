import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: '', taskID: -1, type: 'info' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      if (state.taskID !== -1) {
        clearTimeout(state.taskID)
      }
      return { notification: action.payload.content, taskID: action.payload.taskID, type: action.payload.type }
    },
    hideNotification() {
      return { notification: '', taskID: -1, type: 'info' }
    },
  },
})

export const notification = content => {
  return dispatch => {
    dispatch(showNotification({
      content: content.notification,
      taskID: setTimeout(() => {
        dispatch(hideNotification())
      }, content.time * 1000),
      type: content.type
    }))
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer