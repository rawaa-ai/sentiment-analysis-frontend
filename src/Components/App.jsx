import React from 'react';
import './App.css';
import DashBoard from "./Pages/DashBoard";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./Components/ProtectedRoutes/Protected";
import Commodities from './Components/DropDown/Commodities';
import Upkeeps from './Components/Logs/Upkeep';
import AnalysisWrapper from './Pages/AnalysisWrapper';
import ChartWrapper from './Pages/ChartWrapper';
import PortfolioRanking from './Pages/PortfolioRanking';
import SenHistory from './Components/SentimentHistory/SenHistory';
import Dividend from './Pages/Dividend';
import FareValues from './Pages/FareValues';
import RelValuation from './Pages/RelValuation';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<DashBoard />}>
            <Route index element={<ChartWrapper />} /> {/* default child route */}
            <Route path="analysis" element={<AnalysisWrapper />} />
            <Route path='sentiment-history' element={<SenHistory />} />
            <Route path='dividends' element={<Dividend />}/>
            <Route path='rel_valuation' element={<RelValuation />}/>
            <Route path='fare-value' element={<FareValues />}/>
            <Route path="commodities" element={<Commodities />} />
            <Route path="upkeeps" element={<Upkeeps />} />
            <Route path="portfolio_ranking" element={<PortfolioRanking />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}
