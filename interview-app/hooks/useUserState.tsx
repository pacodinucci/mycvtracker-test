import { useContext, createContext, useState, useCallback, ReactElement, useEffect } from "react";
import { SignupUserObject, UserObject } from "../types/auth_types";
import { clearLocalStorage, clearSessionStorage } from "../utils/storage-utils";
import { useToast } from "./useToast";
import { sendAddUser, sendLoginUser } from "../apis/mycvtracker";
import { alerts } from "../utils/alert-utils";
import { useRouter } from "next/router";
import { getUserfromStorage } from "../apis/mycvtracker/auth";

type ContextType = {
  user: UserObject | null;
  isLoading: boolean;
  token: string;
  loginUser: (email: string, password: string, rememberme: boolean) => Promise<void>;
  signupUser: (user: SignupUserObject) => void;
  logoutUser: () => void;
};

const UserContext = createContext<ContextType>({
  user: null,
  isLoading: true,
  token: "",
  loginUser: () => Promise.resolve(),
  signupUser: () => {},
  logoutUser: () => {},
});

export const useUserState = () => useContext(UserContext);

export const UserStateProvider = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const [user, setUser] = useState<null | UserObject>(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { showErrorToast, showSuccessToast } = useToast();

  useEffect(() => {
    const response = getUserfromStorage();
    if (response === null) {
      setUser(null);
      setToken("");
    } else {
      setToken(response.token);
      setUser(response.user);
    }
    setIsLoading(false);
  }, []);
  const loginUser = useCallback(
    async (email: string, password: string, rememberme: boolean) => {
      try {
        const response = await sendLoginUser(email, password, rememberme);
        if (response) {
          setUser(response.user);
          setToken(response.token);
        }
      } catch (e: any) {
        showErrorToast(alerts[e?.response.status || "undefined"].message);
      }
    },
    [showErrorToast]
  );

  const signupUser = useCallback(
    async (user: SignupUserObject) => {
      try {
        const response = await sendAddUser(user);
        router.replace("/login");
        showSuccessToast(alerts.regsitrationSuccess.message);
      } catch (e: any) {
        console.log(e);
        showErrorToast(alerts[e.response.status].message);
      }
    },
    [showSuccessToast, showErrorToast, router]
  );

  const logoutUser = useCallback(() => {
    setUser(null);
    clearLocalStorage();
    clearSessionStorage();
    showSuccessToast("Logout Successfully");
  }, [showSuccessToast]);

  return (
    <UserContext.Provider value={{ user, isLoading, token, loginUser, logoutUser, signupUser }}>
      {children}
    </UserContext.Provider>
  );
};
