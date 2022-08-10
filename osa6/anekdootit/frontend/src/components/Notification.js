import { useSelector, useDispatch } from 'react-redux'
import { hideNotification } from '../reducers/notificationReducer'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()
  if (notification !== '') {
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {notification !== ''
        ? <>
          <div style={style}>
            {notification}
          </div>
          <br></br>
        </>
        : <></>
      }
    </>
  )
}

export default Notification