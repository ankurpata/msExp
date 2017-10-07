import fetch from 'isomorphic-fetch';
var searachUrl = "/api/searchCars";

export const similarLinks = (items) => {
    return {
        type: 'SHOW_SIMILAR_LINKS',
        similarLinksData: items
    }
}
export const hasErrored = (bool) => {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    }
}
export const getParamsFromUrl = (items) => {
    return {
        type: 'UPDATE_TAGS',
        tagsValue: items
    }
}
export const onClickSlide = (type, range) => {
    console.log(type, range)
    return {
        type: 'ADD_GUIDE',
        tagsValue: [{type: type, label: '[' + type + ':' + range[0] + '-' + range[1] + ']'}]
    }
}
export function itemsFetchData(url) {
    return (dispatch) => {
        fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((items) => {
                    dispatch(similarLinks(items))
                })
                .catch(() => {
                    dispatch(hasErrored(true))
                })
    };
}

export function updateTags(value) {
    return {
        type: 'UPDATE_TAGS',
        tagsValue: value
    }
}
export function updateGuides(guideArray) {
    return {
        type: 'UPDATE_GUIDES',
        guideArray: guideArray
    }
}
export function updateListing(carlist, pageNo) {
    if (pageNo) {
        return {
            type: 'LOAD_MORE_CARS',
            carlist: carlist
        }
    } else {
        return {
            type: 'UPDATE_LISTING',
            carlist: carlist
        }
    }

}
export function updateHeading(heading) {
    return {
        type: 'UPDATE_HEADING',
        heading: heading,
    }
}
export function addGuide(guide) {
    console.log(guide);
    return {
        type: 'ADD_GUIDE',
        tagsValue: [guide] //TODO: handle this part properyly
    }
}

export function loadMoreCars() {
    console.log('load-more-click');
    return {
        type: 'UPDATE_PAGE_NO',
    }
}
export function searchCars(tags, pageNo = 0) {
    return (dispatch) => {
        console.log('----updateTagAndSearchCars----', pageNo, tags, 'tags');
        //TODO:Hit Api n get Car list, similarLinks and guides.
        fetch(searachUrl, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: tags,
                pageNo: pageNo
            })

        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then((response) => response.json())
                .then((response) => {
                    dispatch(updateGuides(response.guideTmpArr));
                    dispatch(updateHeading(response.heading));
                    dispatch(updateListing(response.carlist, pageNo));
                    dispatch(similarLinks(response.carlist));
                })
                .catch(() => {
                    dispatch(hasErrored(true));
                });

    };
}
