const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  const notificaitonStyle = {
    color: props.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div className="notification" style={notificaitonStyle}>{props.notification}</div>
}

export default Notification