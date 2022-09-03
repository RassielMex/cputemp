import axios from "axios";

export const getData = async (_endPoint, _setStateFunc) => {
  const data = axios
    .get(_endPoint)
    .then((response) => {
      //console.log(response.data);
      _setStateFunc(response.data);
    })
    .catch((e) => {
      _setStateFunc([]);
    });
  return data;
};
