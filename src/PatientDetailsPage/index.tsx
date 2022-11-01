import { useState, useEffect } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useParams } from "react-router-dom";

const PatientListPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();

  const GetPatient = async () => { 
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    setPatient(response.data);
  };

  useEffect(() => { void GetPatient(); }, []);

  return (
    <div className="App">
      {patient && (
        <>
          <h1>
            {patient.name}
          </h1>
          <p>ssn: {patient.ssn}</p>
          <p>{patient.occupation}</p>
        </>
      )}
    </div>
  );
};

export default PatientListPage;
