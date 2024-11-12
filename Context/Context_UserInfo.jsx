import { useState, createContext } from "react";

// Create the context
export const UserInfoContext = createContext();

// Create the provider component
export const UserProvider = ({children}) => {
    const [publicFullName, setPublicFullName] = useState();  
    const [publicEmail, setPublicEmail] = useState();
    const [publicNotificationToken, setPublicNotificationToken] = useState();
    const [publicNotificationCount, setPublicNotificationCount] = useState(null);
    const [publicNotification, setPublicNotification] = useState();


    const [updateData, setUpdateData] = useState('')
    return (
        <UserInfoContext.Provider value={{  publicFullName, setPublicFullName, 
                                            publicEmail, setPublicEmail,
                                            publicNotificationToken, setPublicNotificationToken,
                                            publicNotificationCount, setPublicNotificationCount,
                                            publicNotification, setPublicNotification,
                                            updateData, setUpdateData
                        
         
                                            
                                            }}>
            {children}
        </UserInfoContext.Provider>
    );
};
