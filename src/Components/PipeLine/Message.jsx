import React, { useEffect, useState } from 'react';
import AverageDropDown from '../AnalysisComp/AverageDropDown';
import { useColorDropdown } from '../../Context/Theme';
import axios from 'axios';
import { Button } from '@mui/material';
import Cards from './Cards';

const Message = () => {
    const sourceTable = [
        "articles",
        "market_news",
        "company_news",
        "disclosures",
        "reddit_posts"
    ];
    const [selectedSource, setSelectedSource] = useState("articles");
    const [url, setUrl] = useState("");
    const [messages, setMessages] = useState([]);
    const { selectedScheme } = useColorDropdown();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [date, setDate] = useState("");
    const llm_models = [
        "deepseek-r1-distill-llama-70b",
        "llama-3.3-70b-versatile",
        "openai/gpt-oss-120b",
        "gpt-5",
        "gpt-5-mini",
        "gpt-4o",
        "gpt-4o-mini"    
    ]
    const relevence = [
        "direct",
        "indirect"
    ];
    const [selectedRelevance, setSelectedRelevance] = useState(relevence[0]);
    const [selectedModel1, setSelectedModel1] = useState(llm_models[0]);
    const [selectedModel2, setSelectedModel2] = useState(llm_models[0]);
    const [analysis, setAnalysis] = useState("");
    const [prompt, setPrompt] = useState([]);
    const token = localStorage.getItem("token");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [cards, setCards] = useState([]);

    const fetchCards = async() => {
        try {
            const response = await axios.get(`${BACKEND_URL}api/v1/sentiment-pipeline/cache?news_type=${selectedSource}&page=${page}&page_size=${pageSize}&llm_model=${selectedModel1}&relevance=${selectedRelevance}&specific_date=${date}`);
            setCards(response.data)
        } catch (error) {
            console.error("Error fetching cards", error);
        }
    }

    useEffect(() => {
        fetchCards();
    }, [page, pageSize, selectedModel1, selectedSource, date])
    console.log("cards", cards)

    const handleButtonsFunctionality = async (btn) => {
        if (btn === "Visit") {
            window.open(url, "_blank");
        } else if (btn === "Get Message") {
            try {
                const response = await axios.get(`${BACKEND_URL}api/v1/sentiment-pipeline/?source_table=${selectedSource}&url=${url}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setMessages([response.data.message]);
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        }
    };

    const handleAnalyze = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}api/v1/sentiment-pipeline/analyse`,
                {
                    message: messages.join("\n"),
                    prompt: prompt.join("\n"),
                    llm_model: selectedModel2
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("Error fetching analysis", error);
        }
    };

    // console.log("Message", messages);

    return (
        <div className="w-full p-6">
            <div className='flex gap-4'>
                {/* LEFT COLUMN: only change is adding flex-1 */}
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex items-center justify-between'>
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
                        <AverageDropDown
                            averages={relevence.map(source => ({
                                id: source,
                                name: source
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, char => char.toUpperCase())
                            }))}
                            onSelect={(type) => setSelectedRelevance(type)}
                            selected={selectedRelevance}
                            wid={"200px"}
                            hei={"fit"}
                        />
                        <AverageDropDown
                            averages={llm_models.map(model => ({
                                id: model,
                                name: model
                            }))}
                            onSelect={(type) => setSelectedModel1(type)}
                            selected={selectedModel1}
                            wid={"200px"}
                            hei={"fit"}
                        />
                    </div>
                    <input type="date" name="date"
                        className="rounded-xl focus:outline-none w-full p-3 shadow-sm placeholder-gray-400 transition-all duration-200 focus:ring-2"
                        style={{
                            color: selectedScheme.textColor,
                            border: "1px solid gray"
                        }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Cards sentiments={cards} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} cardCount={cards.length} setClickeUrl={setUrl} />
                </div>

                {/* RIGHT COLUMN: only change is w-full -> flex-1 */}
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-4'>
                        {/* INNER LEFT (of right column): added flex-1 */}
                        <div className="flex flex-col gap-4 flex-1">
                            <div className='flex items-center justify-between'>
                                <AverageDropDown
                                    averages={sourceTable.map(source => ({
                                        id: source,
                                        name: source
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, char => char.toUpperCase())
                                    }))}
                                    onSelect={(type) => setSelectedSource(type)}
                                    selected={selectedSource}
                                    wid={"180px"}
                                    hei={"fit"}
                                />
                                <div className="flex items-center text-sm text-center gap-1">
                                    {["Visit", "Get Message"].map((btn) => (
                                        <Button onClick={() => handleButtonsFunctionality(btn)} key={btn.toLowerCase()} variant="contained" color="white" sx={{
                                            borderRadius: 10,
                                            textTransform: "none",
                                            background: selectedScheme.backgroundColor,
                                            color: selectedScheme.headingColor,
                                            display: "flex",
                                            alignItems: "center",
                                            border: "1px solid gray",
                                            py: .4,
                                            px: 3,
                                            width: "180px",
                                            fontSize: "10px",
                                        }}>
                                            {btn}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <input
                                type="text"
                                value={url || ""}
                                onChange={(e) => setUrl(e.target.value)}
                                className="rounded-xl focus:outline-none w-full p-3 shadow-sm placeholder-gray-400"
                                placeholder="Enter URL..."
                                style={{
                                    border: `1px solid gray`,
                                    color: selectedScheme.textColor
                                }}
                            />
                            <div className="rounded-xl shadow-sm">
                                <h3
                                    className="text-lg font-semibold mb-2"
                                    style={{ color: selectedScheme.headingColor }}
                                >
                                    Messages
                                </h3>
                                <div className="rounded-xl shadow-sm h-[600px] overflow-y-auto" style={{
                                    border: "1px solid gray"
                                }}>
                                    <textarea
                                        value={messages.join("\n")}
                                        onChange={(e) => setMessages(e.target.value.split("\n"))}
                                        placeholder="Enter your prompt here..."
                                        className="w-full h-[700px] p-3 rounded-xl focus:outline-none resize-none text-sm"
                                        style={{
                                            color: selectedScheme.textColor,
                                            background: "transparent"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* INNER RIGHT (of right column): added flex-1 */}
                        <div className="flex flex-col gap-4 flex-1">
                            <AverageDropDown
                                averages={llm_models.map(model => ({
                                    id: model,
                                    name: model
                                }))}
                                onSelect={(type) => setSelectedModel2(type)}
                                selected={selectedModel2}
                                wid={"300px"}
                                hei={"fit"}
                            />
                            <button
                                className="rounded-xl px-5 py-2 w-[500px] cursor-pointer"
                                style={{
                                    color: selectedScheme.headingColor,
                                    border: `1px solid gray`,
                                    backgroundColor: selectedScheme.background || "transparent"
                                }}
                                onClick={handleAnalyze}
                            >
                                Analyze
                            </button>
                            <h3
                                className="text-lg font-semibold"
                                style={{ color: selectedScheme.headingColor }}
                            >
                                Prompt
                            </h3>
                            <div className="rounded-xl shadow-sm h-[600px] overflow-y-auto" style={{
                                border: "1px solid gray"
                            }}>
                                <textarea
                                    value={prompt.join("\n")}
                                    onChange={(e) => setPrompt(e.target.value.split("\n"))}
                                    placeholder="Enter your prompt here..."
                                    className="w-full h-[700px] p-3 rounded-xl focus:outline-none resize-none text-sm"
                                    style={{
                                        color: selectedScheme.textColor,
                                        background: "transparent"
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {analysis && (
                        <div className="w-full rounded-xl shadow-sm overflow-y-auto max-h-64">
                            <h3
                                className="text-lg font-semibold mb-2"
                                style={{ color: selectedScheme.headingColor }}
                            >
                                Analysis
                            </h3>
                            <div
                                className="text-sm whitespace-pre-wrap"
                                style={{
                                    color: selectedScheme.textColor,
                                    border: "1px solid gray",
                                    padding: "1rem",
                                    borderRadius: "0.75rem"
                                }}
                            >
                                {analysis}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
