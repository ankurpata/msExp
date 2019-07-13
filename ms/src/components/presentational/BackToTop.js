import React, { Component } from 'react';

let scrollTo = (element, to, duration) =>  {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
let moveToTop = () => {
      scrollTo(document.body, 0, 600);
};
const BackToTop = ({isVisibleBackToTop}) => {
    return (
            <div className={isVisibleBackToTop ? 'showMe' : 'hideMe'}>
                <button id="back-to-top"  onClick = {moveToTop} className="btn btn-primary btn-lg back-to-top" role="button" title="Click to return on the top page" data-toggle="tooltip" data-placement="left">
                    <span className="glyphicon glyphicon-chevron-up">
                    </span>
                </button>
            </div>
            );
};
export default BackToTop;

