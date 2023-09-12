import { createContext, useState, useContext } from 'react'
import { getTokenInLocalStorage } from '../hooks/service';

const initialSettings = {
    loggedIn: false,
    user: undefined,
    loading: false,
};
const AuthContext = createContext(initialSettings);


export function AuthProvider({ children }) {
    // const [ loading, setLoading] = useState(false);
    //    const token = getTokenInLocalStorage();
   const { data, loading, error } = useQuery(getTokenInLocalStorage);

    //    const loggedIn = token != null ? true : false;
   const loggedIn = data ;
    
   //    useEffect()

   const value = {
    loggedIn,
    token,
    loading,
  };
    
  console.log(value)

   return (
     <AuthContext.Provider value={value}>
        {children}
     </AuthContext.Provider>
   )
}

const useAuth = () => useContext(AuthContext);

export default useAuth;