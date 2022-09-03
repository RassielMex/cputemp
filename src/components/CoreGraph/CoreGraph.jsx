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
import { getData } from "../../common/fetchData";
import colors from "../../common/barColors";
import { labelsFromTime } from "../../common/createLabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CoreGraph = () => {
  const [data, setData] = useState([]);
  const [core, setCore] = useState(4);

  const endPoint =
    core >= 4
      ? `http://back.servicecloudlmex.co/api/v1/cpu_load`
      : `http://back.servicecloudlmex.co/api/v1/cpu_load?code=core_${core}`;

  useEffect(() => {
    getData(endPoint, setData);
    const id = setInterval(() => {
      getData(endPoint, setData);
    }, 60000);
    return () => {
      clearInterval(id);
    };
  }, [endPoint]);

  const createDataSets = () => {
    if (core >= 4) {
      const core0 = data.filter((d) => {
        return d.core_code === "core_0";
      });
      const core1 = data.filter((d) => {
        return d.core_code === "core_1";
      });
      const core2 = data.filter((d) => {
        return d.core_code === "core_2";
      });
      const core3 = data.filter((d) => {
        return d.core_code === "core_3";
      });
      return core0.map((_core0, idx) => {
        return Math.round(
          (_core0?.value +
            core1[idx]?.value +
            core2[idx]?.value +
            core3[idx]?.value) /
            4
        );
      });
    } else {
      return data.map((d) => {
        return d.value;
      });
    }
  };

  const graphData = {
    labels:
      core >= 4
        ? labelsFromTime(
            data.filter((d) => {
              return d.core_code === "core_0";
            })
          )
        : labelsFromTime(data),
    datasets: [
      {
        label: core >= 4 ? "Core usage" : `Core  ${core + 1} usage`,
        data: createDataSets(),
        backgroundColor: colors.secondary,
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
      { value: 0, inner: "Core 1" },
      { value: 1, inner: "Core 2" },
      { value: 2, inner: "Core 3" },
      { value: 3, inner: "Core 4" },
      { value: 4, inner: "Promedio" },
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

export default CoreGraph;
