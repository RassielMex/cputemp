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
import GraphForm from "../GraphForm/GraphForm";
import { getData } from "../../common/fetchData";
import { options } from "./TempGraph.Config";
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

const TempGraph = () => {
  const [data, setData] = useState([]);
  const [core, setCore] = useState(0);

  const endPoint = `http://back.servicecloudlmex.co/api/v1/temp_list/?view=code&code=core_${core}`;

  useEffect(() => {
    getData(endPoint, setData);
  }, [endPoint]);

  const dataTemp = data.map((d) => {
    return d.temp.value;
  });

  const graphData = {
    labels: labelsFromTime(data),
    datasets: [
      {
        label: `Core  ${core}`,
        data: dataTemp,
        backgroundColor: colors.primary,
      },
    ],
  };

  const onCpuChange = (_core) => {
    setCore(_core);
  };

  const onRefresh = () => {
    getData(core);
  };

  return (
    <>
      <GraphForm
        handleChange={onCpuChange}
        core={core}
        handleClick={onRefresh}
      />
      <Bar data={graphData} options={options} />
    </>
  );
};

export default TempGraph;
