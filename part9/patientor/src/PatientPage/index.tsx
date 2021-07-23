import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Icon } from "semantic-ui-react";
// import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { useParams } from "react-router";

const getGenderIcon = (gender: string): JSX.Element => {
  if (gender === "male") return <Icon name="mars" />;
  else if (gender === "female") return <Icon name="venus" />;
  else return <Icon name="genderless" />;
};
const PatientPage: React.FC = () => {
  const [, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFromApi);
      } catch (e) {
        console.error(e);
        setError(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  if (!patient) return <></>;
  return (
    <div className="App">
      {error ? <p>{error}</p> : <></>}
      <Container textAlign="center">
        <h3>
          {patient.name} {getGenderIcon(patient.gender)}
        </h3>
      </Container>
      <Table celled>
        <Table.Body>
          <Table.Row key={patient.id}>
            <Table.Cell>{patient.name}</Table.Cell>
            <Table.Cell>ssn: {patient.ssn}</Table.Cell>
            <Table.Cell>{patient.gender}</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
            <Table.Cell>
              <HealthRatingBar showText={false} rating={1} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default PatientPage;
