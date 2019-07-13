
const initialState = {
    guideArray: []
};

export function guideReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_GUIDES':
            return Object.assign({}, state, {guideArray: action.guideArray});
            break;
        default:
            return state;
            break;
}
}
