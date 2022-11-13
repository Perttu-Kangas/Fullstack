import patients from '../../data/patients'
import { v1 as uuid } from 'uuid'

import { NewPatient, NonSensitivePatient, Patient } from '../types'

const getPatients = (): Array<Patient> => {
  return patients
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  }

  patients.push(newPatient)
  return newPatient
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
}
