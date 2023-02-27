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
import {
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
// eslint-disable-next-line no-useless-escape
const isValidUrl = (url: string) => /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);

interface User {
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  imageUrl?: string;
  role?: string;
}

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    bio: "",
    imageUrl: "",
    role: "student",
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
    const { email, password, name, bio, imageUrl, role } = user;

    const newErrors: User = {};
    if (!email || typeof email !== "string") newErrors.email = "Email is required";
    if (!password || typeof password !== "string")
      newErrors.password = "Password is required";
    if (!name || typeof name !== "string") newErrors.name = "Name is required";
    if (name.length > 100) newErrors.name = "Name cannot be more than 100 characters";
    if (!EMAIL_REGEX.test(email)) newErrors.email = "Invalid email address";
    if (!PASSWORD_REGEX.test(password))
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and contain at least one letter, one number, and one special character`;
    if (bio && typeof bio !== "string") newErrors.bio = "Bio must be a string";
    if (bio && bio.length > 500) newErrors.bio = "Bio cannot be more than 500 characters";
    if (imageUrl && typeof imageUrl !== "string")
      newErrors.imageUrl = "Image URL must be a string";
    if (imageUrl && !isValidUrl(imageUrl)) newErrors.imageUrl = "Invalid image URL";
    if (role && typeof role !== "string") newErrors.role = "Role must be a string";
    if (role && role !== "student" && role !== "teacher")
      newErrors.role = "Role must be either student or teacher";

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
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        if (response.status === 201) {
          console.log("User Signed Up!");
          console.log(data);
          storeData(data.token, data.refreshToken, JSON.stringify(data.user));
          toast.success("User Signed Up!");
          navigate("/");
        }
        if (response.status === 400) {
          if (data.message === "Email already registered") {
            setErrors({ email: data.message });
          } else {
            setErrors(data);
          }
          toast.error("User not signed up, check errors!");
          console.log(data);
        }
        if (response.status === 401) {
          console.log(data);
          toast.error("Unauthorized!");
        }
        if (response.status === 500) {
          console.log(data);
          toast.error("Server Error!");
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitData} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={user.name}
                onChange={onInputChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="bio"
                name="bio"
                fullWidth
                id="bio"
                label="Bio"
                autoFocus
                multiline
                minRows={3}
                maxRows={10}
                value={user.bio}
                onChange={onInputChange}
                error={Boolean(errors.bio)}
                helperText={errors.bio}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="imageUrl"
                name="imageUrl"
                fullWidth
                id="imageUrl"
                label="Profile Picture URL"
                autoFocus
                value={user.imageUrl}
                onChange={onInputChange}
                error={Boolean(errors.imageUrl)}
                helperText={errors.imageUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={onInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={user.password}
                onChange={onInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="role">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="role-radio-buttons-group-label"
                  defaultValue="student"
                  name="role"
                  value={user.role}
                  onChange={onInputChange}
                >
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                  <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
