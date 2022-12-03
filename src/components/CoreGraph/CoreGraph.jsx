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
import { options } from "./CoreGraph.Config";
import { Stack } from "@mui/system";

import "./CoreGraph.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { fecthCoreLoad } from "../../store/slices/coreSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CoreGraph = () => {
  const dispatch = useDispatch();
  const graphData = useSelector((state) => {
    return state.core.graphData;
  });
  const [core, setCore] = useState(4);

  useEffect(() => {
    dispatch(fecthCoreLoad(core));
    const id = setInterval(() => {
      dispatch(fecthCoreLoad(core));
    }, 60000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch, core]);

  const onCoreChange = (_core) => {
    setCore(_core);
  };

  const onDateChange = (e) => {
    console.log(e.target.value);
  };

  const select = {
    labelID: "core_label",
    label: "Core",
    selectID: "select_core",
    items: [
      { value: 0, inner: "Core 1" },
      { value: 1, inner: "Core 2" },
      { value: 2, inner: "Core 3" },
      { value: 3, inner: "Core 4" },
      { value: 4, inner: "Total" },
    ],
  };

  return (
    <>
      <Stack direction={"row"} spacing={2} alignItems={"end"}>
        <SelectList handleChange={onCoreChange} selectConfig={select} />
        <input type={"date"} className="calendar" onChange={onDateChange} />
      </Stack>
      <Bar data={graphData} options={options} />
    </>
  );
};

export default CoreGraph;
