import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { useColorDropdown } from '../../Context/Theme';

const Navigation = ({ sentiments, page, setPage, count }) => {
    const {selectedScheme } = useColorDropdown();
    const handlePageIncrement = () => {
        if (sentiments.length === count) return;
        setPage(prev => prev + 1);
    }
    const handlePageDecrement = () => {
        setPage((prev) => prev === 1 ? 1 : prev - 1);
    }

    return (
        <div className='flex items-center gap-2'>
            <Button sx={{
                borderRadius: 10,
                textTransform: "none",
                bgcolor: selectedScheme.backgroundColor,
                color: selectedScheme.headingColor,
                display: "flex",
                alignItems: "center",
                border: "1px solid gray",
                py: .1,
                px: 3,
                gap: 1,
                fontSize: "8px",
                '&.Mui-disabled': {
                    color: selectedScheme.textColor,
                    borderColor: "gray", 
                }
            }}
                onClick={handlePageDecrement}
                disabled={sentiments.length === 0 || page === 1}
            >Previous</Button>
            <Button sx={{
                borderRadius: 10,
                textTransform: "none",
                bgcolor: selectedScheme.backgroundColor,
                color: selectedScheme.headingColor,
                display: "flex",
                alignItems: "center",
                border: "1px solid gray",
                py: .1,
                px: 3,
                gap: 1,
                fontSize: "8px",
                '&.Mui-disabled': {
                    color: selectedScheme.textColor,
                    borderColor: "gray", 
                }
            }}
                onClick={handlePageIncrement}
                disabled={count === sentiments.length}
            >Next</Button>
        </div>
    )
}

export default Navigation