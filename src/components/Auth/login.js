import React, { useState } from 'react';
import "./login.css"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props) {
  return (
    <Typography className='agreements' variant="body2" color="text.secondary" align="center" fontSize="11px"  {...props}>
      {' By proceeding, you agree to MakeMyTrips  '}
      <Link color="inherit" href="https://www.makemytrip.com/legal/in/eng/privacy_policy.html">
        privacy Policy,  User Agreement and T&Cs
      </Link>{''}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login({ setToken, showSignUp, setShowSignUp }) {

  // const [tokenChange, setTokenChange] = useState(false);

  const [name, setName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        {
          method: "POST",
          headers: {
            projectID: "cr81p0a2xrtw",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            appType: 'bookingportals'
          }),
        }
      );
      if (!response.ok) {
        alert("Please Signup");
        return;
      }
      const newData = await response.json();
      console.log("newData", newData);
      const token = newData.token;
      localStorage.setItem("authToken", JSON.stringify(token));
      setShowSignUp(false);
    } catch (error) {
      alert(error);
    }
  };




  const [signInUp, setSignInUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        {
          method: "POST",
          headers: {
            projectID: "cr81p0a2xrtw",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            appType: 'bookingportals'
          }),
        }
      );
      const newData = await response.json();
      console.log("newData", newData);
      if (newData.status === 'success') {
        const token = newData.token;
        localStorage.setItem("authToken", JSON.stringify(token));
        setShowSignUp(false)
        setToken(localStorage.getItem("authToken"))
      } else {
        alert("Login or Password incorrect!")
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };


  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    // <Box sx={{display : "flex", justifyContent : "center" , alignItems : "center"}}>
    <ThemeProvider theme={defaultTheme}>

      {signInUp && <Grid className='form' container component="main" sx={{ height: '300px', width: '1000px' }}>
        <CssBaseline />
        <Grid borderRadius="20px"
          item
          xs={false}
          sm={2}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square borderRadius="20px">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <CloseIcon onClick={() => { setShowSignUp(false) }}
              sx={{ position: "relative", top: "-75px", left: "240px", bgcolor: "white", borderRadius: "50px", color: "black", cursor: "pointer" }}
            />

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField onChange={handleUserEmail}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField onChange={handleUserPassword}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button onClick={(e) => { handleSubmit(e) }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container className='cp'>
                <Grid sx={{display: "flex", gap: "10px"}} item >
                  Don't have an account? <Grid sx={{bgcolor : "primary.main", color : "white", p : "2px", borderRadius : "3px", fontSize : "16px", ":hover" : {transform : "scale(1.1)" }}} onClick={() => { setSignInUp(false) }}>Sign Up</Grid>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>}


      {/* -----------------------Sign Up Part------------------------------------------------ */}


      {!signInUp && <Grid className='form' container component="main" sx={{ height: '300px', width: '1000px' }}>
        <CssBaseline />
        <Grid borderRadius="20px"
          item
          xs={false}
          sm={2}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square borderRadius="20px">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField onChange={handleUserEmail}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField onChange={handleName}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Enter Name"
                type="text"
                id="name"
                autoFocus
              />
              <TextField onChange={handleUserPassword}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button onClick={(e) => { handleSignup(e) }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container className='cp'>
                <Grid item className='flex g10'>

                  Aready have an account <Grid sx={{bgcolor : "primary.main", color : "white", p : "2px", borderRadius : "3px", fontSize : "16px", ":hover" : {transform : "scale(1.1)" }}} onClick={() => { setSignInUp(true) }} >Sign In</Grid>

                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>}
    </ThemeProvider>
    // </Box>
  );
}