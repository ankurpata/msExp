
const initialState = {
    tagsValue: [], pageNo: 0
}

const removeSlideTag = (currTags, newTag) => {
    console.log('insideSlideTag', newTag)
    if (newTag.type === 'price' || newTag.type === 'kms' || newTag.type === 'year') {
        for(var i = currTags.length -1; i >= 0 ; i--){
            if (currTags[i].type === newTag.type) {
                console.log('removing-old-slide-tag', newTag.type);
                currTags.splice(i, 1);
                break;
            }
        }
        return currTags;
    } else {
        return currTags;
    }
}
export function tagReducer(state = initialState, action) {

    switch (action.type) {
        case 'UPDATE_TAGS':
            return Object.assign({}, state, {tagsValue: action.tagsValue, pageNo: 0});
            break;
        case 'ADD_GUIDE':
            let updatedCurrTag = removeSlideTag(state.tagsValue, action.tagsValue[0]);
            return Object.assign({}, state, {tagsValue: updatedCurrTag.concat(action.tagsValue), pageNo: 0});
            break;
        case 'UPDATE_PAGE_NO':
            return Object.assign({}, state, {pageNo: state.pageNo + 1});
            break;
        default:
            return state;
            break;
}
}
