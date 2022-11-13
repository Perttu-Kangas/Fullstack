import patients from '../../data/patients'
import { v1 as uuid } from 'uuid'

import { NewPatient, PublicPatient, Patient } from '../types'

const getPatients = (): Array<Patient> => {
  return patients
}

const getPublicPatients = (): PublicPatient[] => {
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
    entries: [],
  }

  patients.push(newPatient)
  return newPatient
}

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id)
  return entry
}

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  findById,
}
