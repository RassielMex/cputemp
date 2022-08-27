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
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Stack } from "@mui/system";

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

  const getData = () => {
    const endPoint = `http://back.servicecloudlmex.co/api/v1/temp_list/?view=code&code=core_0`;
    axios
      .get(endPoint)
      .then((response) => {
        //console.log(response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const labels = data.map((d) => {
    return `${d.time.hour}:${d.time.minute < 10 ? "0" : ""}${d.time.minute}hrs`;
  });

  const dataRamAvailable = data.map((d) => {
    return d.ram.value_available;
  });
  const dataRamUsed = data.map((d) => {
    return d.ram.value_used;
  });

  const graphData = {
    labels,
    datasets: [
      {
        label: "Ram Used",
        data: dataRamUsed,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },

      {
        label: "Ram Available",
        data: dataRamAvailable,
        backgroundColor: "rgba(25, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Ram Usage",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const handleClick = () => {
    getData();
  };

  return (
    <>
      <Stack justifyContent={"end"} direction={"row"} marginTop="5rem">
        <Button
          variant="contained"
          color="warning"
          startIcon={<RefreshIcon />}
          onClick={handleClick}
        >
          Refresh
        </Button>
      </Stack>
      <Bar data={graphData} options={options} />
    </>
  );
};

export default RamGraph;
