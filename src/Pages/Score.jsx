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
    const [availableSectors, setAvailableSectors] = useState([]);
    const [selectedSector, setSelectedSector] = useState('financial_services');
    const token = localStorage.getItem("token");
    const time = ["0.5week", "1week", "3weeks", "5weeks", "9weeks", "12weeks", "15weeks", "24weeks", "52weeks", "6months", "12months", "24months", "36months", "max"];
    const [selectedTime, setSelectedTime] = useState(time[4]);
    const frequency = ["daily", "weekly", "monthly"];
    const [selectedFrequency, setSelectedFrequency] = useState(frequency[0]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchAvailableSectors = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}api/v1/stocks/sectors-in-sentiment`, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setAvailableSectors(response.data);
        } catch (error) {
            console.error('Failed to fetch available sectors:', error);
        }
    };

    useEffect(() => {
        fetchAvailableSectors();
    }, [])

    return (
        <div className='w-full max-w-[90%] mx-auto'>
            <div className='flex items-center justify-between py-2'>
                <h2 className="text-2xl font-bold" style={{ color: selectedScheme.headingColor }}>{selectedName} Sentiment Analysis</h2>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 pb-2'>
                    <h1 className='text-xl font-bold' style={{
                        color: selectedScheme.headingColor
                    }}>Daily Sentiments</h1>
                    <div className='w-20'>
                        <StocksData onItemSelected={setSelectedTicker} onSelectedName={setSelectedName} width={300} design={"top-30 left-40"}/>
                    </div>
                </div>
                <AverageDropDown
                    averages={availableSectors.map(sector => ({
                        id: sector,
                        name: sector
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, char => char.toUpperCase())
                    }))}
                    onSelect={(type) => setSelectedSector(type)}
                    selected={selectedSector}
                    wid="200px"
                    hei="300px"
                />
                <div className='flex items-center gap-2'>
                    <AverageDropDown
                        averages={sentimentType.map(source => ({
                            id: source,
                            name: source
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, char => char.toUpperCase())
                        }))}
                        onSelect={(type) => setSelectedType(type)}
                        selected={selectedType}
                        wid={"200px"}
                        hei={"fit"}
                    />
                    <AverageDropDown
                        averages={time.map(source => ({
                            id: source,
                            name: source
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, char => char.toUpperCase())
                        }))}
                        onSelect={(type) => setSelectedTime(type)}
                        selected={selectedTime}
                        wid={"200px"}
                        hei={"300px"}
                    />
                    <AverageDropDown
                        averages={frequency.map(source => ({
                            id: source,
                            name: source
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, char => char.toUpperCase())
                        }))}
                        onSelect={(type) => setSelectedFrequency(type)}
                        selected={selectedFrequency}
                        wid={"200px"}
                        hei={"fit"}
                    />
                </div>
            </div>
            <div>
                <div className='grid grid-cols-3 gap-2'>
                    <ScoreCharts
                        selectedTicker={selectedTicker}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                    <ScoreCharts
                        selectedTicker={selectedSector}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                    <ScoreCharts
                        selectedTicker={"TASI"}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                </div>
                <h2 className='text-xl font-bold py-2' style={{
                    color: selectedScheme.headingColor
                }}>Weekly Sentiment</h2>
                <div className='grid grid-cols-3 gap-2'>
                    <ScoreCharts
                        selectedTicker={selectedTicker}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                    <ScoreCharts
                        selectedTicker={selectedSector}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                    <ScoreCharts
                        selectedTicker={"TASI"}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                </div>
                <h2 className='text-xl font-bold py-2' style={{
                    color: selectedScheme.headingColor
                }}>Monthly Sentiment</h2>
                <div className='grid grid-cols-3 gap-2'>
                    <ScoreCharts
                        selectedTicker={selectedTicker}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                    <ScoreCharts
                        selectedTicker={selectedSector}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                    <ScoreCharts
                        selectedTicker={"TASI"}
                        time={selectedTime}
                        frequency={selectedFrequency}
                        selectedSentimentType={selectedType}
                        outputType={"default"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Score