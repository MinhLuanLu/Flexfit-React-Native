import { useState, createContext } from "react";

// Create the context
export const ImageContext = createContext();

// Create the provider component
export const ImageProvider = ({children}) => {
   const [publicImageURL, setPublicImageURL] = useState();
    return (
        <ImageContext.Provider value={{ publicImageURL, setPublicImageURL }}>
            {children}
        </ImageContext.Provider>
    );
};
