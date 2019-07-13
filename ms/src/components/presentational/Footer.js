import React from 'react';
        import logoF from '../../images/motorsinghWhiteLogo.png';
        const Footer = () => {
return (
<div>
    <footer className="footer-distributed">
        <div className="footer-left">

            <h3>
                <div className="footer-logo-div">
                    <img className="img-responsive footer-logo"  src={logoF} />
                </div>
                <p className="footer-company-about">
                    Motorsingh is a single destination to search all the Used & New cars from across the sites.
                    We do the untidy work of searching multiple sites and display cars from all the sites, 
                    including the best ones like Carwale, Cardekho and many more. 
                </p>

            </h3>

            <p className="footer-company-name">MotorSingh &copy; 2017</p>
        </div>

        <div className="footer-center">

            <div>
                <i className="fa fa-map-marker"></i>
                <p> Crafted with <span className="love-glyph"><i className="glyphicon glyphicon-heart"></i></span> in Delhi.</p>
            </div>


            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:info@motorsingh.com">info@motorsingh.com</a></p>
            </div>

        </div>

        <div className="footer-right">
            <p className="footer-links">
                <a href="../about/terms_and_conditions.html" target="_blank">Terms & Conditions</a>
                ·
                <a href="../about/privacy.html" target="_blank">Privacy</a>

            </p>
            <p className="footer-links">
                <a href="../about" target="_blank">About</a>
                ·
                <a href="../about" target="_blank">Social</a>
                ·
                <a href="../about" target="_blank">Contact</a>
            </p>
            <div className="footer-icons">

                <a href="https://www.facebook.com/motorSinghDotCom/" target="_blank"><i className="fa fa-facebook-square"></i></a>
                <a href="https://twitter.com/_motorsingh" target="_blank" ><i className="fa fa-twitter-square"></i></a>
                <a href="https://in.pinterest.com/motorsingh/" target="_blank"><i className="fa fa-pinterest-square"></i></a>
                <a href="https://www.instagram.com/motorsinghDotCom/" target="_blank" ><i className="fa fa-instagram"></i></a>

            </div>

        </div>

    </footer>
</div>
        );
};
        export default Footer;

