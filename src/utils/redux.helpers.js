export const reduxAction = (type, payload = {}) => {
    return { type, ...payload }
};
