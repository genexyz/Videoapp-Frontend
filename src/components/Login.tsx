import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

interface User {
  email?: string;
  password?: string;
}

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<User>({});
  let navigate = useNavigate();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (!!errors[name as keyof User])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const findFormErrors = () => {
    const { email, password } = user;

    const newErrors: User = {};
    if (!email || email === "") newErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(email)) newErrors.email = "Invalid email address";
    if (!password || password === "") newErrors.password = "Password is required";
    else if (!PASSWORD_REGEX.test(password))
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`;

    return newErrors;
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        const body = {
          ...user,
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.status === 200) {
          toast.success("Sign in successful!");
          console.log(data);
          storeData(data.token, data.refreshToken, JSON.stringify(data.user));
          navigate("/");
        }
        if (response.status === 401) {
          toast.error("Invalid credentials!");
          console.log(data);
        }
        if (response.status === 500) {
          toast.error("Server error!");
          console.log(data);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const storeData = (accessToken: string, refreshToken: string, user: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={submitData} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={onInputChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={onInputChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
