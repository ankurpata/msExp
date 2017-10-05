
const initialState = {
    hasErrored: false,
    similarLinksData: []
}
export function hasErrored(state = initialState, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return Object.assign({}, state, {hasErrored: action.hasErrored});
            break;
        default:
            return state;
}
}

export function similarLinksData(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_SIMILAR_LINKS':
            return Object.assign({}, state, {similarLinksData: action.similarLinksData});
            break;
        default:
            return state;
            break;
}
}

//
////const similarLinks = (state = [], action) => {
//  switch (action.type) {
//    case 'SHOW_SIMILAR_LINKS':
//      return {
//          similarLinks: action.similarLinks
//        };
//      
//    default:
//      return {similarLinks: [1,2,3]}
//  }
//}
//
//export default similarLinks