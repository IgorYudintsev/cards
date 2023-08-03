export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key: string) => {
  try {
    const serializedState = JSON.stringify(true);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};

export const deleteState = () => {
  localStorage.removeItem("myCards");
};

/*
функция для проверки: нужно дать все карточки, или только свои
userID-берем из const userIDfromProfile = useAppSelector((state) => state.auth.profile!._id);
params-это - { packName: title, pageCount: 8 }
 */

export const localHelper = (key: string, userID: string, params: Object) => {
  return loadState(key) ? { ...params, user_id: userID } : params;
};
