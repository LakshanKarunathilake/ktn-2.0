import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import routes from '../../constants/routes.json';
import { LoginView } from '../../models/User';
import UserService from '../../services/user';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href="https://lakshankarunathilake.github.io">Lakshan Karunathilake</a>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props: {
  updateForm: (key: string, value: string, form: string) => void;
  loginForm: LoginView;
  history: any;
}) {
  console.log('props', props);
  const { updateForm, loginForm, history } = props;
  const classes = useStyles();

  const loginAction = (loginView: LoginView) => {
    UserService.loginUser(loginView)
      .then(logged => {
        if (logged) {
          history.push('/home');
          return swal('Login', 'You have successfully logged in', 'success');
        }
        return swal('Login', 'Check your username and password again', 'error');
      })
      .catch((e: any) => {
        console.log('error', e);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(event: any) => {
              updateForm('username', event.target.value, 'LOGIN');
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event: any) => {
              updateForm('password', event.target.value, 'LOGIN');
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => loginAction(loginForm)}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <a href={'#'}>Forgot password?</a>
            </Grid>
            <Grid item>
              <Link to={routes.SIGNUP}>Register New User</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
