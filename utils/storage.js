// Utility functions for Chrome storage API

// Save data to Chrome storage
export const saveToStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    } catch (error) {
      // Fallback to localStorage when testing outside of Chrome extension context
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (localStorageError) {
        reject(localStorageError);
      }
    }
  });
};

// Get data from Chrome storage
export const getFromStorage = (key) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get([key], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key]);
        }
      });
    } catch (error) {
      // Fallback to localStorage when testing outside of Chrome extension context
      try {
        const value = localStorage.getItem(key);
        resolve(value ? JSON.parse(value) : null);
      } catch (localStorageError) {
        reject(localStorageError);
      }
    }
  });
};

// Remove data from Chrome storage
export const removeFromStorage = (key) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.remove(key, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    } catch (error) {
      // Fallback to localStorage when testing outside of Chrome extension context
      try {
        localStorage.removeItem(key);
        resolve();
      } catch (localStorageError) {
        reject(localStorageError);
      }
    }
  });
};

// Clear all data from Chrome storage
export const clearStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.clear(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    } catch (error) {
      // Fallback to localStorage when testing outside of Chrome extension context
      try {
        localStorage.clear();
        resolve();
      } catch (localStorageError) {
        reject(localStorageError);
      }
    }
  });
};

// Get all data from Chrome storage
export const getAllFromStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(null, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items);
        }
      });
    } catch (error) {
      // Fallback for testing outside of Chrome extension context
      try {
        const items = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          items[key] = JSON.parse(localStorage.getItem(key));
        }
        resolve(items);
      } catch (localStorageError) {
        reject(localStorageError);
      }
    }
  });
};