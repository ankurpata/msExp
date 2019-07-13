
const initialState = {
    heading : {h1Text: "New Cars", h2Text: "xxx Cars found for your search", metaTags : []},
};

export function headingReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_HEADING':
            return Object.assign({}, state, {heading: action.heading});
            break;
        default:
            return state;
            break;
}
}
