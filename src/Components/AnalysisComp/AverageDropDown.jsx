import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useColorDropdown } from "../../Context/Theme";

const AverageDropDown = ({ averages = [], onSelect, selected, wid, hei }) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Select");

    const { selectedScheme } = useColorDropdown();

    useEffect(() => {
        const matched = averages.find(item => item.id === selected);
        if (matched) {
            setSelectedItem(matched.name);
        }
    }, [selected, averages]);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Button
                variant="contained"
                onClick={() => setOpen(!open)}
                sx={{
                    borderRadius: 10,
                    textTransform: "none",
                    background: selectedScheme.backgroundColor,
                    color: selectedScheme.headingColor,
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid gray",
                    width: wid,
                    py: 0.4,
                    px: 3,
                    gap: 1,
                    fontSize: "10px",
                }}
            >
                <span
                    style={{
                        display: "inline-block",
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {selectedItem}
                </span>
                <ExpandMoreIcon sx={{ fontSize: "16px" }} />
            </Button>

            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "110%",
                        left: 0,
                        backgroundColor: selectedScheme.backgroundColor,
                        border: "1px solid gray",
                        borderRadius: "10px",
                        minWidth: wid,
                        overflow: "auto",
                        height: hei || "fit",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        zIndex: 100,
                    }}
                >
                    {averages.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                setSelectedItem(item.name);
                                onSelect(item.id);
                                setOpen(false);
                            }}
                            style={{
                                padding: "12px",
                                fontSize: "12px",
                                color: selectedScheme.headingColor,
                                cursor: "pointer",
                                borderBottom:
                                    index !== averages.length - 1 ? "1px solid gray" : "none",
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AverageDropDown;
