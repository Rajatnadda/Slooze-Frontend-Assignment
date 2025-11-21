export const setLocal = (k, v) => {
  localStorage.setItem(k, JSON.stringify(v));
};

export const getLocal = (k, fallback = null) => {
  try {
    const value = localStorage.getItem(k);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Error reading localStorage key "${k}":`, error);
    return fallback;
  }
};

export const removeLocal = (k) => localStorage.removeItem(k);
