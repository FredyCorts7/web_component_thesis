import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#3c3c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#4b4b4b',
    },
  },
  textArea: {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: '#e0e0e0',
    padding: 10,
    fontSize: 16,
    border: 'none',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: '1px solid #4b4b4b',
    '&:focus': {
      outline: 'none',
    },
  },
}));
