export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("myCards");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = () => {
  try {
    const serializedState = JSON.stringify(true);
    localStorage.setItem("myCards", serializedState);
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

export const localHelper = (userID: string, params: Object) => {
  return loadState() ? { ...params, user_id: userID } : params;
};
