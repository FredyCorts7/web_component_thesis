import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { CheckCircleRounded } from '@material-ui/icons';
import Swal from 'sweetalert2';
import { useStyles } from '../hooks/styles/InscriptionCreate';

import { setTitleNavbar } from '../actions/ui.action';
import {
  startAveragesLoaded,
  startInscriptionCreate,
} from '../actions/inscription.action';
import { useForm } from '../hooks/useForm';
import { isAuthorized } from '../helpers/authorization.helper';

export const InscriptionCreate = () => {
  const classes = useStyles();

  const { averages, sisbens, populations } = useSelector(
    (state) => state.inscriptionReducer
  );
  const {
    user: { roles },
  } = useSelector((state) => state.authenticationReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAveragesLoaded());
    dispatch(setTitleNavbar('Realizar Inscripción'));
  }, [dispatch]);

  const [formValues, handleChange] = useForm({
    sisbenId: 0,
    averageId: 0,
    populationId: 0,
  });

  const { sisbenId, averageId, populationId } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value } = await Swal.fire({
      title: 'Responder',
      text: '¿Acepta realizar la inscripción?',
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (value) dispatch(startInscriptionCreate(formValues));
  };

  if (!isAuthorized(['estudiante'], roles))
    return <Redirect to='/dashboard/home' />;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} component='form' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Puntaje sisben
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                name='sisbenId'
                value={sisbenId}
                onChange={handleChange}
              >
                <MenuItem key={0} value={0}>
                  Seleccionar...
                </MenuItem>
                {sisbens.map(({ id, value }) => (
                  <MenuItem key={id} value={id}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Promedio ponderado
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                name='averageId'
                value={averageId}
                onChange={handleChange}
              >
                <MenuItem key={0} value={0}>
                  Seleccionar...
                </MenuItem>
                {averages.map(({ id, value }) => (
                  <MenuItem key={id} value={id}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-filled-label'>
                Población vulnerable
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                name='populationId'
                value={populationId}
                onChange={handleChange}
              >
                <MenuItem key={0} value={0}>
                  Seleccionar...
                </MenuItem>
                {populations.map(({ id, value }) => (
                  <MenuItem key={id} value={id}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
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
                Inscribirse
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};
