import React from 'react'
import Login from "./Pages/Login"
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from './Services/Protected';
import AnalysisWrapper from './Pages/AnalysisWrapper';
import DashBoard from './Pages/DashBoard';
import PipeLine from './Pages/PipeLine';
import Score from './Pages/Score';
import Stats from './Pages/Stats';
import SentimentPerformanceOverview from './Pages/SentimentPerformanceOverview';

const App = () => {
    return (
      <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<DashBoard />}>
              <Route index element={<AnalysisWrapper />} />
              <Route path='pipeline' element={<PipeLine />}/>
              <Route path='sen-overview' element={<SentimentPerformanceOverview />}/>
              <Route path='stats' element={<Stats />}/>
              <Route path='score' element={<Score />}/>
            </Route>
          </Route>
          </Routes>
      </div>
    )
}

export default App