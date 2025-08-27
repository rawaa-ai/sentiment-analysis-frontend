import React, { useEffect, useState } from 'react'
import ScoreCharts from '../Components/ScoreComp/ScoreCharts'
import StocksData from '../Components/SearchBarComponent/SearchStocks'
import { useColorDropdown } from '../Context/Theme';
import AverageDropDown from '../Components/AnalysisComp/AverageDropDown';
import axios from 'axios';

const Score = () => {
    const [selectedTicker, setSelectedTicker] = useState("2222.SR");
    const [selectedName, setSelectedName] = useState("Saudi Arabian Oil Company Sentiment Analysis")
    const { selectedScheme } = useColorDropdown();

    const sentimentType = ["news", "public", "combined"];
    const [selectedType, setSelectedType] = useState(sentimentType[0]);

    const llm_model = [
        "deepseek-r1-distill-llama-70b",
        "llama-3.3-70b-versatile",
        "openai/gpt-oss-120b",
        "qwen/qwen3-235b-a22b-2507",
        "gpt-5",
        "gpt-5-mini",
        "gpt-4o",
        "gpt-4o-mini"  
    ];
    const [selectedModel, setSelectedModel] = useState(llm_model[3]);

    const [availableSectors, setAvailableSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState('financial_services');

    const token = localStorage.getItem("token");

    const dailyButtons = ["3weeks", "5weeks", "9weeks", "max"];
    const weeklyButtons = ["12weeks", "15weeks", "24weeks", "52weeks", "max"];
    const monthlyButtons = ["6months", "12months", "24months", "36months", "max"];
    const [stockSector, setStockSector] = useState("");

    const [chartTimes, setChartTimes] = useState({
        daily: {
            ticker: dailyButtons[0],
            sector: dailyButtons[0],
            tasi: dailyButtons[0]
        },
        weekly: {
            ticker: weeklyButtons[0],
            sector: weeklyButtons[0],
            tasi: weeklyButtons[0]
        },
        monthly: {
            ticker: monthlyButtons[0],
            sector: monthlyButtons[0],
            tasi: monthlyButtons[0]
        }
    });

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchCompanySentiment = async () => {
        try {
            const sector = await axios.get(
                `${BACKEND_URL}api/v1/stocks/stock-sector?ticker=${selectedTicker}`
            ,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
            setStockSector(sector.data);
        } catch (error) {
            console.error("Failed to fetch stock sector:", error);
        }
    };

    const fetchAvailableSectors = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}api/v1/stocks/sectors-in-sentiment`,
                { 
                    headers: { "Authorization": `Bearer ${token}` } 
                }
            );
            setAvailableSectors(response.data);
        } catch (error) {
            console.error('Failed to fetch available sectors:', error);
        }
    };

    useEffect(() => {
        fetchCompanySentiment();
    }, [selectedTicker]);

    useEffect(() => {
        fetchAvailableSectors();
    }, []);

    useEffect(() => {
        if (stockSector) {
            setSelectedSector(stockSector);
        }
    }, [stockSector]);

    const chartGroups = [
        { label: "Daily Sentiment", buttons: dailyButtons, freq: "daily" },
        { label: "Weekly Sentiment", buttons: weeklyButtons, freq: "weekly" },
        { label: "Monthly Sentiment", buttons: monthlyButtons, freq: "monthly" },
    ];

    return (
        <div className='w-full max-w-[90%] mx-auto'>
            <div className='flex items-center justify-between py-2'>
                <h2 className="text-2xl font-bold" style={{ color: selectedScheme.headingColor }}>
                    {selectedName}
                </h2>
                <AverageDropDown
                    averages={llm_model.map(model => ({
                    id: model,
                    name: model.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())
                    }))}
                    onSelect={(type) => setSelectedModel(type)}
                    selected={selectedModel}
                    wid="200px"
                    hei="300px"
                />
            </div>
            <div>
                {chartGroups.map(({ label, buttons, freq }) => (
                    <div key={label}>
                        <div className='flex items-center'>
                            <h2 className='text-xl min-w-[200px] font-bold py-2' style={{ color: selectedScheme.headingColor }}>
                                {label}
                            </h2>
                            {freq === "daily" ? (
                                <div className="flex items-center justify-between gap-6 w-full">
                                    <div className='w-1/3 mb-2'>
                                        <StocksData 
                                            onItemSelected={setSelectedTicker} 
                                            onSelectedName={setSelectedName} 
                                            width={300} 
                                            design={"top-30 left-40"}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <AverageDropDown
                                            averages={availableSectors.map(sector => ({
                                            id: sector,
                                            name: sector.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())
                                            }))}
                                            onSelect={(type) => setSelectedSector(type)}
                                            selected={selectedSector}
                                            wid="200px"
                                            hei="300px"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <AverageDropDown
                                            averages={sentimentType.map(source => ({
                                            id: source,
                                            name: source.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())
                                            }))}
                                            onSelect={(type) => setSelectedType(type)}
                                            selected={selectedType}
                                            wid={"200px"}
                                            hei={"fit"}
                                        />
                                    </div>
                                </div>
                            ) : null}
                          </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {[
                                { key: "ticker", target: selectedTicker },
                                { key: "sector", target: selectedSector },
                                { key: "tasi", target: "TASI" }
                            ].map(({ key, target }) => (
                                <ScoreCharts
                                    key={`${label}-${target}`}
                                    selectedTicker={target}
                                    time={chartTimes[freq][key]}
                                    setTime={(newTime) =>
                                        setChartTimes(prev => ({
                                            ...prev,
                                            [freq]: { ...prev[freq], [key]: newTime }
                                        }))
                                    }
                                    frequency={freq}
                                    selectedSentimentType={selectedType}
                                    outputType="default"
                                    buttons={buttons}
                                    selectedModel={selectedModel}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Score
