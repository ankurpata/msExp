import React from 'react';

const SimilarLinks = ({similarLinks}) => {
    return (
            <div className="container">
            {/* 
                <div id="similar-links" > 
                    <h4 className="guide-mob-p">Similar Links</h4>
                    <ul className="list-inline" id="ul-similar-links">
                       {
                            similarLinks.map((item, index) => 
                                   <li key={index}> 
                                    <a href="seoKey-url" target="_blank">
                                        <button data-type= "make_id" 
                                                data-id="SeoKey-id"
                                                type = "button"
                                                className = "box-shadow btn btn-primary btn-lg guide-btn-t' . $rnd . ' guide-btn  ">
                                                SeoKey-Name {item.label}
                                                <i className="fa fa-external-link similar-link-icon"></i>
                                        </button>
                                    </a>
                                </li>
                                )
                        }
                        
                    </ul>
                </div>
                 */}
            </div>
    );
};

export default SimilarLinks;

