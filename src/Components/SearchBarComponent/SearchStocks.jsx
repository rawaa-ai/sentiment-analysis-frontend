import React, { useEffect, useRef, useState } from 'react';
import { TextField,
  InputAdornment, 
  IconButton, 
  Collapse, 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import Fuse from 'fuse.js';
import { useColorDropdown } from '../../Context/Theme';

const StocksData = ({ onItemSelected, onSelectedName, width, design }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBarIsActive, setSearchIsActive] = useState(false);
  const inputRef = useRef();
  const [filteredItems, setFilteredItems] = useState([]);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [fuse, setFuse] = useState(null);

  const { selectedScheme } = useColorDropdown();

  const filteredData = (searchText) => {
    if (!searchText.trim()) {
      setFilteredItems([]);
      return;
    }
    const results = fuse.search(searchText);
    setFilteredItems(results.map(res => res.item));
  }

  const stocksBackend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${stocksBackend}api/v1/stocks/?filtered=false`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        const stock = response.data.map((item) => ({
          ticker: item.ticker,
          company: item.company_name,
        }));
        setData(stock);
        setFuse(new Fuse(stock, {
          keys: ['ticker', 'company'],
          threshold: .4,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = (item) => {
    console.log('Name:', item);

    if (!item || !item?.company || !item?.ticker) {
      console.error("Error unable to find the values!!");
      return;
    }
    setSearchText(item.company);
    onItemSelected(item.ticker);
    onSelectedName(item.company)
    console.log(item.company)
    setFilteredItems([]);
  }

  const handleToggleSearchBar = () => {
    setSearchIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (searchBarIsActive) {
      inputRef.current?.focus();
    }
  }, [searchBarIsActive]);

  const handleClear = () => {
    setSearchText('');
    setFilteredItems([]);
  };

  return (
    <div className='flex items-center'>
      <IconButton onClick={handleToggleSearchBar}>
        <SearchIcon
          sx={{
            borderRadius: '100%',
            color: selectedScheme.headingColor,
            p: 1,
            fontSize: '40px',
            border: "1px solid gray",
            transition: 'transform 0.5s ease',
            transform: searchBarIsActive ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
      </IconButton>

      <Collapse in={searchBarIsActive} timeout="auto" orientation="horizontal">
        <TextField
          autoFocus
          variant="outlined"
          placeholder="2222.SR"
          value={searchText}
          ref={inputRef}
          onChange={(e) => {
            const value = e.target.value;
            setSearchText(value);
            filteredData(value); 
          }}
          sx={{
            width: searchBarIsActive ? width || "300hv" : '0hv',
            borderRadius: 30,
            mt: .2,
            transition: 'width .5s ease',
            bgcolor: selectedScheme.backgroundColor,
            color: selectedScheme.headingColor,
            border: "1px solid gray" ,
            zIndex: 10000,
            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent', 
                borderRadius: 20,
               
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              }
            },
            '& input': {
              color: selectedScheme.headingColor,
              '&::placeholder': {
                color: selectedScheme.headingColor,
                opacity: 1
              },
            }
        }}
          InputProps={{
            endAdornment: searchText && (
              <InputAdornment position="start">
                <IconButton onClick={handleClear}>
                  <ClearIcon style={{ color: selectedScheme.textColor }}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Collapse>

      {filteredItems.length > 0 ? (
        <div className={`h-55 p-2.5 overflow-scroll absolute top-[210px] left-0 max-w-[500px] ${design} z-1000`}>
          <ul className=' mt-5'>
            {filteredItems.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)} className={`shadow-md cursor-pointer border border-gray-500 rounded-md p-3 m-1 w-full`} style={{
                background: selectedScheme.backgroundColor,
                color: selectedScheme.headingColor
              }}>
                {item.ticker} - {item.company}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default StocksData;
