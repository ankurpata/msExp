import React, {Component} from 'react';

class Listing extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.item, 'this.props.item');
    }
    
    listClick = (e) => {
        console.log(e.currentTarget.dataset.url)
        //TODO: on click open link in different tab
    }
    render(){
        return (
        <div className="col-md-3 col-sm-6 hero-feature" >
            <div className="thumbnail" data-url={this.props.item.model_url}  onClick={this.listClick}>
                <div className="car-image-wrap">
                    <img className="lazyload car-image" 
                         src={this.props.item.img_url}
                         data-src={this.props.item.img_url}       
                         alt={this.props.item.make + this.props.item.model} />
                    <span className="car-image-fav" data-id={'item.id'}>
                        <i className="glyphicon glyphicon-bookmark"></i>
                    </span>    
                    <span className="car-image-logo">
                        <img className="listing-logo" src={'images/logo-'+this.props.item.domain.trim() + '.png'} alt="" />
                    </span>    
                </div>
                <div className="caption">
                    <h3 className= "car-title">{this.props.item.make + " " + this.props.item.model}  </h3>
                    <p className="car-price"><span className="avg-price">₹ {this.props.item.price}</span> <span className="city-span btn btn-success" >Check ORP</span> </p>
                    <p className="car-details"><span className="details-span">36.0km/kg, 624cc, 4 Seater</span></p>
                    <p>
                        <a href={this.props.item.model_url} target = "_blank" className="btn btn-outline-primary get-details">Get Details</a> 
                    </p>
                    <p><span>Matching Variants:</span></p>
                    <p><span>Revotron XE </span></p>
                </div>
            </div>
        </div>
        )
    }
}

export default Listing;

