import {useState, useContext, createContext} from 'react';

export const AppContext = createContext({});

function Store(props) {
  const [lightTheme, setLightTheme] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <AppContext.Provider
      value={{
        lightTheme,
        setLightTheme,
        selectedDate,
        setSelectedDate,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default Store;
