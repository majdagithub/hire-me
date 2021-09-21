import React, { createContext } from 'react';
import axios from 'axios';

const ApiContext = createContext();
const { Provider } = ApiContext;

const ApiProvider = ({ children }) => {
  const auth = {
      authAxios : axios.create({baseURL: process.env.REACT_APP_API_URL}),
      authToken : process.env.REACT_APP_ACCESS_TOKEN
    };

  return (
    <Provider value={{auth}}>
      {children}
    </Provider>
  );
};

export { ApiContext, ApiProvider };