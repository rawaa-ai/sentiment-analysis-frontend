// import axios from 'axios';
// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { DarkMode } from '../../Context/DarkModeContext';

// const AnalLongTAverage = ({ selectedTicker, selectedCompanyType}) => {
//     const [longTermAverage, setLongTermAverage] = useState([]);
//     const { isDark } = useContext(DarkMode);

//     const backend_url = import.meta.env.VITE_BACKEND_URL;

//     const fetchData = async() => {
//         try {
//             const response = await axios.get(`${backend_url}api/v1/sentiments/long-term-averages?entity_id=${selectedTicker}&sentiment_type=${selectedCompanyType}`);
//             setLongTermAverage(response.data);
//         } catch (error) {
//             console.error("Error Fetching Data ", error);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, [isDark, selectedTicker])

//     return (
//         <div className='w-full flex flex-col border border-gray-500 px-6 py-2 rounded-xl'>
//             <h5 className='mb-2 dark:text-white font-semibold text-left text-sm'>Long Term Averages</h5>
//             <div className="flex flex-wrap gap-6 items-center justify-between w-full dark:text-white">
//                 <div className="text-sm font-medium">Week: <span className="font-normal">{longTermAverage.week_avg}</span></div>
//                 <div className="text-sm font-medium">Month: <span className="font-normal">{longTermAverage.month_avg}</span></div>
//                 <div className="text-sm font-medium">Quarter: <span className="font-normal">{longTermAverage.quarter_avg}</span></div>
//                 <div className="text-sm font-medium">Year: <span className="font-normal">{longTermAverage.year_avg}</span></div>
//             </div>
//         </div>
//     )
// }

// export default AnalLongTAverage