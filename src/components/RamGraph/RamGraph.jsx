import React, { useEffect } from "react";
import {
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  Chart as ChartJS,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { options } from "./RamGraph.Config";
import { useDispatch, useSelector } from "react-redux";
import { fecthRamData } from "../../store/slices/ramSlice";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RamGraph = () => {
  const dispatch = useDispatch();

  const graphData = useSelector((state) => state.ram.graphData);

  useEffect(() => {
    dispatch(fecthRamData());
    const id = setInterval(() => {
      dispatch(fecthRamData());
    }, 60000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <>
      <Bar data={graphData} options={options} style={{ marginTop: "3rem" }} />
    </>
  );
};

export default RamGraph;
