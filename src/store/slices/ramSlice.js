import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import colors from "../../common/barColors";
import { labelsFromTime } from "../../common/createLabels";

export const ramSlice = createSlice({
  name: "ram",
  initialState: {
    graphData: {
      labels: [],
      datasets: [
        { label: "Ram Used", data: [], backgroundColor: colors.warning },
        { label: "Ram Available", data: [], backgroundColor: colors.success },
      ],
    },
    fetchSuccess: false,
  },
  reducers: {
    set: (state, action) => {
      const data = action.payload;

      //Ram Used
      const ramUsed = data.map((d) => {
        return d.ram.value_used;
      });
      state.graphData.datasets[0].data = ramUsed;

      //Ram Avaible
      const ramAvailable = data.map((d) => {
        return d.ram.value_available;
      });
      state.graphData.datasets[1].data = ramAvailable;

      //Labels
      state.graphData.labels = labelsFromTime(action.payload);

      //Success
      state.fetchSuccess = true;
    },
    failRequest: (state) => {
      state.fetchSuccess = false;
    },
  },
});

const endPoint = `https://back.servicecloudlmex.co/api/v1/temp_list/?view=code&code=core_0`;

export const fecthRamData = () => {
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
export const { set, failRequest } = ramSlice.actions;

export default ramSlice.reducer;
