import axios from "axios";

export const getData = (_endPoint, _setStateFunc) => {
  axios
    .get(_endPoint)
    .then((response) => {
      _setStateFunc(response.data);
    })
    .catch((e) => {
      _setStateFunc([]);
    });
};
