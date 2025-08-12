import React from 'react';
import { sentimentType } from '../../lib/data';
import SentimentDropdown from './SentimentTypeDropDown';
import AverageDropDown from './AverageDropDown';
import { useColorDropdown } from '../../Context/Theme';

const SentimentToggle = ({ title, setSelectedSectorType, selectedSectorType }) => {
    const { selectedScheme } = useColorDropdown();
    return (
        <div className="px-3 py-2 rounded-2xl border border-gray-500 lg:w-fit mt-2">
            <div className='flex items-center md:justify-start justify-center gap-2'>
                <h3 className="font-semibold text-sm my-1" style={{ color: selectedScheme.headingColor }}>{title}</h3>
            </div>
            <SentimentDropdown
                sentimentType={sentimentType}
                selected={selectedSectorType}
                onSelect={(type) => setSelectedSectorType(type)}
                wid={"125px"}
            />
        </div>
    )
};

export default SentimentToggle;
