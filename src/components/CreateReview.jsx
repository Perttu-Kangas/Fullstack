import Text from './Text'
import FormikTextInput from './FormikTextInput'
import { Pressable, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import theme from '../theme'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput name='text' placeholder='Review' />
      <Pressable onPress={onSubmit}>
        <Text style={styles.create}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating has to be between 0 and 100')
    .max(100, 'Rating has to be between 0 and 100')
    .required('Rating is required'),
  text: yup.string().optional(),
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: '',
}

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const payload = await mutate({
        variables: {
          review: {
            ...values,
            rating: parseInt(values.rating),
          },
        },
      })
      const { data } = payload
      navigate(`/repository/${data.createReview.repository.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <ReviewContainer onSubmit={onSubmit} />
}

export default CreateReview
