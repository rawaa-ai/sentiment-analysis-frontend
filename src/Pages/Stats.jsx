import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AverageDropDown from '../Components/AnalysisComp/AverageDropDown'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useColorDropdown } from '../Context/Theme';
import { Rectangle } from "recharts";

const RoundedBar = (props) => {
    const { fill, dataKey, payload } = props;
    const stackKeys = ["aljazeera", "alarabiya", "aleqt", "company-news", "market-news", "disclosures"];
    const currentIdx = stackKeys.indexOf(dataKey);
    const aboveKeys = stackKeys.slice(currentIdx + 1);
    const isTop = aboveKeys.every((k) => !payload[k] || payload[k] === 0);
    return (
        <Rectangle
            {...props}
            radius={isTop ? [10, 10, 0, 0] : [0, 0, 0, 0]}
            fill={fill}
        />
    );
};

const Stats = () => {
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState(1);
    const { selectedScheme } = useColorDropdown();
    const sourceTable = [
        "all",
        "market_news",
        "company_news",
        "aljazeera",
        "alarabiya",
        "aleqt",
        "disclosures"
    ];
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [selectedSource, setSelectedSource] = useState("all");
    const token = localStorage.getItem("token");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchChartData = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}api/v1/data-stats/?year=${year}&month=${month}&source=${selectedSource}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setChartData(response.data);
        } catch (error) {
            console.error("Error fetching cards", error);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [year, month, selectedSource]);

    return (
        <div className="w-full max-w-[90%] mx-auto space-y-4">

            <AverageDropDown
                averages={sourceTable.map(source => ({
                    id: source,
                    name: source
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, char => char.toUpperCase())
                }))}
                onSelect={(type) => setSelectedSource(type)}
                selected={selectedSource}
                wid={"200px"}
                hei={"fit"}
            />

            <div className="flex justify-center items-center gap-6 text-lg font-bold" style={{
                color: selectedScheme.headingColor
            }}>
                <button 
                    onClick={() => setYear(year - 1)} 
                    className="px-2 py-1 bg-gray-800 text-white rounded cursor-pointer"
                >
                    ←
                </button>
                <span>{year}</span>
                <button 
                    onClick={() => setYear(prev => prev === 2025 ? 2025 : prev + 1)} 
                    className="px-2 py-1 bg-gray-800 text-white rounded cursor-pointer"
                >
                    →
                </button>
                <button 
                    onClick={() => setMonth(prev => prev > 1 ? prev - 1 : 12)} 
                    className="ml-10 px-2 py-1 bg-gray-800 text-white rounded cursor-pointer"
                >
                    ←
                </button>
                <span>{monthNames[month - 1]}</span> 
                <button 
                    onClick={() => setMonth(prev => prev < 12 ? prev + 1 : 1)} 
                    className="px-2 py-1 bg-gray-800 text-white rounded cursor-pointer"
                >
                    →
                </button>
            </div>
            <div className="w-full h-[800px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                background: selectedScheme.backgroundColor,
                                border: "1px solid gray",
                            }}
                        />
                        <Legend />
                        {[
                            { key: "aljazeera", color: "#2196F3" },
                            { key: "alarabiya", color: "#FF9800" },
                            { key: "aleqt", color: "#9C27B0" },
                            { key: "company-news", color: "#4CAF50" },
                            { key: "market-news", color: "#F44336" },
                            { key: "disclosures", color: "#795548" },
                        ].map((bar, idx, arr) => (
                            <Bar
                                key={bar.key}
                                dataKey={bar.key}
                                stackId="a"
                                fill={bar.color}
                                shape={<RoundedBar />}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Stats;
