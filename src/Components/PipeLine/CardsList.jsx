import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useColorDropdown } from '../../Context/Theme';

const CardsList = ({ sentiments, pageSize, setPageSize, setClickeUrl }) => {
    const { selectedScheme } = useColorDropdown();

    if (!Array.isArray(sentiments)) {
        console.error("Expected `sentiments` to be an array but got:", sentiments);
        return null; 
    }

    return (
        <div>
            <div className="w-full overflow-y-auto space-y-6 h-[700px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {sentiments.map((sentiment, index) => (
                    <div
                        key={index}
                        className="rounded-2xl p-6 border border-gray-500"
                    >
                        <a 
                            onClick={() => setClickeUrl(sentiment.url)} 
                            className="flex cursor-pointer flex-col gap-3 text-sm leading-relaxed"
                        >
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2" style={{ color: selectedScheme.headingColor }}>
                                    <span className="font-semibold">Date:</span>
                                    <span>{sentiment.date.substring(0, 10)}</span>
                                </div>
                            </div>
                            <div>
                                <Tooltip 
                                    title={
                                        <pre 
                                            style={{
                                                fontSize: '0.75rem',
                                                whiteSpace: 'pre-wrap',
                                                maxWidth: '400px',
                                                overflowX: 'auto',
                                                padding: '8px',
                                                borderRadius: '6px',
                                                background: selectedScheme.backgroundColor,
                                                color: selectedScheme.textColor
                                            }}
                                        >
                                            {JSON.stringify(sentiment.analysis, null, 2)}
                                        </pre>
                                    } 
                                    arrow 
                                    placement="right"
                                >
                                    <p 
                                        className="mt-1 ml-1 cursor-pointer" 
                                        style={{ textDecoration: 'underline dotted' }}
                                    >
                                        {sentiment.llm_notes || '-'}
                                    </p>
                                </Tooltip>
                            </div>
                        </a>
                    </div>
                ))}
            </div>

            <div className='flex items-center gap-3 my-3 justify-end'>
                {[10, 20, 30].map((item, index) => (
                    <Button 
                        key={index} 
                        onClick={() => setPageSize(item)} 
                        variant="contained" 
                        color="white" 
                        sx={{ 
                            borderRadius: 10, 
                            border: "1px solid gray", 
                            fontSize: '8px', 
                            color: selectedScheme.headingColor, 
                            py: .1, 
                            borderColor: pageSize === item ? selectedScheme.selectedButton : "gray"
                        }}
                    >
                        {item}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CardsList;
