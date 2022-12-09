import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: theme.colors.textPrimary,
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
})

const TextInput = ({ error, ...props }) => {
  return <NativeTextInput style={styles.inputContainer} {...props} />
}

export default TextInput
