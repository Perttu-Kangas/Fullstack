/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { updatePatientList, useStateValue } from '../state'
import { apiBaseUrl } from '../constants'
import { Patient } from '../types'

const PatientInfo = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue()
  const { id } = useParams<{ id: string }>()

  if (id === null || id === undefined) {
    return <></>
  }

  const patient = patients[id]

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

  console.log(patient.entries)

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
    </>
  )
}

export default PatientInfo
