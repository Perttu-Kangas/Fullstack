/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { updatePatientList, useStateValue } from '../state'
import { apiBaseUrl } from '../constants'
import { BaseEntry, Patient } from '../types'
import { EntryFormValues } from './AddEntryForm'
import AddPatientModal from '../AddPatientModal'

const PatientInfo = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue()
  const { id } = useParams<{ id: string }>()

  if (id === null || id === undefined) {
    return <></>
  }

  const patient = patients[id]

  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatientEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/`,
        values
      )
      dispatch(updatePatientList(newPatientEntry))
      closeModal()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )

        dispatch(updatePatientList(patientListFromApi))
      } catch (e) {
        console.error(e)
      }
    }

    if (!patient || !patient.ssn || !patient.entries) {
      void fetchPatientList()
    }
  }, [patient])

  if (!patient) {
    return <></>
  }

  if (!patient.entries) {
    return (
      <>
        <h2>{patient.name}</h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </>
    )
  }

  return (
    <>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <>
          {entry.date}
          {entry.description}
          {entry.diagnosisCodes ? (
            <ul>
              {entry.diagnosisCodes.map((d) => (
                <li key={d}>
                  {d} {diagnoses[d].name}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </>
      ))}
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </>
  )
}

export default PatientInfo
