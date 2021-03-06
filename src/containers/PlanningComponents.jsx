import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import Swal from 'sweetalert2';
import { useStyles } from '../hooks/styles/InscriptionCreate';

import { useForm } from '../hooks/useForm';
import { setTitleNavbar } from '../actions/ui.action';
import { startComponentCreate } from '../actions/planning.action';
import { isAuthorized } from '../helpers/authorization.helper';

export const PlanningComponents = () => {
  const classes = useStyles();

  const {
    user: { roles },
  } = useSelector((state) => state.authenticationReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitleNavbar('Registrar Componente'));
  }, [dispatch]);

  const [formValues, handleInputChange, reset] = useForm({
    name: '',
    description: '',
  });

  const { name, description } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value } = await Swal.fire({
      title: 'Responder',
      text: '¿Acepta registrar este componente?',
      showCancelButton: true,
      showConfirmButton: true,
    });
    if (value) dispatch(startComponentCreate(formValues, reset));
  };

  if (!isAuthorized(['nutricionista', 'administrador'], roles))
    return <Redirect to='/dashboard/home' />;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} component='form' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <TextField
                id='filled-basic'
                label='Nombre del componente alimenticio'
                variant='filled'
                name='name'
                value={name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <TextareaAutosize
                className={classes.textArea}
                aria-label='empty textarea'
                placeholder='Descripción del componente alimenticio'
                rowsMin={6}
                name='description'
                value={description}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <Button
                type='submit'
                variant='contained'
                className={classes.button}
                startIcon={<CheckCircleRounded />}
              >
                Registrar
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};
