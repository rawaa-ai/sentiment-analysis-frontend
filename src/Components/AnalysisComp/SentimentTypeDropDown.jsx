import React, { useState } from "react";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useColorDropdown } from "../../Context/Theme";

const SentimentDropdown = ({ sentimentType, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(sentimentType[0]);
    const { selectedScheme } = useColorDropdown(); 

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Button
                variant="contained"
                onClick={() => setOpen(!open)}
                sx={{
                    borderRadius: 10,
                    textTransform: "none",
                    backgroundColor: selectedScheme.backgroundColor,
                    color: selectedScheme.headingColor,
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid gray",
                    py: .4,
                    px: 3,
                    gap: 1,
                    fontSize: "10px",
                }}
            >
                {selectedItem.replace(/\b\w/g, char => char.toUpperCase())}
                <ExpandMoreIcon sx={{ fontSize: "16px" }} />
            </Button>

            <div
                style={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    backgroundColor: selectedScheme.backgroundColor,
                    border: "1px solid gray",
                    borderRadius: "10px",
                    minWidth: "90px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(-10px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    zIndex: 100,
                }}
            >
                {sentimentType.map((type, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedItem(type);
                            onSelect(type);
                            setOpen(false);
                        }}
                        style={{
                            padding: "8px 12px",
                            fontSize: "12px",
                            color: selectedScheme.headingColor,
                            cursor: "pointer",
                            borderBottom:
                                index !== sentimentType.length - 1 ? "1px solid gray" : "none",
                            transition: "background-color 0.2s ease",
                            pointerEvents: open ? "auto" : "none"
                        }}
                    >
                        {type.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentimentDropdown;
