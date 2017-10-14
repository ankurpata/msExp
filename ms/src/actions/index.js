import fetch from 'isomorphic-fetch';
import ReactGA from 'react-ga';
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
    console.log(type, range);
    ReactGA.event({
        category: 'Home',
        action: 'Slider Click',
        label: '[' + type + ':' + range[0] + '-' + range[1] + ']'
    });
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
    ReactGA.event({
        category: 'Home',
        action: 'UPDATE_TAGS',
        value: "tags: " + value.toString()
    });
    return {
        type: 'UPDATE_TAGS',
        tagsValue: value
    }
}
export function updateGuides(guideArray) {
    ReactGA.event({
        category: 'Home',
        action: 'UPDATE_GUIDES',
        value: "guides:" + guideArray.toString()
    });
    return {
        type: 'UPDATE_GUIDES',
        guideArray: guideArray
    };
}
export function updateListing(carlist, pageNo) {
    if (pageNo) {
        ReactGA.event({
            category: 'Home',
            action: 'Page Scroll',
            value: 'pageNo' + pageNo
        });
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
    ReactGA.event({
        category: 'Home',
        action: 'ADD_GUIDE',
        value: 'guide: ' + guide.toString()
    });
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
        var url = window.location.href;
        var arr = url.split("/");
        var urlStr = arr[4];
        //TODO:Hit Api n get Car list, similarLinks and guides.
        fetch(searachUrl, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: tags,
                pageNo: pageNo,
                urlStr: urlStr
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
