import React, { useState, useEffect } from 'react';
import { Paper, Box, Grid, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTitleAsync, fetchStudentGroupAsync, titleSubmissionAsync, fetchStudentGroupSuccess } from '../Redux/StudentAction';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  lineHeight: '60px'
}));

// const darkTheme = createTheme({palette: {mode: 'dark'}});
const lightTheme = createTheme({palette: {mode: 'light'}});

const ProjectTitleSubmission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { group, titles, fetchTitleSuccess, titleSubmissionSuccess } = useSelector((state) => state.student);
  const [index, setIndex] = useState(1);
  
  useEffect(() => {
    dispatch(fetchStudentGroupAsync());
  }, [dispatch]);

  useEffect(() => {
    if(group.length > 0 && fetchStudentGroupSuccess){
      console.log('i donth know why...');
      dispatch(fetchTitleAsync(group[0].id));
    }
  }, [dispatch, group]);

  useEffect(() => {
    if(fetchTitleSuccess){
      setIndex(titles.length + 1);
    }
  }, [fetchTitleSuccess]);

  useEffect(() => {
    if(index > 3){
      navigate('/student/submission');
    }
  }, [index]);

  const ProposalSubmissionSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required*'),
    description: Yup.string().min(10, 'Too Short!').max(1000, 'Too Long!').required('Required*')
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '' 
    },
    validationSchema: ProposalSubmissionSchema,
    onSubmit: (values, {setSubmitting}) => {
      console.log('I dont know why, but', values);
      console.log(group);
      dispatch(titleSubmissionAsync(group[0].id, {no: index, title_name: values.title, title_description: values.description}));
      dispatch(fetchTitleAsync());
      if(titleSubmissionSuccess){
        values.title = '';
        values.description = '';
        setIndex(index + 1);
      }
      setSubmitting(false);
    }
  });

  const {values, touched, errors, isSubmitting, handleSubmit, getFieldProps} = formik;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} key={index}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{p: 2, bgColor: 'background.default'}}
          >
            <Item elevation={3} sx={{p: 2}}>
              <FormikProvider value={formik} >
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Typography variant="h6" sx={{marginBottom: '1em'}}>{`Project Proposal Title: ${index}`}</Typography>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    name="title"
                    value={values.title}
                    {...getFieldProps('title')} 
                    variant="outlined" 
                    sx={{marginBottom: '2em', width: '100%'}} 
                    label="Project Title" 
                    size="small"/>
                  <Typography variant="h6" sx={{marginBottom: '1em'}}>{`Project Proposal Description: ${index}`}</Typography>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    name="description"
                    value={values.description}
                    {...getFieldProps('description')}
                    multiline 
                    label="Project Proposal" 
                    sx={{width: "100%", marginBottom: '2em'}} />
                  <div style={{textAlign: "right"}}>
                    <Button variant="contained" type="submit" disabled={isSubmitting}>
                      <Typography variant="overline" sx={{fontWeight: 'bold'}}>Submit</Typography>
                    </Button>
                  </div>
                </Form>
              </FormikProvider>
            </Item>
          </Box>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default ProjectTitleSubmission;


// const handleNext = () => {
//   if(index <= titles.length){
//     setState({title: titles[index-1], description: descriptions[index-1]});
//     // setTitles();
//   }else{
//     setTitles(title => [...title, state.title]);
//     setDescriptions(desc => [...desc, state.description]);
//     setState({title: '', description: ''});
//   }
//   setIndex(index + 1);
// }
// const handlePrev = () => {
//   if(index-1 <= titles.length){
//     setState({title: titles[index-2], description: descriptions[index-2]});
//   }
//   setTitles(title => [...title, state.title]);
//   setDescriptions(desc => [...desc, state.description]);
//   // setState({title: '', description: ''});
//   setIndex(index - 1);
// }
// const handleChange = (e) => {
//   setState({...state, [e.target.name]: e.target.value});
// }
// const handleSubmit = (e) => {
//   e.preventDefault();
//   setTitles(title => [...title, state.title]);
//   setDescriptions(desc => [...desc, state.description]);
// }