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
import axios from "axios";
import GraphForm from "../GraphForm/GraphForm";

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

  const getData = (_core) => {
    const endPoint = `http://back.servicecloudlmex.co/api/v1/temp_list/?view=code&code=core_${_core}`;
    axios
      .get(endPoint)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData(core);
  }, [core]);

  const dataTemp = data.map((d) => {
    return d.temp.value;
  });
  const labels = data.map((d) => {
    return `${d.time.hour}:${d.time.minute < 10 ? "0" : ""}${d.time.minute}hrs`;
  });

  const graphData = {
    labels,
    datasets: [
      {
        label: `Core  ${core}`,
        data: dataTemp,
        backgroundColor: "rgba(90, 150, 12, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature",
      },
    },
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
