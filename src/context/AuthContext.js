import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    user: {
        _id: "609c77cb7055d65afc933910",
        username: "Yui",
        email: "yui@gmail.com",
        profilePicture: "person/1.jpeg",
        coverPicture: "",
        isAdmin: false,
        followers: ["609cafb4c342955f70c6721a"],
        followings: ["609c77bf7055d65afc93390f", "609cafb4c342955f70c6721a"]
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user:state.user, 
            isFetching: state.isFetching, 
            error: state.error, 
            dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}