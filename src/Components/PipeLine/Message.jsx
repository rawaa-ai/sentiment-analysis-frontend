import React, { useEffect, useState } from 'react';
import AverageDropDown from '../AnalysisComp/AverageDropDown';
import { useColorDropdown } from '../../Context/Theme';
import axios from 'axios';
import AnalChart from '../AnalysisComp/AnalChart';

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
    const [infoFilter, setInfoFilter] = useState("latest");
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
    const [selectedModel, setSelectedModel] = useState(llm_models[0]);
    const [analysis, setAnalysis] = useState("");
    const [prompt, setPrompt] = useState([]);
    const token = localStorage.getItem("token");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [cards, setCards] = useState([]);

    const fetchCards = async() => {
        try {
            const response = await axios.get(`${BACKEND_URL}api/v1/sentiment-pipeline/cache?news_type=${selectedSource}&page=${page}&page_size=${pageSize}&llm_model=${selectedModel}&relevance=${selectedRelevance}&specific_date=${date}`);
            setCards(response.data)
        } catch (error) {
            console.error("Error fetching cards", error);
        }
    }

    useEffect(() => {
        fetchCards();
    }, [page, pageSize, selectedModel, selectedSource, date])
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
                    llm_model: selectedModel
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
        <div className="w-full h-screen p-6">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
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
                    </div>
                    <AverageDropDown
                        averages={llm_models.map(model => ({
                            id: model,
                            name: model
                        }))}
                        onSelect={(type) => setSelectedModel(type)}
                        selected={selectedModel}
                        wid={"300px"}
                        hei={"fit"}
                    />
                    <input type="date" name="date"
                        className="rounded-xl focus:outline-none w-full p-3 shadow-sm placeholder-gray-400 transition-all duration-200 focus:ring-2"
                        style={{
                            color: selectedScheme.textColor,
                            border: "1px solid gray"
                        }}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <AnalChart sentiments={cards} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} infoFilter={infoFilter} setInfoFilter={setInfoFilter} cardCount={cards.length} />
                </div>
                <div className="flex flex-col gap-4">
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
                    <input
                        type="text"
                        value={url || ""}
                        onChange={(e) => setUrl(e.target.value)}
                        className="rounded-xl focus:outline-none w-full p-3 shadow-sm placeholder-gray-400 transition-all duration-200 focus:ring-2"
                        placeholder="Enter URL..."
                        style={{
                            border: `1px solid gray`,
                            color: selectedScheme.textColor
                        }}
                    />
                    <div className="flex items-center gap-4 text-sm text-center w-full">
                        {["Visit", "Get Message"].map((btn) => (
                            <button
                                key={btn.toLowerCase()}
                                className="rounded-xl px-5 py-2 w-[280px] cursor-pointer transition-all duration-200
                                    hover:scale-105 hover:shadow-lg active:scale-95"
                                style={{
                                    color: selectedScheme.headingColor,
                                    border: `1px solid ${selectedScheme.headingColor}`,
                                    backgroundColor: selectedScheme.background || "transparent"
                                }}
                                onClick={() => handleButtonsFunctionality(btn)}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                    <div className="rounded-xl shadow-sm">
                        <h3
                            className="text-lg font-semibold mb-2"
                            style={{ color: selectedScheme.headingColor }}
                        >
                            Messages
                        </h3>
                        <ul
                            className="space-y-2 text-sm rounded-xl p-2 h-[600px] overflow-y-auto"
                            style={{
                                color: selectedScheme.textColor,
                                border: "1px solid gray"
                            }}
                        >
                            {messages.length > 0 ? (
                                messages.map((msg, idx) => (
                                    <li
                                        key={idx}
                                        contentEditable
                                        suppressContentEditableWarning={true}
                                        className="p-2 rounded-xl focus:outline-none"
                                        onBlur={(e) => {
                                            const updated = [...messages];
                                            updated[idx] = e.target.innerText;
                                            setMessages(updated);
                                        }}
                                    >
                                        {msg}
                                    </li>
                                ))
                            ) : (
                                <li
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    className="p-2 rounded-xl focus:outline-none"
                                    onBlur={(e) => setMessages([e.target.innerText])}
                                >
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-40">
                    <AverageDropDown
                        averages={llm_models.map(model => ({
                            id: model,
                            name: model
                        }))}
                        onSelect={(type) => setSelectedModel(type)}
                        selected={selectedModel}
                        wid={"300px"}
                        hei={"fit"}
                    />
                    <div className="p-4 rounded-xl shadow-sm h-[600px] w-[500px] overflow-y-auto" style={{
                        border: "1px solid gray"
                    }}>
                        <h3
                            className="text-lg font-semibold mb-2"
                            style={{ color: selectedScheme.headingColor }}
                        >
                            Prompt
                        </h3>
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
                    <button
                        className="rounded-xl px-5 py-2 w-full cursor-pointer transition-all duration-200
                            hover:scale-105 hover:shadow-lg active:scale-95"
                        style={{
                            color: selectedScheme.headingColor,
                            border: `1px solid gray`,
                            backgroundColor: selectedScheme.background || "transparent"
                        }}
                        onClick={handleAnalyze}
                    >
                        Analyze
                    </button>
                </div>
            </div>
            {analysis && (
                <div className="p-4 rounded-xl shadow-sm overflow-y-auto max-h-64">
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
    );
};

export default Message;
