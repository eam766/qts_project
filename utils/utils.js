export const parseJson = (jsonString) => {
    if (jsonString && jsonString.trim() !== '') {
        try {
            return JSON.parse(jsonString.trim());
        } catch (error) {
            console.error('Failed to parse JSON:', error);
        }
    }
    return null;
};
