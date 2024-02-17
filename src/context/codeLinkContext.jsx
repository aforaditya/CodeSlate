import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const CodeLinkProvider = ({ children }) => {
  const [codeLink, setCodeLink] = useState('');

  return (
    <MyContext.Provider value={{ codeLink, setCodeLink }}>
      {children}
    </MyContext.Provider>
  );
};

export const useCodeLinkContext = () => useContext(MyContext);
