import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  create: {
    color: theme.colors.textWhite,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 10,
    margin: 5,
    textAlign: 'center',
  },
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput
        name='password2'
        placeholder='Password confirmation'
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.create}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username has to be between 1 and 30')
    .max(30, 'Username has to be between 1 and 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password has to be between 5 and 50')
    .max(50, 'Password has to be between 5 and 50'),
  password2: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], "Passwords don't match"),
})

const initialValues = {
  username: '',
  password: '',
  password2: '',
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await mutate({
        variables: {
          user: {
            username,
            password,
          },
        },
      })

      await signIn({ username, password })
      navigate(`/`)
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
