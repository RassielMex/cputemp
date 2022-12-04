import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import colors from "../../common/barColors";
import { labelsFromTime } from "../../common/createLabels";

export const tempSlice = createSlice({
  name: "temp",
  initialState: {
    graphData: {
      labels: [],
      datasets: [
        {
          label: "Temperature",
          data: [],
          backgroundColor: colors.secondary,
        },
      ],
    },
    success: false,
  },
  reducers: {
    set: (state, action) => {
      const data = action.payload;
      //labels
      state.graphData.labels = labelsFromTime(data);
      //dataset
      const dataTemp = data.map((d) => {
        return d.temp.value;
      });
      state.graphData.datasets[0].data = dataTemp;
      //success, loading
      state.success = true;
      state.loading = false;
    },
    failRequest: (state) => {
      state.success = false;
    },
  },
});

export const fecthTempData = (core) => {
  const _core = core ? core : 0;
  const endPoint = `https://back.servicecloudlmex.co/api/v1/temp_list/?view=code&code=core_${_core}`;
  return async (dispatch) => {
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
export const { set, failRequest, setTempCore } = tempSlice.actions;

export default tempSlice.reducer;
