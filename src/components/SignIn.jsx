import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  signin: {
    color: theme.colors.textWhite,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
    margin: 5,
    textAlign: 'center',
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signin}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
