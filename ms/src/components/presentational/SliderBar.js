import React from 'react';
import Slider from 'rc-slider';
import { Button , Collapse} from 'react-bootstrap';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const SliderBar = ({onBlur, onClickPriceTab, onClickKmsTab, onClickSortTab, onClickYearTab, onClickSlidePrice, onClickSlideKms, onClickSlideYear, priceOpen, kmsOpen, sortOpen, yearOpen}) => {
const marks = {
         100000: '1L',
        10000000: {
        style: {
        color: 'grey',
        },
                label: <strong>1Cr</strong>,
        },
        };
const marksKms = {
         1000: '1000',
        100000: {
        style: {
        color: 'grey',
        },
                label: <strong>1L</strong>,
        },
        };
const marksYear = {
         2000: '2000',
        2017: {
        style: {
        color: 'grey',
        },
                label: <strong>2017</strong>,
        },
        };
const getFormatPrice = (val) => {
    if (val >= 10000000)
        val = (val / 10000000).toFixed(2) + 'Cr';
        else if (val >= 100000)
        val = (val / 100000).toFixed(2) + 'L';
        else if (val >= 1000)
        val = (val / 1000).toFixed(2) + 'K';
        return val;
        }
return (
<div className="range-select"   data-spy="affix" data-offset-top="120" role="group">
    <div className="container range-container">
        <div className="btn-group btn-group-lg" aria-label="Filter by Price, Kms or Year">
            <div className="btn-primary btn-group range-btn">
                <Button id ="dLabel3" onBlur={() => onBlur('priceOpen')}  className="btn btn-primary range-btn  dropdown-toggle" onClick={onClickPriceTab}>
                    Price
                </Button>
                <Collapse in={priceOpen}>
                    <div id="slider-price" className="dropdown-menu" role="menu" >
                       <Range vertical min={10000} max={10000000} marks={marks} step={10}  
                            toolTipVisibleAlways={true}
                            tipFormatter={(value) => `${getFormatPrice(value)}`}
                            tipProps={{ overlayClassName: 'tip', placement : 'right'}}
                            onAfterChange={onClickSlidePrice} defaultValue={[200000, 5000000]}
                              />
                   </div>
                </Collapse>
            </div>
            {/* 
            <div className="btn-primary btn-group range-btn">
                <Button id ="dLabel4" onBlur={() => onBlur('kmsOpen')} className="btn btn-primary range-btn  dropdown-toggle" onClick={onClickKmsTab}>
                    Kms
                </Button>
                <Collapse in={kmsOpen}>
                    <div id="slider-kms" className="dropdown-menu" role="menu" >
                       <Range vertical min={1000} max={100000} 
                              marks={marksKms} step={10} 
                              tipFormatter={(value) => `${getFormatPrice(value)}`}
                              tipProps={{ overlayClassName: 'tip', placement : 'right'}}
                              onAfterChange={onClickSlideKms} defaultValue={[20000, 50000]}
                              />
                   </div>
                </Collapse>
            </div>
            */}
             
            <div className="btn-primary btn-group range-btn">
                <Button disabled={true} id ="dLabel5" onBlur={() => onBlur('yearOpen')}  className="btn btn-primary range-btn  dropdown-toggle" onClick={onClickYearTab}>
                    Year
                </Button>
                <Collapse in={yearOpen}>
                    <div id="slider-kms" className="dropdown-menu" role="menu" >
                       <Range vertical min={2000} max={2017} 
                              marks={marksYear} step={1}
                              width={300}
                              tipFormatter={(value) => `${value}`}
                              tipProps={{ overlayClassName: 'tip', placement : 'right'}}
                              onAfterChange={onClickSlideYear} defaultValue={[2012, 2015]}
                              />
                   </div>
                </Collapse>
            </div>
            <div className="btn-primary btn-group range-btn">
                <Button disabled={true} id ="dLabel6" onBlur={() => onBlur('sortOpen')}  className="btn btn-primary range-btn dropdown-toggle" onClick={onClickSortTab}>
                    Sort by
                </Button>
                <Collapse in={sortOpen}>
                    <div id="slider-sort" className="dropdown-menu" role="menu" >
                       
                   </div>
                </Collapse>
            </div>
        </div>
    </div>
</div>

);
};

export default SliderBar;

