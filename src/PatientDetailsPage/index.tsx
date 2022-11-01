import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Patient } from "../types";
import { useParams } from "react-router-dom";

const PatientListPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  const GetPatient = async () => { 
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    setPatient(response.data);
  };

  const GetDiagnoses = async () => { 
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    setDiagnoses(response.data);
  };

  useEffect(() => { void GetPatient(); void GetDiagnoses(); }, []);

  return (
    <div className="App">
      {patient && (
        <>
          <h1>
            {patient.name}
          </h1>
          <p>ssn: {patient.ssn}</p>
          <p>{patient.occupation}</p>
          
          <h2>entries</h2>
          {patient.entries.map((e) => (
            <div 
              key={e.id}
              style={{ border: '1px solid black', borderRadius: '1rem', padding: "1rem", marginBlock: '1rem' }}
            >
              <p>{e.date}</p>
              <p><i>{e.description}</i></p>
              <div>
                {e.diagnosisCodes?.map((dc) => (
                  <div 
                    key={`${e.id} ${dc}`}
                  >{dc} {diagnoses?.find((dg) => dg.code === dc)?.name}</div>
                ))}
              </div>
              <p>Diagnose By: {e.specialist}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PatientListPage;
