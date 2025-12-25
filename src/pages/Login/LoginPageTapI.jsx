import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPatient, loginSpecialist } from "../../api/auth.api";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, Button, Box, Typography } from "@mui/material";

// validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPageTapI() {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched", // Validate on touch
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log("Login Data TapI :", data);
 
      const res = await loginSpecialist(data.email, data.password);

      if (res.data.message) {
        alert("error!");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Login successful!");
        navigate("/specialist");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };                                                                                                                                                                                               

  return (
 <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        placeholder="test@test.com"
        type="email"
        error={!!errors.email} //!! means convert to boolean **
        helperText={errors.email?.message}
        {...register("email")}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 3 }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
