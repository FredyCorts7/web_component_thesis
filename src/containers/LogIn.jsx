import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from '../hooks/styles/Login';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  BackspaceRounded,
  CheckCircleRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@material-ui/icons';

import { useForm } from '../hooks/useForm';
import {
  startDictionaryRead,
  startLogIn,
} from '../actions/authentication.action';
import { startLoading } from '../actions/ui.action';
import { ItemDictionary } from '../components/ItemDictionary';

export const LogIn = () => {
  const history = useHistory();
  const classes = useStyles();

  const {
    isAuthenticated,
    dictionary: { alphabet, numbers },
  } = useSelector((state) => state.authenticationReducer);
  const { showBackdrop } = useSelector((state) => state.uiReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    dispatch(startDictionaryRead());
  }, [dispatch]);

  const buttonNumbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  const [values, setValues] = useState({
    showPassword: false,
    showNumberKeyboard: false,
  });

  const handleLogIn = () => {
    dispatch(startLoading());
    dispatch(startLogIn(email, password, history));
  };

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <Grid container component='main' className={classes.root}>
      <Backdrop className={classes.backdrop} open={showBackdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        md={7}
        component={Paper}
        className={classes.backDark}
        square
      >
        <div className={classes.paper}>
          <Box component='div' mb={4}>
            {alphabet.map(({ original, substitute }) => (
              <ItemDictionary
                original={original}
                substitute={substitute}
                key={original}
              />
            ))}
          </Box>
          <Box component='div'>
            {numbers.map(({ original, substitute }) => (
              <ItemDictionary
                original={original}
                substitute={substitute}
                key={original}
              />
            ))}
          </Box>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} square>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Inicio de Sesión
          </Typography>
          <form className={classes.form}>
            <TextField
              autoComplete='email'
              autoFocus
              variant='outlined'
              margin='normal'
              fullWidth
              data-cy='email'
              label='Correo'
              name='email'
              value={email}
              onChange={handleInputChange}
              onFocus={() => {
                setValues((state) => ({
                  ...state,
                  showNumberKeyboard: false,
                }));
              }}
            />
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='outlined-adornment-password'>
                Contraseña
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                data-cy='password'
                value={password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setValues((state) => ({
                          ...state,
                          showPassword: !values.showPassword,
                        }))
                      }
                      edge='end'
                    >
                      {values.showPassword ? (
                        <VisibilityRounded />
                      ) : (
                        <VisibilityOffRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={85}
                onFocus={() => {
                  setValues((state) => ({
                    ...state,
                    showNumberKeyboard: true,
                  }));
                }}
              />
            </FormControl>
            {values.showNumberKeyboard && (
              <Grid
                container
                justify='center'
                className={classes.containerNumericKeyboard}
              >
                {buttonNumbers.map((number) => (
                  <Grid
                    item
                    xs={4}
                    key={number}
                    className={classes.containerButtonNumber}
                  >
                    <Button
                      variant='contained'
                      data-cy={`nk-btn-${number}`}
                      className={classes.buttonNumber}
                      onClick={() => {
                        const value = `${password}${number}`;
                        handleInputChange({
                          target: { name: 'password', value },
                        });
                      }}
                    >
                      {number}
                    </Button>
                  </Grid>
                ))}
                <Button
                  variant='contained'
                  startIcon={<BackspaceRounded />}
                  className={classes.button}
                  onClick={() => {
                    const value = `${password.slice(0, password.length - 1)}`;
                    handleInputChange({
                      target: { name: 'password', value },
                    });
                  }}
                >
                  Borrar
                </Button>
              </Grid>
            )}
            <Button
              variant='contained'
              startIcon={<CheckCircleRounded />}
              className={classes.button}
              fullWidth
              data-cy='btn-login'
              onClick={handleLogIn}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
