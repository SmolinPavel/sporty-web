class LocalStorageHelper {
    static addItem(key, value) {
        return localStorage.setItem(key, value);
    }

    static addItems(data) {
        data.forEach(item => {
            const { key, value } = item;
            LocalStorageHelper.addItem(key, value);
        });
    }

    static getItem(key) {
        return localStorage.getItem(key);
    }

    static removeItem(key) {
        return localStorage.removeItem(key);
    }

    static removeItems(data) {
        data.forEach(item => {
            LocalStorageHelper.removeItem(item);
        });
    }
}

export default LocalStorageHelper;
