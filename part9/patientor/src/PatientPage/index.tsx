import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Header,
  Segment,
  Container,
  Divider,
  Table,
  Icon,
} from "semantic-ui-react";
// import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { useParams } from "react-router";

const getGenderIcon = (gender: string): JSX.Element => {
  if (gender === "male") return <Icon name="mars" />;
  else if (gender === "female") return <Icon name="venus" />;
  else return <Icon name="genderless" />;
};
const EntryDetails: React.FC<{ entry: Entry; diagnosis: Diagnosis[] }> = ({
  entry,
  diagnosis,
}) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Segment>
          <Header as="h3">
            {entry.date} <Icon name="user doctor" />
          </Header>
          <Divider />
          <p>
            <i>{entry.description}</i>
          </p>
          <ul>
            {entry?.diagnosisCodes?.map((code: string, index: number) => (
              <li key={index}>
                {code}{" "}
                {diagnosis
                  ? (
                      diagnosis.find((d: Diagnosis) => d.code === code) || {
                        name: "",
                      }
                    ).name
                  : ""}
              </li>
            ))}
          </ul>
        </Segment>
      );
    case "OccupationalHealthcare":
      return (
        <Segment>
          <Header as="h3">
            {entry.date} <Icon name="treatment" />
          </Header>
          <Divider />
          <p>
            <i>{entry.description}</i>
          </p>
          <ul>
            {entry?.diagnosisCodes?.map((code: string, index: number) => (
              <li key={index}>
                {code}{" "}
                {diagnosis
                  ? (
                      diagnosis.find((d: Diagnosis) => d.code === code) || {
                        name: "",
                      }
                    ).name
                  : ""}
              </li>
            ))}
          </ul>
        </Segment>
      );
    case "HealthCheck":
      return (
        <Segment>
          <Header as="h3">
            {entry.date} <Icon name="first aid" />
          </Header>
          <Divider />
          <p>
            <i>{entry.description}</i>
          </p>
          <ul>
            {entry?.diagnosisCodes?.map((code: string, index: number) => (
              <li key={index}>
                {code}{" "}
                {diagnosis
                  ? (
                      diagnosis.find((d: Diagnosis) => d.code === code) || {
                        name: "",
                      }
                    ).name
                  : ""}
              </li>
            ))}
          </ul>
        </Segment>
      );
    default:
      return <></>;
  }
};
const PatientPage: React.FC = () => {
  const [, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

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
        setError(JSON.stringify(e));
      }
    };
    void fetchPatientList();

    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosis } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnosis(diagnosis);
      } catch (e) {
        console.error(e);
        setError(JSON.stringify(e));
      }
    };
    void fetchDiagnosis();
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
      <Container>
        <h4>entries</h4>
        {patient.entries.map((entry: Entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            diagnosis={diagnosis || []}
          />
        ))}
      </Container>
    </div>
  );
};

export default PatientPage;
