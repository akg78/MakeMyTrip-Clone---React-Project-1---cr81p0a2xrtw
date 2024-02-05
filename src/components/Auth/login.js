// const login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "https://academics.newtonschool.co/api/v1/bookingportals/login",
//         {
//           method: "POST",
//           headers: {
//             projectID: "cr81p0a2xrtw",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//               email: email,
//               password: password,
//               appType: 'bookingportals' 
//           }),

//         }
//       );
//       const newData = await response.json();
//       console.log("newData", newData);
//       const { token = "" } = newData;
//       localStorage.setItem("authToken", token);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const handleUserEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleUserPassword = (e) => {
//     setPassword(e.target.value);
//   };

//   return (
//     <div className="form">
//       <form onSubmit={handleSubmit}>
//         <label>Email</label><br/>
//         <input value={email} type="email" onChange={handleUserEmail} /><br/>
//         <label>PassWord</label><br/>
//         <input name="password" type="password" onChange={handleUserPassword} /><br/>
//         <button type="submit">Create </button>
//       </form>
//     </div>
//   );
// };

// export default login;


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

export default function login() {
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
      const { token = "" } = newData;
      localStorage.setItem("authToken", token);
    } catch (error) {
      alert(error);
    }
  };

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setPassword(e.target.value);
  };

  return (

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
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container className='cp'>
                <Grid item onClick={() => { setSignInUp(false), console.log("hi") }}>

                  {"Don't have an account? Sign Up"}

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
              <TextField onChange={handleUserPassword}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Create Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item onClick={() => { setSignInUp(true), console.log("hi") }}>

                  {"Aready have an account Sign In"}

                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>}
    </ThemeProvider>
  );
}