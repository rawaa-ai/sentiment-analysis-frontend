import React from 'react'
import Login from "./Pages/Login"
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from './Services/Protected';
import AnalysisWrapper from './Pages/AnalysisWrapper';
import DashBoard from './Pages/DashBoard';

const App = () => {
    return (
      <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<DashBoard />}>
              <Route index element={<AnalysisWrapper />} />
            </Route>
        </Route>
          </Routes>
      </div>
    )
}

export default App