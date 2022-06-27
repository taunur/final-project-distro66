import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../redux/userRedux";
import imageLogin from "../../../assets/img_shop.png";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const admin = {
    email: "admin@bukapedia.com",
    password: "admin123",
  };

  const handleLogin = () => {
    dispatch(loginStart());
    if (username === admin.email && password === admin.password) {
      dispatch(loginSuccess(admin));
      history.push("/admin");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_API}auth/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          dispatch(loginSuccess(res.data.token));
          history.push("/");
        })
        .catch((err) => {
          dispatch(loginFailure());
        });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <img
        src={imageLogin}
        alt="Ilustration"
        className="hidden md:inline-block w-1/2"
      />
      <div className="flex flex-col items-center justify-center p-4 rounded-md w-full md:w-1/2 shadow-md bg-blue-100">
        <div className="text-center flex items-center justify-center flex-col">
          <Typography variant="h4" className="w-full">
            Login
          </Typography>
          <Typography variant="subtitle1" className="w-full">
            Please login to continue
          </Typography>
        </div>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          label="username"
          required
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountBoxIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
          className="bg-white w-full md:w-2/3"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Password"
          required
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
          className="bg-white w-full md:w-2/3"
        />
        <div className="text-center flex items-center justify-center flex-col">
          <Typography variant="subtitle2" className="w-full">
            Username demo : johnd
          </Typography>
          <Typography variant="subtitle2" className="w-full">
            Password demo : m38rmF$
          </Typography>
        </div>
        <div className="my-6 w-full md:w-2/3">
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "no Data..." : "LOGIN"}
          </Button>
        </div>

        {error && (
          <p className="text-center text-red-500">Wrong username or password</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
