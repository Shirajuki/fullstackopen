import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Header,
  Modal,
  Segment,
  Container,
  Divider,
  Table,
  Icon,
  Button,
  Grid,
} from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { Patient, Entry, EntryAll, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, setDiagnosisList } from "../state";
import { useParams } from "react-router";
import {
  DiagnosisSelection,
  TextField,
  NumberField,
  SelectField,
  TypeOption,
} from "../AddPatientModal/FormField";

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
const typeOption: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
];
interface IProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryAll) => void;
  error?: string;
}
interface ErrorType {
  [field: string]: ErrorType | string | undefined;
  discharge?: ErrorType;
  sickLeave?: ErrorType;
}
const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: IProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry for patient</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Formik
          initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            type: "HealthCheck",
            healthCheckRating: 0,

            discharge: { date: "", criteria: "" },

            employerName: "",
            sickLeave: { startDate: "", endDate: "" },
          }}
          onSubmit={onSubmit}
          validate={(values) => {
            const requiredError = "Field is required";
            const errors: ErrorType = {};
            if (values.description === "") errors.description = requiredError;
            if (values.date === "") errors.date = requiredError;
            if (values.specialist === "") errors.specialist = requiredError;
            if (values.type === "HealthCheck") {
              if (values.healthCheckRating < 0 || values.healthCheckRating > 3)
                errors.healthCheckRating = requiredError;
            } else if (values.type === "Hospital") {
              errors.discharge = {};
              if (values.discharge.date === "")
                errors.discharge.date = requiredError;
              if (values.discharge.criteria === "")
                errors.discharge.criteria = requiredError;
              if (
                Object.values(errors).length === 1 &&
                Object.values(errors.discharge).length === 0
              )
                return {};
            } else if (values.type === "OccupationalHealthcare") {
              errors.sickLeave = {};
              if (values.employerName === "")
                errors.employerName = requiredError;
              if (values.sickLeave.startDate === "")
                errors.sickLeave.startDate = requiredError;
              if (values.sickLeave.endDate === "")
                errors.sickLeave.endDate = requiredError;
              if (
                Object.values(errors).length === 1 &&
                Object.values(errors.sickLeave).length === 0
              )
                return {};
            }
            return errors;
          }}
        >
          {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="Date"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <SelectField label="Type" name="type" options={typeOption} />
                {values.type === "HealthCheck" ? (
                  <Field
                    label="healthCheckRating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={0}
                    max={3}
                  />
                ) : (
                  <></>
                )}
                {values.type === "Hospital" ? (
                  <>
                    <Field
                      label="Discharge date"
                      placeholder="Discharge date"
                      name="discharge.date"
                      component={TextField}
                    />
                    <Field
                      label="Discharge criteria"
                      placeholder="Discharge criteria"
                      name="discharge.criteria"
                      component={TextField}
                    />
                  </>
                ) : (
                  <></>
                )}
                {values.type === "OccupationalHealthcare" ? (
                  <>
                    <Field
                      label="Employer name"
                      placeholder="Employer name"
                      name="employerName"
                      component={TextField}
                    />
                    <Field
                      label="Sick leave start date"
                      placeholder="Sick leave start date"
                      name="sickLeave.startDate"
                      value={values.sickLeave.startDate}
                      component={TextField}
                    />
                    <Field
                      label="Sick leave end date"
                      placeholder="Sick leave start date"
                      name="sickLeave.endDate"
                      component={TextField}
                    />
                  </>
                ) : (
                  <></>
                )}
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onClose} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};
const PatientPage: React.FC = () => {
  const [{ diagnoses: diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const [rerender, setRerender] = useState<boolean>(false);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  useEffect(() => {
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
  }, [dispatch, rerender]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosis } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosis));
      } catch (e) {
        console.error(e);
        setError(JSON.stringify(e));
      }
    };
    void fetchDiagnosis();
  }, [dispatch]);

  const submitNewEntry = async (values: EntryAll) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: { id, entry: newEntry } });
      closeModal();
      setRerender(true);
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

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
            diagnosis={Object.values(diagnosis) || []}
          />
        ))}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Divider />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PatientPage;
