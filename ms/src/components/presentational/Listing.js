import React, {Component} from 'react';
import Popup from 'react-popup';
import showMoreIcn from '../../images/show-more.svg';


class Listing extends Component {
    constructor(props) {
        super(props);
//        console.log(this.props.item, 'this.props.item');
    }
    
    listClick = (e) => {
        console.log(e.currentTarget.dataset.url);
        window.open(e.currentTarget.dataset.url);
        //TODO: on click open link in different tab
    }
    getFormatPrice = (val) => {
        if (val >= 10000000)
            val = (val / 10000000).toFixed(2) + 'Cr';
        else if (val >= 100000)
            val = (val / 100000).toFixed(2) + 'L';
        else if (val >= 1000)
            val = (val / 1000).toFixed(2) + 'K';
        return val;
    }
    getIndianFormat = (x) => {
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }
    getTopColors = () =>{
//        console.log( this.props.item.maxColor, ' this.props.item.maxColor');
//        return this.props.item.maxColor.split(",").slice(0, 3);
        return this.props.item.maxColor.replace(/^,/, '');
    }
    getVariantHtml = () => {
        var op = [];
        var variantTmp = this.props.item.variant_details.split(",");
            for(var j= 0; j< variantTmp.length;j++){
                   if(j>=3){
                        break;
                   }
                   var variant = [] ;
                   var tmp2 = variantTmp[j].split(";");
                   for(var i = 0; i< tmp2.length ;i ++){
                        var tmp = tmp2[i].split(/:(.+)/);
                        variant[tmp[0]] = tmp[1];
                   }
                   
                   op.push (<p>
                            <span><a target="_blank" href={variant.url}>{variant.name }</a> </span> 
                            <span className="city-span" >Rs {this.getFormatPrice(variant.price)}</span>
                            <br/>
                            <span className="variant-mini-details">{variant.displacement + ', ' + variant.transmission_type + ', ' + variant.fuel_type}</span>
                           {
                           /*
                            <span className="variant-mini-details" >{variant.no_of_gears}</span>
                            <span className="variant-mini-details" >{variant.body_type}</span>
                            <span className="variant-mini-details" >{variant.seating_capicity}</span>
                            <span className="variant-mini-details" >{variant.domain}</span>
                           */
                           }
                    </p>);
                                
            }
            if(variantTmp.length > 3){
                op.push(<p className="show-more-variants">
                        <a target="_blank" href={this.props.item.model_url}>          
                            <img alt= {"Show all variants for " + this.props.item.model}  title = {"Show all variants for " + this.props.item.model} className = "img-show-more" src={showMoreIcn}  />
                        </a>
                    </p>);
            }
        return op;
    }
    render(){
        return (
        <div className="col-md-3 col-sm-6 hero-feature" >
            <div className="thumbnail">
                <div className="car-image-wrap"  data-url={this.props.item.model_url}  onClick={this.listClick}>
                    <img className="lazyload car-image" 
                         src={this.props.item.img_url}
                         data-src={this.props.item.img_url}       
                         alt={this.props.item.make + this.props.item.model} />
                    <span className="car-image-fav" data-id={'item.id'}>
                        <i className="glyphicon glyphicon-bookmark"></i>
                    </span>    
                    <span className="car-image-logo">
                        <img className="listing-logo" src={require('../../images/logo-'+this.props.item.domain.trim() + '.png')} alt="" />
                    </span>    
                </div>
                <div className="caption">
                    <h3  data-url={this.props.item.model_url}  onClick={this.listClick} className= "car-title">{this.props.item.make + " " + this.props.item.model}  </h3>
                    <p className="car-price"><span className="avg-price">₹ {this.getIndianFormat(this.props.item.price)}</span> <span  data-url={this.props.item.model_url}  onClick={this.listClick} className="city-span city-span-btn btn btn-success" >Check ORP</span> </p>
                    <p className="car-details"><span className="details-span">{"Top Colors: "}{this.getTopColors()}</span></p>
                    <div className ="matching-variants">
                        <p className ="matching-variants-p"> <span>Matching Variants:</span></p>
                             {this.getVariantHtml()}
                    </div>
                    <p>
                        <a href={this.props.item.model_url} target = "_blank" className="btn btn-outline-primary get-details">Get Details</a> 
                    </p>
                   
                </div>
            </div>
        </div>
        )
    }
}

export default Listing;

