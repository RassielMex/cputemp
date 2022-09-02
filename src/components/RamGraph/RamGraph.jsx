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
import { Button, Stack } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { options } from "./RamGraph.Config";
import { getData } from "../../common/fetchData";
import { labelsFromTime } from "../../common/createLabels";
import colors from "../../common/barColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RamGraph = () => {
  const [data, setData] = useState([]);
  const endPoint = `http://back.servicecloudlmex.co/api/v1/temp_list/?view=code&code=core_0`;

  useEffect(() => {
    setInterval(() => {
      getData(endPoint, setData);
    }, 1000);
  }, [endPoint]);

  const dataRamAvailable = data.map((d) => {
    return d.ram.value_available;
  });
  const dataRamUsed = data.map((d) => {
    return d.ram.value_used;
  });

  const graphData = {
    labels: labelsFromTime(data),
    datasets: [
      {
        label: "Ram Used",
        data: dataRamUsed,
        backgroundColor: colors.warning,
      },

      {
        label: "Ram Available",
        data: dataRamAvailable,
        backgroundColor: colors.success,
      },
    ],
  };

  return (
    <>
      <Bar data={graphData} options={options} />
    </>
  );
};

export default RamGraph;
