const useLocalStorage = () => {
  const getItem = (key: string): string | null => localStorage.getItem(key);

  const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };

  return [getItem, setItem];
};

export default useLocalStorage;
