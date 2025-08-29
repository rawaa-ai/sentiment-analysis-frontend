import React, { useState, useEffect, useCallback } from 'react';
import { useColorDropdown } from '../Context/Theme';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Button } from '@mui/material'

const SentimentPerformanceOverview = () => {
    const { selectedScheme } = useColorDropdown();
    const [data, setData] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [heatmapData, setHeatMapData] = useState({ name: "root", children: [] });
    const [heatmapLoading, setHeatmapLoading] = useState(true);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const time = ["daily", "weekly"];
    const [timeframe, setTimeframe] = useState(time[0]);
    const [senTimeframe, setSenTimeframe] = useState(time[0]);
    const token = localStorage.getItem("token");

    const fetchTable = useCallback(async () => {
        setTableLoading(true);
        try {
            const response = await axios.get(
                `${BACKEND_URL}api/v1/sentiments/top-stock/?n=10&timeframe=${senTimeframe}`,
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            setData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching table data", error);
            setData([]);
        } finally {
            setTableLoading(false);
        }
    }, [senTimeframe]);

    const fetchHeatMapData = useCallback(async () => {
        setHeatmapLoading(true);
        try {
            const response = await axios.get(
                `${BACKEND_URL}api/v1/sentiments/heatmap/?timeframe=${timeframe}`,
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            
            const sectorData = response.data?.[0];
            if (sectorData && Array.isArray(sectorData.companies) && sectorData.companies.length > 0) {
                const companies = sectorData.companies;
                setHeatMapData({
                    name: "companies",
                    children: companies.map((company, index) => ({
                        id: company.ticker ?? `company-${index}`,
                        name: company.name ?? company.ticker ?? `Company ${index + 1}`,
                        value: company.market_cap > 0 ? company.market_cap : 1,
                        sentiment: company.change ?? 0
                    }))
                });
            } else {
                console.warn("No companies found in heatmap data");
                setHeatMapData({ name: "root", children: [] });
            }
        } catch (error) {
            console.error("Error fetching heatmap data", error);
            setHeatMapData({ name: "root", children: [] });
        } finally {
            setHeatmapLoading(false);
        }
    }, [timeframe]); 

    useEffect(() => { fetchTable(); }, [fetchTable]);
    useEffect(() => { fetchHeatMapData(); }, [fetchHeatMapData]);

    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    const getColorForSentiment = useCallback((node) => {
        const sentiment = node.data?.sentiment ?? 0;
        const { heatmapGradients } = selectedScheme;
    
        if (sentiment >= 4 && sentiment <= 10) {
            return heatmapGradients.positive[0];
        }
        if (sentiment > 0 && sentiment < 4) {
            return heatmapGradients.positive[1];
        }
        if (sentiment < 0 && sentiment >= -4) {
            return heatmapGradients.negative[1];
        }
        if (sentiment < -4 && sentiment >= -10) {
            return heatmapGradients.negative[0];
        }
    
        return heatmapGradients.neutral;
    }, [selectedScheme]);
    
    
    return (
        <div
            className="flex flex-col overflow-y-auto w-full min-h-screen p-4"
            style={{
                background: selectedScheme.backgroundColor,
                color: selectedScheme.textColor
            }}
        >
            <div className="w-full max-w-[90%] mx-auto">
                <div className='flex items-center justify-between'>
                    <h1 className="text-2xl font-bold mb-6" style={{ color: selectedScheme.headingColor }}>
                        Top Stock
                    </h1>
                    <div className="flex items-center gap-2">
                        {time.map((btn) => (
                            <Button key={btn} variant="contained" color="white"
                                sx={{
                                    borderRadius: 10,
                                    textTransform: "none",
                                    background: selectedScheme.backgroundColor,
                                    color: selectedScheme.headingColor,
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid gray",
                                    width: "200px",
                                    py: 0.4,
                                    px: 3,
                                    gap: 1,
                                    fontSize: "10px",
                                    borderColor: senTimeframe === btn ? selectedScheme.selectedButton : "gray"
                                }}
                                onClick={() => setSenTimeframe(btn)}>{btn}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden mb-8 border border-gray-800">
                    {tableLoading ? (
                        <div className="flex justify-center items-center p-8">
                            <Loader2 className="animate-spin" style={{ color: selectedScheme.textColor }} />
                        </div>
                    ) : data.length === 0 ? (
                        <p className="text-center p-5">No data available</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ color: selectedScheme.headingColor }}>
                                        {columns.map(col => (
                                            <th key={col} className="p-3 text-center capitalize font-semibold">
                                                {col.replace(/_/g, " ")}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, rowIndex) => (
                                        <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "" : "opacity-90"} text-center border-t border-gray-800`}>
                                            {columns.map(col => (
                                                <td key={`${rowIndex}-${col}`} className="p-3" style={{ color: selectedScheme.textColor }}>
                                                    {row[col]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="rounded-lg p-4 h-[600px]">
                    <div className='flex items-center justify-between'>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: selectedScheme.headingColor }}>
                            Market Sentiment Heatmap
                        </h2>
                        <div className='flex items-center gap-2'>
                            {time.map((btn) => (
                                <Button key={btn} variant="contained" color="white"
                                    sx={{
                                        borderRadius: 10,
                                        textTransform: "none",
                                        background: selectedScheme.backgroundColor,
                                        color: selectedScheme.headingColor,
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid gray",
                                        width: "200px",
                                        py: 0.4,
                                        px: 3,
                                        gap: 1,
                                        fontSize: "10px",
                                        borderColor: timeframe === btn ? selectedScheme.selectedButton : "gray"
                                    }}
                                    onClick={() => setTimeframe(btn)}>{btn}
                                </Button>
                            ))}    
                        </div>
                    </div>

                    {heatmapLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="animate-spin" style={{ color: selectedScheme.textColor }} />
                        </div>
                    ) : heatmapData.children.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p>No heatmap data available</p>
                        </div>
                    ) : (
                        <div style={{
                            width: "100%",
                            height: "600px",
                            fontSize: "14px",
                            fontWeight: "bold"
                        }}>
                            <ResponsiveTreeMap
                                data={heatmapData}
                                identity="id"
                                value="value"
                                valueFormat=".02s"
                                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                labelSkipSize={20}
                                nodeOpacity={1}
                                orientLabel={false}
                                colors={getColorForSentiment}
                                label={(node) => {
                                    const text = node.data.name;
                                    const sentiment = node.data.sentiment;
                                    const approxTextWidth = text.length * 7;
                                    if (approxTextWidth > node.width) {
                                        return sentiment;
                                    }
                                    return `${text}\n${sentiment}`;
                                }}
                                // borderColor={selectedScheme.textColor}
                                innerPadding={2}
                                outerPadding={0}
                                parentLabelPosition="left"
                                parentLabelTextColor={selectedScheme.textColor}
                                labelTextColor={selectedScheme.textColor}
                                tooltip={({ node }) => (
                                    <div
                                        style={{
                                            background: selectedScheme.backgroundColor,
                                            color: selectedScheme.textColor,
                                            padding: "6px 10px",
                                            borderRadius: "6px",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                            fontSize: "12px",
                                        }}
                                        className='font-mono'
                                    >
                                        <strong>{node.data?.name}</strong>
                                        <br />
                                        Market Cap: {(node.data?.value ?? 0).toLocaleString()}
                                        <br />
                                        Change: {node.data?.sentiment}
                                    </div>
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SentimentPerformanceOverview;