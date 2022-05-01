import { useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";

const useAuth = () => useContext(FirebaseAuthContext);

export default useAuth;
