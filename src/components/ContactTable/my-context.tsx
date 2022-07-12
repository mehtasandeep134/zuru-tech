import React, { useContext, useState } from 'react';

const MyContext = React.createContext({});

export function CardProvider({ children }: any) {
  const [selectedCard, setSelectedCard] = useState({});
  return (
    <MyContext.Provider value={{ selectedCard, setSelectedCard }}>{children}</MyContext.Provider>
  );
}

export const useCard = () => {
  return useContext(MyContext);
};
export default MyContext;
