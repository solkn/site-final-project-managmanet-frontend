import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Menu, MenuItem, TextField } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import  successToast  from 'src/utils/toastMsg';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { addBatch } from '../../Redux/batch/batchAction';

const MENU_OPTIONS = [
  {
    label: 'Delete',
    icon: 'fluent:delete-16-filled',
    linkTo: '#'
  },
  {
    label: 'Update',
    icon: 'ci:edit',
    linkTo: '#'
  }
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function AddBatch() {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  ////formik

  const LoginSchema = Yup.object().shape({
    batch: Yup.string().required('batch is Empty')
  });

  const formik = useFormik({
    initialValues: {
      batch: '2014'
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log(formik.values.batch);
      dispatch(addBatch({ name: formik.values.batch }));
      setExpanded(false)
    }
  });
  // const { errors, touched, values, handleSubmit, getFieldProps } = Formik;

  ////////////////////////////////
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClosewith = (option) => {
    setAnchorEl(null);
    option === 'Update' ? setExpanded(true) : successToast('#DELETE WILL COME SOON');
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings">
              <MoreVertIcon
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              {MENU_OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  to={option.linkTo}
                  component={RouterLink}
                  onClick={() => handleClosewith(option.label)}
                  sx={{ typography: 'body2', py: 1, px: 2.5 }}
                >
                  <Iconify
                    icon={option.icon}
                    sx={{
                      mr: 2,
                      width: 24,
                      height: 24
                    }}
                  />

                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
        title="Active Batch"
        subheader="2016"
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Add Batch:</Typography>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                autoComplete="batch"
                type="text"
                label="batch"
                name="batch"
                value={formik.values.batch}
                {...formik.getFieldProps('batch')}
                error={Boolean(formik.touched.batch && formik.errors.batch)}
                helperText={formik.touched.batch && formik.errors.batch}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                  <LoadingButton
                    fullWidth
                    color="primary"
                    size="small"
                    type="submit"
                    variant="contained"
                  >
                    Add
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </CardContent>
      </Collapse>
    </Card>
  );
}
