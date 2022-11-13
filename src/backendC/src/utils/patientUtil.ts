import { NewPatient, Gender, Entry, NewEntry } from '../types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing string')
  }

  return comment
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): param is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return param.type !== undefined && param.type !== null
}

export const toEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries)
  }

  entries.forEach((element) => {
    if (!isEntry(element)) {
      throw new Error('Incorrect or missing entries: ' + entries)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entries
}

type Fields = {
  name: unknown
  dateOfBirth: unknown
  ssn: unknown
  gender: unknown
  occupation: unknown
}

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  }

  return newEntry
}

type FieldsDia = {
  description: unknown
  date: unknown
  specialist: unknown
}

export const toNewEntry = ({
  description,
  date,
  specialist,
}: FieldsDia): NewEntry => {
  const newEntrys: NewEntry = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
  }

  return newEntrys
}
