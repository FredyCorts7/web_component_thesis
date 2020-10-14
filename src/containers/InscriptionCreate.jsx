import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../hooks/styles/InscriptionCreate';
import { setTitleNavbar } from '../actions/ui.action';
import {
  startAveragesLoaded,
  startInscriptionCreate,
  startPopulationsLoaded,
  startSisbensLoaded,
} from '../actions/inscription.action';
import { useForm } from '../hooks/useForm';

export const InscriptionCreate = () => {
  const classes = useStyles();

  const { averages, sisbens, populations } = useSelector(
    (state) => state.inscriptionReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAveragesLoaded());
    dispatch(startSisbensLoaded());
    dispatch(startPopulationsLoaded());
    dispatch(setTitleNavbar('Realizar Inscription'));
  }, [dispatch]);

  const [formValues, handleChange] = useForm({
    sisbenId: 1,
    averageId: 1,
    populationId: 1,
  });

  const { sisbenId, averageId, populationId } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    dispatch(startInscriptionCreate(formValues));
  };

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
                {sisbens.map((sisben) => (
                  <MenuItem key={sisben.id} value={sisben.id}>
                    {sisben.value}
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
                {averages.map((average) => (
                  <MenuItem key={average.id} value={average.id}>
                    {average.value}
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
                {populations.map((population) => (
                  <MenuItem key={population.id} value={population.id}>
                    {population.value}
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
