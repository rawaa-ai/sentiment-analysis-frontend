import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SentimentCardList from "./SentimentCardList";
import Navigation from "./Navigation";
import { Button } from "@mui/material";
import { useColorDropdown } from "../../Context/Theme";

const AnalChart = ({ selectedTicker, sentiments, sentimentType, page, setPage, pageSize, setPageSize, cardCount, setCardCount, infoFilter, setInfoFilter, error }) => {
    const [cardData, setCustomCards] = useState([]);
    const { selectedScheme } = useColorDropdown();

    const filteredSentiments = sentiments.filter(sentiment => {
        if (infoFilter === "important") {
            return sentiment;
        } else if (infoFilter === "latest") {
            return sentiment;
        }
        return true;
    });

    return (
        <div className={`relative w-full`} style={{ color: selectedScheme.textColor, background: selectedScheme.backgroundColor }}>
            <div className={`flex gap-3 items-center justify-between my-3 ${error ? "opacity-40 select-none pointer-events-none" : ""}`}>
                <div className='hidden md:block border border-gray-500 rounded-full px-5 text-xs' style={{ color: selectedScheme.headingColor }}>
                    {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, cardCount)} of {cardCount}
                </div>

                <div className='flex items-center gap-3'>
                    {["Latest", "Important"].map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => {
                                setCustomCards([]); 
                                setInfoFilter(item.toLowerCase());
                            }}
                            variant="contained"
                            color="white"
                            sx={{
                                borderRadius: 10,
                                border: "1px solid gray",
                                fontSize: '8px',
                                color: selectedScheme.headingColor,
                                py: .1,
                                borderColor: infoFilter === item.toLowerCase() ? selectedScheme.selectedButton : "gray"
                            }}
                        >
                            {item.toLowerCase()}
                        </Button>
                    ))}
                </div>

                <Navigation
                    sentiments={sentiments}
                    page={page}
                    setPage={setPage}
                    count={cardCount}
                />
            </div>

            {cardData.length > 0 ? (
                <SentimentCardList
                    sentiments={cardData}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            ) : (
                <SentimentCardList
                    sentiments={filteredSentiments}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            )}
        </div>
    );
};

export default AnalChart;
