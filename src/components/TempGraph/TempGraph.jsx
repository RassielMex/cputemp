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

    const id = setInterval(() => {
      getData(endPoint, setData);
    }, 60000);

    return () => {
      clearInterval(id);
    };
  }, [endPoint]);

  const dataTemp = data.map((d) => {
    return d.temp.value;
  });

  //console.log(dataTemp);

  const graphData = {
    labels: labelsFromTime(data),
    datasets: [
      {
        label: `Core ${core}`,
        data: dataTemp,
        backgroundColor: colors.primary,
      },
    ],
  };

  const onCoreChange = (_core) => {
    setCore(_core);
  };

  const select = {
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
      <SelectList
        handleChange={onCoreChange}
        value={core}
        selectConfig={select}
      />
      <Bar data={graphData} options={options} />
    </>
  );
};

export default TempGraph;
