import React, { useState } from "react";
import { useColorDropdown } from "../../Context/Theme";
import CardsList from "./CardsList";
import Navigation from "../AnalysisComp/Navigation";

const Cards = ({ sentiments, page, setPage, pageSize, setPageSize, cardCount, setClickeUrl }) => {
    const { selectedScheme } = useColorDropdown();

    return (
        <div className={`relative w-full`} style={{ color: selectedScheme.textColor, background: selectedScheme.backgroundColor }}>
            <div className={`flex gap-3 items-center justify-between my-3`}>
                <div className='hidden md:block border border-gray-500 rounded-full px-5 text-xs' style={{ color: selectedScheme.headingColor }}>
                    {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, cardCount)} of {cardCount}
                </div>

                <Navigation
                    sentiments={sentiments}
                    page={page}
                    setPage={setPage}
                    count={cardCount}
                />
            </div>
            <CardsList
                sentiments={sentiments}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setClickeUrl={setClickeUrl}
            />
        </div>
    );
};

export default Cards;
