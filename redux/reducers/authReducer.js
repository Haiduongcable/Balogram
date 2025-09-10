const initState = {
    token: null
}

const STORE_TOKEN = 'STORE_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const storeToken = (token) => ({ type: STORE_TOKEN, payload: token });
export const removeToken = () => ({ type: REMOVE_TOKEN });

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case STORE_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }
        case REMOVE_TOKEN:
            return {
                ...state,
                token: null,
            }
        default: return state;
    }
}

export default authReducer;