import React, { createContext, useState } from 'react';

export const BagContext = createContext({}); 

export const BagProvider = props => {
    const [bag, setBag] = useState([]);
    const [totalItems, setTotalItems] = useState();
    return (
        <BagContext.Provider value={{ bagArr: [bag, setBag], totalItemsValue: [totalItems, setTotalItems]}}>
            {props.children}
        </BagContext.Provider>
    );
}

