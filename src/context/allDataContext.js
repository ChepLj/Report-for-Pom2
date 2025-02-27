import React, { createContext, useState } from "react";

const AllDataContext = createContext();

export const AllDataProvider = ({ children }) => {
  const [allData, setAllData] = useState('test');
  // console.log("🚀 ~ ThemeProvider ~ allData:", allData)

 

  return (
    <AllDataContext.Provider value={{ allData, setAllData }}>
      {children}
    </AllDataContext.Provider>
  );
};

export default AllDataContext;
