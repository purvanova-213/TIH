import { useCallback, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Typography,
  MenuItem,
} from "@mui/material";
import { Layout } from "../Components/Dashboard/layout.jsx";
import { app } from "./../config/firebase.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const sections = [
  {
    title: "Master Data",
    fields: [
      {
        label: "Patient Record Number",
        name: "patientRecordNumber",
        type: "text",
      },
      { label: "First Name", name: "firstName", type: "text" },
      { label: "Last Name", name: "lastName", type: "text" },
      { label: "Date of Birth", name: "dateOfBirth", type: "date" },
      { label: "Sex", name: "sex", type: "text" },
    ],
  },
  {
    title: "Address",
    fields: [
      { label: "Address 1", name: "address1", type: "text" },
      { label: "Address 2", name: "address2", type: "text" },
      { label: "Pin", name: "pin", type: "text" },
      { label: "City", name: "city", type: "text" },
      { label: "State", name: "state", type: "text" },
    ],
  },
  {
    title: "Medical Information",
    fields: [
      { label: "Skin Type", name: "skinType", type: "text" },
      { label: "Study", name: "study", type: "text" },
      { label: "Comorbadilies", name: "comorbadilies", type: "text" },
      { label: "Diet", name: "diet", type: "text" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { label: "Mobile Number", name: "mobileNumber", type: "number" },
      { label: "Email", name: "email", type: "email" },
    ],
  },
];

export const PatientProfileDetails = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const db = getFirestore(app);
  useEffect(() => {
    const fetchTotalPatients = async () => {
      const querySnapshot = await getDocs(collection(db, "patient"));
      setTotalPatients(querySnapshot.docs.length);
    };
    fetchTotalPatients();
  }, [db]);

  const formik = useFormik({
    initialValues: {
      patientRecordNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      sex: "",
      address1: "",
      address2: "",
      pin: "",
      city: "",
      state: "",
      skinType: "",
      study: "",
      diet: "",
      comorbadilies: "",
      mobileNumber: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      patientRecordNumber: Yup.number().required(
        "Patient Record Number is required"
      ),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      dateOfBirth: Yup.date().required("Date of Birth is required"),
      sex: Yup.string().required("Gender is required"),
      address1: Yup.string().required("Address 1 is required"),
      address2: Yup.string(),
      pin: Yup.string()
        .required("Pin Code is required")
        .matches(/^\d{6}$/, "Pin Code must be a 6-digit number"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      skinType: Yup.string(),
      study: Yup.string(),
      comorbadilies: Yup.string().required("Comorbidities is required"),
      diet: Yup.string(),
      mobileNumber: Yup.string()
        .required("Mobile Number is required")
        .matches(/^\d{10}$/, "Mobile Number must be a 10-digit number"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const now = new Date();
      try {
        const result = await addDoc(collection(db, "patient"), {
          patientRecordNumber: values.patientRecordNumber,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          sex: values.sex,
          address1: values.address1,
          address2: values.address2,
          pin: values.pin,
          city: values.city,
          state: values.state,
          skinType: values.skinType,
          study: values.study,
          diet: values.diet,
          comorbadilies: values.comorbadilies,
          mobileNumber: values.mobileNumber,
          email: values.email,
          createdAt: now,
          updatedAt: now,
          status: "Active",
        });

        useEffect(() => {
          formik.setFieldValue("patientRecordNumber", totalPatients + 1, false);
        }, [totalPatients, formik]);

        console.log("Document written with ID: ", result.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (totalPatients > 0) {
      formik.setValues({
        ...formik.values,
        patientRecordNumber: totalPatients + 1,
      });
    }
  }, [totalPatients, formik]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <title>New Patient</title>
      <Layout>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Typography
            sx={{ marginLeft: { xs: 0, lg: 30 }, mb: 3 }}
            gutterBottom
            variant="h5"
            component="div"
          >
            New Examination
          </Typography>
          <Card sx={{ marginLeft: { xs: 0, lg: 30 } }}>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                {sections.map((section) => (
                  <Box key={section.title} sx={{ mb: 2 }}>
                    <CardHeader
                      subheader={`Enter ${section.title} details`}
                      title={section.title}
                    />
                    <Grid container spacing={3}>
                      {section.fields.map((field) => (
                        <Grid xs={12} md={6} key={field.name}>
                          {field.name === "sex" ? (
                            <TextField
                              select
                              fullWidth
                              label={field.label}
                              name={field.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              value={formik.values[field.name]}
                              error={
                                formik.touched[field.name] &&
                                Boolean(formik.errors[field.name])
                              }
                              helperText={
                                formik.touched[field.name] &&
                                formik.errors[field.name]
                              }
                            >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                            </TextField>
                          ) : field.name === "dateOfBirth" ? (
                            <TextField
                              fullWidth
                              label={field.label}
                              name={field.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              type={field.type}
                              value={formik.values[field.name]}
                              error={
                                formik.touched[field.name] &&
                                Boolean(formik.errors[field.name])
                              }
                              helperText={
                                formik.touched[field.name] &&
                                formik.errors[field.name]
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          ) : field.name === "comorbadilies" ? (
                            <TextField
                              select
                              fullWidth
                              label={field.label}
                              name={field.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              value={formik.values[field.name]}
                              error={
                                formik.touched[field.name] &&
                                Boolean(formik.errors[field.name])
                              }
                              helperText={
                                formik.touched[field.name] &&
                                formik.errors[field.name]
                              }
                            >
                              <MenuItem value="anaemia">Anaemia</MenuItem>
                              <MenuItem value="hypothyroidism">
                                Hypothyroidism
                              </MenuItem>
                              <MenuItem value="hyperthyroidism">
                                Hyperthyroidism
                              </MenuItem>
                              <MenuItem value="pcos">PCOS</MenuItem>
                              <MenuItem value="diabetes">Diabetes</MenuItem>
                              <MenuItem value="hodiseases">
                                H/O Diseases
                              </MenuItem>
                            </TextField>
                          ) : field.name === "diet" ? (
                            <TextField
                              select
                              fullWidth
                              label={field.label}
                              name={field.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              value={formik.values[field.name]}
                              error={
                                formik.touched[field.name] &&
                                Boolean(formik.errors[field.name])
                              }
                              helperText={
                                formik.touched[field.name] &&
                                formik.errors[field.name]
                              }
                            >
                              <MenuItem value="veg">Vegetarian</MenuItem>
                              <MenuItem value="nonveg">Non-Vegetarian</MenuItem>
                            </TextField>
                          ) : field.name === "patientRecordNumber" ? (
                            <TextField
                              fullWidth
                              label="Patient Record Number"
                              name="patientRecordNumber"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              InputProps={{
                                readOnly: true, 
                              }}
                              value={formik.values.patientRecordNumber}
                              error={
                                formik.touched.patientRecordNumber &&
                                Boolean(formik.errors.patientRecordNumber)
                              }
                              helperText={
                                formik.touched.patientRecordNumber &&
                                formik.errors.patientRecordNumber
                              }
                            />
                          ) : (
                            <TextField
                              fullWidth
                              label={field.label}
                              name={field.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              type={field.type}
                              value={formik.values[field.name]}
                              error={
                                formik.touched[field.name] &&
                                Boolean(formik.errors[field.name])
                              }
                              helperText={
                                formik.touched[field.name] &&
                                formik.errors[field.name]
                              }
                            />
                          )}
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained">
                Save details
              </Button>
            </CardActions>
          </Card>
        </form>
      </Layout>
    </>
  );
};
