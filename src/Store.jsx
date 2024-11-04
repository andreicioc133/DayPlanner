import {useState, useContext, createContext} from 'react';

export const AppContext = createContext({});

function Store(props) {
  const [lightTheme, setLightTheme] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isNewPlanAdded, setIsNewPlanAdded] = useState(false);
  return (
    <AppContext.Provider
      value={{
        lightTheme,
        setLightTheme,
        selectedDate,
        setSelectedDate,
        isTaskModalVisible,
        setIsTaskModalVisible,
        isNewPlanAdded,
        setIsNewPlanAdded,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default Store;
