import { createContext, useContext } from 'react';

const NavigationContext = createContext(null);

export const NavigationProvider = ({ value, children }) => (
  <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
);

export const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  if (!navigation) {
    throw new Error('useNavigation debe usarse dentro de NavigationProvider.');
  }

  return navigation;
};
