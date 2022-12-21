import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import colors from "../../common/barColors";
import { labelsFromTime } from "../../common/createLabels";
import { stringDateFormatter } from "../../common/stringFormatter";

export const coreSlice = createSlice({
  name: "core",
  initialState: {
    core: 4,
    graphData: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: colors.primary,
        },
      ],
    },
    success: false,
  },
  reducers: {
    set: (state, action) => {
      const data = action.payload;
      if (state.core >= 4) {
        //Get all cores data
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
        //Get and set sum result of all cores
        state.graphData.datasets[0].data = core0.map((_core0, idx) => {
          return Math.round(
            _core0?.value +
              core1[idx]?.value +
              core2[idx]?.value +
              core3[idx]?.value
          );
        });
        state.graphData.datasets[0].label = `Core usage`;
        state.graphData.labels = labelsFromTime(
          data.filter((d) => {
            return d.core_code === "core_0";
          })
        );
      } else {
        //Single core selection
        state.graphData.datasets[0].data = data.map((d) => {
          return d.value;
        });
        state.graphData.datasets[0].label = `Core  ${state.core + 1} usage`;
        state.graphData.labels = labelsFromTime(data);
      }
    },
    failRequest: (state) => {
      state.core = 4;
      state.success = false;
    },
    setCore: (state, action) => {
      state.core = action.payload;
    },
  },
});

export const fecthCoreLoad = (core, dateTime) => {
  //Set end point and selected core
  const _core = core >= 0 ? core : 4;
  const date = new Date(dateTime);
  const strDate = stringDateFormatter(date).slice(0, 10);
  const hour = stringDateFormatter(date).slice(11, 13);

  const endPoint =
    core >= 4
      ? `https://back.servicecloudlmex.co/api/v1/cpu_load`
      : `https://back.servicecloudlmex.co/api/v1/cpu_load?code=core_${_core}&date=${strDate}&hour=${hour}`;

  return async (dispatch) => {
    dispatch(setCore(_core));
    //Get request
    try {
      const requestData = axios.get(endPoint);

      if ((await requestData).status === 200) {
        const data = (await requestData).data;
        dispatch(set(data));
      } else {
        dispatch(failRequest());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Action creators are generated for each case reducer function
export const { set, failRequest, setCore } = coreSlice.actions;

export default coreSlice.reducer;
