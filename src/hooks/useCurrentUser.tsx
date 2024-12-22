import { useCallback, useEffect, useState } from "react";
import localSessionStorage from "./localSessionStorage";
import { StorageConstants } from "@/constants/StorageConstants";
// import { SignInModel } from "@/models/SignInModel";

// export const useCurrentUser = (): SignInModel | null => {
export const useCurrentUser = (): any | null => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getItem } = localSessionStorage();
  const fetchCurrentUser = useCallback(() => {
    const storedUser = getItem(StorageConstants.CURRENT_USER_OBJECT);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [getItem]);

  useEffect(() => {
    if (currentUser) {
      return currentUser;
    }
  }, [currentUser, fetchCurrentUser]); // Add `currentUser` and `fetchCurrentUser` as dependencies

  return currentUser;
};


//     const storedUser = getItem(StorageConstants.CURRENT_USER_OBJECT);
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);
//   return currentUser;
// };
