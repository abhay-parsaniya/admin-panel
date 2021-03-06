const initialState = null; 

const Reducer = (state, action) => {
    if(action.type === "USER")
    {
        return action.payload;
    }
    if(action.type === "CLEAR")
    {
        return null;
    }
        return state;
};

export {Reducer, initialState};