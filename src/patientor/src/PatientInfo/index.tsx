import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { updatePatientList, useStateValue } from '../state'
import { apiBaseUrl } from '../constants'
import { Patient } from '../types'

const PatientInfo = () => {
  const [{ patients }, dispatch] = useStateValue()
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

    if (!patient.ssn) {
      void fetchPatientList()
    }
  }, [id])

  if (!patient) {
    return <></>
  }

  return (
    <>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  )
}

export default PatientInfo
