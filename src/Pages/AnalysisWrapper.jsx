import { useOutletContext } from "react-router-dom";
import Analysis from "./Analysis";
import React from "react";

export default function AnalysisWrapper() {
  const { selectedTicker, selectedName, setSelectedTicker, setSelectedName } = useOutletContext();
  return <Analysis selectedTicker={selectedTicker} selectedName={selectedName} setSelectedName={setSelectedName} setSelectedTicker={setSelectedTicker} />;
}
