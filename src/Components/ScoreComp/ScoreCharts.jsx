import axios from 'axios';
import { BaselineSeries, ColorType, createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { useColorDropdown } from '../../Context/Theme';
import { Button } from '@mui/material';

const ScoreCharts = ({ selectedTicker, time, setTime, frequency, selectedSentimentType, outputType, buttons, selectedModel }) => {
    const [dailyData, setDailyData] = useState([]);
    const [chartError, setChartError] = useState(false);
    const token = localStorage.getItem("token");
    const chartContainer = useRef(null);
    const chartRef = useRef(null);
    const { selectedScheme } = useColorDropdown();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchChartData = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}api/v1/sentiments/sentiments-history?entity_id=${selectedTicker}&llm_model=${selectedModel}&time=${time}&frequency=${frequency}&sentiment_type=${selectedSentimentType}&output_type=${outputType}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.length === 0) {
                setChartError(true);
            } else {
                setChartError(false);
                const formattedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                const convertedShort = formattedData.map(item => ({
                    time: new Date(item.date).getTime() / 1000,
                    value: Number(item.short_term_sentiment),
                }));
                setDailyData(convertedShort);
            }
        } catch (error) {
            console.error("Error fetching data", error);
            setChartError(true);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [selectedTicker, selectedSentimentType, outputType, time, frequency, selectedModel]);


    console.log("data:", dailyData)
    useEffect(() => {
        if (!chartContainer.current) return;

        const chart = createChart(chartContainer.current, {
            layout: {
                background: { type: ColorType.Solid, color: selectedScheme.backgroundColor },
                textColor: selectedScheme.headingColor,
            },
            width: chartContainer.current.offsetWidth,
            height: 250,
            grid: { vertLines: false, horzLines: false },
            timeScale: { fixLeftEdge: true, fixRightEdge: true },
            handleScale: { axisPressedMouseMove: false },
            crosshair: { mode: 1 },
        });

        const series = chart.addSeries(BaselineSeries, {
            topLineColor: selectedScheme.tickerColor,
            topFillColor1: selectedScheme.topFillColor1,
            topFillColor2: selectedScheme.topFillColor2,
            bottomLineColor: selectedScheme.bottomLineColor,
            bottomFillColor1: selectedScheme.bottomFillColor1,
            bottomFillColor2: selectedScheme.bottomFillColor2,
            priceScaleId: 'right',
            priceLineVisible: false,
        });

        chart.priceScale('right').applyOptions({
            scaleMargins: { top: 0.1, bottom: 0.1 },
            minValue: -8,
            maxValue: 8,
        });

        chartRef.current = { chart, series };

        return () => chart.remove();
    }, [selectedScheme.backgroundColor]);

    // Update chart when data changes
    useEffect(() => {
        if (chartRef.current?.series && dailyData.length > 0) {
            chartRef.current.series.setData(dailyData);
            chartRef.current.chart.timeScale().fitContent();
        }
    }, [dailyData, selectedScheme.backgroundColor]);

    return (
        <div>
            <div
                className={`cursor-pointer border border-gray-400 rounded-xl relative mb-5 ${chartError ? "select-none opacity-40 pointer-events-none" : ""}`}
                ref={chartContainer}
            >
                <div className="w-full h-full flex items-center gap-2 p-2">
                    {buttons.map((btn, index) => (
                        <Button key={index} onClick={() => setTime(btn)} variant="contained" color="white" sx={{
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
                            {btn}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScoreCharts;
