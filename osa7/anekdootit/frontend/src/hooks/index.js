import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const noReset = (props) => {
    return {
      type: props.type,
      value: props.value,
      onChange: props.onChange
    }
  }

  return {
    type,
    value,
    onChange,
    reset,
    noReset
  }
}