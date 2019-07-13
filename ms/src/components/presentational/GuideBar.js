import React from 'react';
import Slider from 'react-slick';
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick-theme.css');
const GuideBar = ({guideArray, onClickGuide}) => {
const dynamicClass = () => {
    var min = 1;
    var max = 10;
    var rnd = min + Math.random() * (max - min);
    return "box-shadow btn btn-primary btn-lg guide-btn guide-btn-t" + Math.round(rnd);
};
 var settings = {
    dots: false,
    variableWidth: true,
    arrows: true,
    infinite:false,
    swipeToSlide:true
    };
return (
<div id="guide-bar" className=""> 
        <ul className="list-inline" id="ul-guide">
              <Slider {...settings}>

            {  guideArray.map((guideText, index) => (
            <li key ={index} >
                <button onClick={()=> onClickGuide(guideText)} data-type= {guideText['type']} data-id={guideText['id']} type= 'button' className = {dynamicClass()}>
                     {guideText['label']}
                </button>
            </li>
            ))}
                  </Slider>

        </ul>
</div>
        );
};
       
export default GuideBar;

