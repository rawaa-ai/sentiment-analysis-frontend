import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
import ThemeDropdown from "../Components/ThemeDropDown";
import { useColorDropdown } from "../Context/Theme";

export default function DashBoard() {
  const [selectedTicker, setSelectedTicker] = useState("2222.SR");
  const [selectedName, setSelectedName] = useState("Saudi Arabian Oil Company");
  const [concate, setConcate] = useState(false);
  const [time, setTime] = useState("9weeks");

  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { selectedScheme } = useColorDropdown();

  useEffect(() => {
    setSelectedTicker('2222.SR');
    setSelectedName("Saudi Arabian Oil Company");
  }, []);


  if (!token) navigate('/');

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  const navigationData = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Score", link: "/dashboard/score" },
    { name: "Sentiment Overview", link: "/dashboard/sen-overview" },
    { name: "Pipeline", link: "/dashboard/pipeline" },
    { name: "Stats", link: "/dashboard/stats"},
  ];

  return (
    <div className="flex flex-col overflow-y-scroll w-full h-screen" style={{ background: selectedScheme.backgroundColor, color: selectedScheme.textColor }}>
        <div className="w-full max-w-[90%] mx-auto flex justify-between items-center mt-2">
          {/* <img 
              src="/rawaa_logo.jpeg"
              alt="logo"
              className="rounded-full w-12 h-12 ml-2 object-cover"
          /> */}
          <h1 className="text-transparent text-2xl font-bold">Rawa</h1>
          <div className="md:flex gap-3 hidden">
            {navigationData.map((btn, index) => (
              <Button key={index} onClick={() => navigate(btn.link)} variant="contained" color="white" sx={{
                    borderRadius: 10,
                    textTransform: "none",
                    background: selectedScheme.backgroundColor,
                    color: selectedScheme.headingColor,
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid gray",
                    py: 0,
                    px: 3,
                    gap: 1,
                    fontSize: "10px",
                }}>
                {btn.name}
              </Button>
            ))}
            <Button onClick={handleLogout} variant="contained" color="white" sx={{
                  borderRadius: 10,
                  textTransform: "none",
                  background: selectedScheme.backgroundColor,
                  color: selectedScheme.headingColor,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid gray",
                  py: 0,
                  px: 3,
                  gap: 1,
                  fontSize: "10px",
                }}>
              Logout
            </Button>
          </div>
            <ThemeDropdown />
          
        </div>
      <Outlet context={{ selectedName, selectedTicker, time, setTime, concate, setConcate, setSelectedName, setSelectedTicker }} />
    </div>
  );
}
