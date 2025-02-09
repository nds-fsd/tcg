export const getStorageObject = (key) => {
    const item = localStorage.getItem(key);
    if (item !== null) {
        return JSON.parse(item);
    }
    return null;
};

export const setStorageObject = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object));
};

export const deleteStorageObject = (key) => {
    localStorage.removeItem(key);
};

export const getUserToken = () => {
    const session = getStorageObject('user-session');
    if (session) {
        return session.token;
    }
    return null;
};