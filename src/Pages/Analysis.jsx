import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SentimentToggle from '../Components/AnalysisComp/SentimentToggle';
import AnalChart from '../Components/AnalysisComp/AnalChart';
import { useColorDropdown } from '../Context/Theme';
import AverageDropDown from '../Components/AnalysisComp/AverageDropDown';
import StocksData from '../Components/SearchBarComponent/SearchStocks';

const Analysis = () => {
    const [tasiTopNerSentiment, setTasiTopNerSentiment] = useState([]);
    const [companyTopNerSentiment, setCompanyTopNerSentiment] = useState([]);
    const [sectorTopNerSentiment, setSectorTopNerSentiment] = useState([]);
    const [selectedTicker, setSelectedTicker] = useState("2222.SR");
    const [selectedName, setSelectedName] = useState("Saudi Arabian Oil Company");
    const [companyInfoFilter, setCompanyInfoFilter] = useState("latest");
    const [sectorInfoFilter, setSectorInfoFilter] = useState("latest");
    const [TasiInfoFilter, setTasiInfoFilter] = useState("latest");
    const [companytopNorError, setCompanyTopNorError] = useState(false);
    const [sectortopNorError, setSectorTopNorError] = useState(false);
    const sentimentType = ["news", "public", "combined"];
    const [selectedSectorType, setSelectedSectorType] = useState(sentimentType[0]);
    const [selectedCompanyType, setSelectedCompanyType] = useState(sentimentType[0]);
    const [selectedTasiType, setSelectedTasiType] = useState(sentimentType[0]);
    const [pageCompany, setPageCompany] = useState(1);
    const [pageSector, setPageSector] = useState(1);
    const [pageTASI, setPageTASI] = useState(1);
    const [pageCompanySize, setPageCompanySize] = useState(10);
    const [pageSectorSize, setPageSectorSize] = useState(10);
    const [pageTASISize, setPageTASISize] = useState(10);
    const [TASIcardCount, setTASIcardCount] = useState();
    const [companyCardCount, setCompanyCardCount] = useState();
    const [sectorCardCount, setSectorCardCount] = useState();    
    const [selectedSector, setSelectedSector] = useState('financial_services');
    const [availableSectors, setAvailableSectors] = useState([]);
    const [stockSector, setStockSector] = useState("");
    const llm_models = [
        "deepseek-r1-distill-llama-70b",
        "llama-3.3-70b-versatile",
        "openai/gpt-oss-120b",
        "qwen/qwen3-235b-a22b-2507",
        "gpt-5",
        "gpt-5-mini",
        "gpt-4o",
        "gpt-4o-mini"    
    ]
    const [selectedModel, setSelectedModel] = useState(llm_models[3]);

    const { selectedScheme } = useColorDropdown();
    const token = localStorage.getItem("token");

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

        try {
            const response_top_ner_sentiment = await axios.get(
                `${BACKEND_URL}api/v1/sentiments/top-ner-sentiments?entity_id=${selectedTicker}&sentiment_type=${selectedCompanyType}&llm_model=${selectedModel}&page=${pageCompany}&page_size=${pageCompanySize}&info_filter=${companyInfoFilter}`
            , 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
            if (response_top_ner_sentiment.data.length === 0) {
                setCompanyTopNorError(true);
                setCompanyTopNerSentiment([]);
            } else {
                setCompanyTopNorError(false);
                setCompanyTopNerSentiment(response_top_ner_sentiment.data);
            }
        } catch (error) {
            console.error("Failed to fetch top NER sentiment for company:", error);
            setCompanyTopNorError(true);
        }
    };

    console.log("companyError:", companytopNorError)

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

    const fetchSelectedSectorSentiment = async () => {
        try {
            const response_top_ner_sentiment = await axios.get(
                `${BACKEND_URL}api/v1/sentiments/top-ner-sentiments?entity_id=${selectedSector}&sentiment_type=${selectedSectorType}&llm_model=${selectedModel}&page=${pageSector}&page_size=${pageSectorSize}&info_filter=${sectorInfoFilter}`
            ,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            } 
        );
            if (response_top_ner_sentiment.data.length === 0) {
                setSectorTopNorError(true);
                setSectorTopNerSentiment([]);
            } else {
                setSectorTopNorError(false);
                setSectorTopNerSentiment(response_top_ner_sentiment.data);
            }
        } catch (error) {
            console.error("Failed to fetch top NER sentiment for sector:", error);
            setSectorTopNorError(true);
        }
    };


    const fetchTASI = async () => {
        try {
            const response_top_ner_sentiment = await axios.get(
                `${BACKEND_URL}api/v1/sentiments/top-ner-sentiments?entity_id=TASI&sentiment_type=${selectedTasiType}&llm_model=${selectedModel}&page=${pageTASI}&page_size=${pageTASISize}&info_filter=${TasiInfoFilter}`
            ,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
            setTasiTopNerSentiment(response_top_ner_sentiment.data);
        } catch (error) {
            console.error("Failed to fetch TASI top NER sentiment:", error);
        }
    };


    const fetchCompanyCardCount = async() => {
        try {
            const companyResponse = await axios.get(`${BACKEND_URL}api/v1/sentiments/sentiments-cards-count?entity_id=${selectedTicker}&llm_model=${selectedModel}&sentiment_type=${selectedCompanyType}`, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setCompanyCardCount(companyResponse.data.count);
        } catch (error) {
            console.error("Unable to fetch company Card count");
        }
    }

    const fetchSectorCardCount = async() => {
        try {
            const sectorResponse = await axios.get(`${BACKEND_URL}api/v1/sentiments/sentiments-cards-count?entity_id=${selectedSector}&llm_model=${selectedModel}&sentiment_type=${selectedSectorType}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setSectorCardCount(sectorResponse.data.count);
        } catch (error) {
            console.error("Unable to fetch sector Card count");
        }
    }

    const fetchTASICardCount = async() => {
        try {
            const tasiResponse = await axios.get(`${BACKEND_URL}api/v1/sentiments/sentiments-cards-count?entity_id=TASI&llm_model=${selectedModel}&sentiment_type=${selectedTasiType}`, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setTASIcardCount(tasiResponse.data.count);
        } catch (error) {
            console.error("Unable to fetch TASI Card count");
        }
    }

    useEffect(() => {
        fetchCompanyCardCount();
    }, [selectedTicker, companyInfoFilter, selectedCompanyType, selectedModel])

    useEffect(() => {
        fetchSectorCardCount();
    }, [selectedSector, sectorInfoFilter, selectedSectorType, selectedModel])

    useEffect(() => {
        fetchTASICardCount();
    }, [TasiInfoFilter, selectedTasiType, selectedModel])

    useEffect(() => {
        fetchCompanySentiment();
    }, [selectedTicker, companyInfoFilter, selectedCompanyType, pageCompany, pageCompanySize, selectedModel]);

    useEffect(() => {
        fetchAvailableSectors();
    }, []);

    useEffect(() => {
        fetchSelectedSectorSentiment();
    }, [selectedSector, sectorInfoFilter, selectedSectorType, pageSector, pageSectorSize, selectedModel]);

    useEffect(() => {
        fetchTASI();
    }, [TasiInfoFilter, selectedTasiType, pageTASI, pageTASISize, selectedModel]);

    useEffect(() => {
        if (stockSector) {
            setSelectedSector(stockSector);
        }
    }, [stockSector]);

    return (
        <div className="p-2 w-full px-30 overflow-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-bold" style={{ color: selectedScheme.headingColor }}>{selectedName} Sentiment Analysis</h2>
                <AverageDropDown
                    averages={llm_models.map(model => ({
                        id: model,
                        name: model
                    }))}
                    onSelect={(type) => setSelectedModel(type)}
                    selected={selectedModel}
                    wid={"200px"}
                    hei={"fit"}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <div className='flex items-end'>
                    <SentimentToggle
                        title="Company Sentiments"
                        name="company_sentiment"
                        setSelectedSectorType={setSelectedCompanyType}
                        selectedSectorType={selectedCompanyType}
                    />
                    <div className='w-20'>
                        <StocksData onItemSelected={setSelectedTicker} onSelectedName={setSelectedName} width={240} design={"top-30 left-40"}/>
                    </div>
                </div>
                <div className='relative flex items-end gap-3'>
                    <SentimentToggle
                        title="Sector Sentiments"
                        name="sector_sentiment"
                        setSelectedSectorType={setSelectedSectorType}
                        SelectedSectorType={selectedSectorType}
                    />
                    <AverageDropDown
                        averages={availableSectors.map(sector => ({
                            id: sector,
                            name: sector
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, char => char.toUpperCase())
                        }))}
                        onSelect={(type) => setSelectedSector(type)}
                        selected={selectedSector}
                        wid="300px"
                        hei="300px"
                    />
                </div>
                <div>
                    <SentimentToggle
                        title="Market Sentiments"
                        name="sentiment_duration"
                        setSelectedSectorType={setSelectedTasiType}
                        SelectedSectorType={selectedTasiType}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-5">
                <div className={`flex flex-col gap-3`}>
                    <AnalChart sentiments={companyTopNerSentiment} page={pageCompany} setPage={setPageCompany} pageSize={pageCompanySize} setPageSize={setPageCompanySize} cardCount={companyCardCount} setCardCount={setCompanyCardCount} infoFilter={companyInfoFilter} setInfoFilter={setCompanyInfoFilter} error={companytopNorError}/>
                </div>

                <div className={`flex flex-col gap-3`}>
                    <div>
                        <AnalChart  sentiments={sectorTopNerSentiment} page={pageSector} setPage={setPageSector} pageSize={pageSectorSize} setPageSize={setPageSectorSize} cardCount={sectorCardCount} setCardCount={setSectorCardCount} infoFilter={sectorInfoFilter} setInfoFilter={setSectorInfoFilter} error={sectortopNorError}/>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <AnalChart sentiments={tasiTopNerSentiment} page={pageTASI} setPage={setPageTASI} pageSize={pageTASISize} setPageSize={setPageTASISize} cardCount={TASIcardCount} setCardCount={setTASIcardCount} infoFilter={TasiInfoFilter} setInfoFilter={setTasiInfoFilter} error={false} />
                </div>
            </div>

        </div>
    );
};

export default Analysis;
