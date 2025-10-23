import React, { createContext, useState } from 'react'

export const datacontext = createContext("");
export const dltcontext = createContext("");
export const updatecontext = createContext("");
export const searchcontext = createContext("");

const Contextprovider = ({ children }) => {

    const [state, setState] = useState("");
    const [dlt, setDlt] = useState("");
    const [update, setUpdate] = useState("");
    const [search, setSearch] = useState("");

    return (
        <>
            <datacontext.Provider value={{ state, setState }}>
                <dltcontext.Provider value={{ dlt, setDlt }}>
                    <updatecontext.Provider value={{ update, setUpdate }}>
                        <searchcontext.Provider value={{search, setSearch}}>
                            {children}
                        </searchcontext.Provider>
                    </updatecontext.Provider>
                </dltcontext.Provider>
            </datacontext.Provider>
        </>
    )
}

export default Contextprovider;
