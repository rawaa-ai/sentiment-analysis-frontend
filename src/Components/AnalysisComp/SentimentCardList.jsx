import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useColorDropdown } from '../../Context/Theme';

const SentimentCardList = ({ sentiments, pageSize, setPageSize }) => {
    const [height, setHeight] = useState(200);
    const { selectedScheme } = useColorDropdown();

    useEffect(() => {
        const updateHeight = () => {
            const headerOffset = 10;
            const availableHeight = window.innerHeight - headerOffset;
            setHeight(availableHeight);
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    if (!Array.isArray(sentiments)) {
        console.error("Expected `sentiments` to be an array but got:", sentiments);
        return null; 
    }

    return (
        <div>
            <div className="w-full overflow-y-auto space-y-6 " style={{ height: "1300px", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {sentiments.map((sentiment, index) => (
                    <div
                        key={index}
                        className="rounded-2xl p-6 border border-gray-500"
                    >
                        <a href={sentiment.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 text-sm  leading-relaxed">
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2" style={{ color: selectedScheme.headingColor }}>
                                    <span className="font-semibold">Date:</span>
                                    <span>{sentiment.date.substring(0, 10)}</span>
                                </div>
                            </div>
                            <div>
                                <p className="mt-1 ml-1 ">{sentiment.llm_notes || '-'}</p>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold " style={{ color: selectedScheme.headingColor }} >Relevance:</span>
                                    <span className={`${sentiment.relevance === "direct" ? selectedScheme.relevance : selectedScheme.relevanceLow }`}>{sentiment.relevance}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold " style={{ color: selectedScheme.headingColor }} >Short-Term:</span>
                                    <span className={`${sentiment.short_term_sentiment > 0 ? selectedScheme.shortTerm : selectedScheme.shortTermLow }`}>{sentiment.short_term_sentiment.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold " style={{ color: selectedScheme.headingColor }} >Long-Term:</span>
                                    <span className={`${sentiment.long_term_sentiment > 0 ? selectedScheme.longTerm : selectedScheme.longTermLow }`}>{sentiment.long_term_sentiment.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold " style={{ color: selectedScheme.headingColor }} >Importance:</span>
                                    <span className={`${sentiment.importance > 0.7 ? `text-${selectedScheme.importanceColor}` : sentiment.importance > 0.4 ? selectedScheme.importanceLow : selectedScheme.importanceLow2}`}>{sentiment.importance}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <div className='flex items-center gap-3 my-3 justify-end'>
                {[10, 20, 30].map((item, index) => (
                    <Button key={index} onClick={() => setPageSize(item)} variant="contained" color="white" sx={{ borderRadius: 10, border: "1px solid gray", fontSize: '8px', color: selectedScheme.headingColor, py: .1, borderColor: pageSize === item ? selectedScheme.selectedButton : "gray"}}>{item}</Button>
                ))}
            </div>
        </div>
    );
};

export default SentimentCardList