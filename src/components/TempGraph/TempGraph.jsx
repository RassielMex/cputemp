import React, { useEffect, useState } from "react";
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
import SelectList from "../SelectList/SelectList";
import { options } from "./TempGraph.Config";
import { useDispatch, useSelector } from "react-redux";
import { fecthTempData } from "../../store/slices/tempSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TempGraph = () => {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => {
    return state.temp.graphData;
  });
  const [core, setCore] = useState(0);

  useEffect(() => {
    dispatch(fecthTempData(core));

    const id = setInterval(() => {
      dispatch(fecthTempData(core));
    }, 60000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch, core]);

  const handleChange = (value) => {
    setCore(value);
    dispatch(fecthTempData(value));
  };

  const selectConfig = {
    labelID: "core_label",
    label: "Core",
    selectID: "select_core",
    items: [
      { value: 0, inner: "Core 0" },
      { value: 1, inner: "Core 1" },
    ],
  };

  return (
    <>
      <SelectList selectConfig={selectConfig} handleChange={handleChange} />
      <Bar data={graphData} options={options} />
    </>
  );
};

export default TempGraph;
