import React, { useState } from 'react';

export const TokenContext = React.createContext('');

const TokenHolder = (props) => {

  const [value, setValue] = useState(false);

  return (<TokenContext.Provider value={{value, setValue}}>
    {props.children}
  </TokenContext.Provider>);
}

export default TokenHolder;