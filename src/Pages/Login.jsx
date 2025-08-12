import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css"
import { useNavigate } from "react-router-dom";
import { 
    Button,
    TextField,
    Card,
    Typography
} from "@mui/material";
import { login } from '../Services/authService'
import { useColorDropdown } from "../Context/Theme";
import ThemeDropdown from "../Components/ThemeDropDown";

const Login = () => {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            await login(userName, password);
            setError(null);
            navigate('/dashboard');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    }

    const { selectedScheme } = useColorDropdown();

    return (
        <div className="min-h-screen p-5" style={{ background: selectedScheme.backgroundColor }}>
            <div className="flex justify-end">
                <ThemeDropdown />
            </div>
            <div className="flex flex-col h-screen items-center justify-center p-5">
                <div className="flex w-full md:max-w-[40%] xl:max-w-[20%] m-auto h-fit">
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 2,
                        borderRadius: 3,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        backgroundColor: selectedScheme.backgroundColor,
                        border: "1px solid gray",
                    }}>
                        <form onSubmit={handleLogin}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: selectedScheme.headingColor }}>
                                Login to your account
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Email Address"
                                type="email"
                                variant="outlined"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                sx={{
                                mb: 2,
                                borderRadius: 2,
                                border: "1px solid gray",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    },
                                    '& input': {
                                        color: selectedScheme.headingColor,
                                        '&::placeholder': {
                                            color: selectedScheme.headingColor,
                                            opacity: 1
                                        },
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                mb: 2,
                                borderRadius: 2,
                                border: "1px solid gray",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    },
                                    '& input': {
                                        color: selectedScheme.headingColor,
                                        '&::placeholder': {
                                            color: selectedScheme.headingColor,
                                            opacity: 1
                                        },
                                    }
                                }}
                            />
                            <div className="flex justify-end">
                                <Link className="text-blue-400 font-bold text-sm m-2 hover:text-blue-400 hover:underline decoration-2">Forget Password?</Link>
                            </div>
                            {error && <p className="text-center text-red-600">{error}</p>}
                            <Button type="submit" variant="contained" color="white" sx={{
                                borderRadius: 10,
                                width: '100%',
                                color: selectedScheme.headingColor,
                                border: "1px solid gray",
                            }}>Login</Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login;