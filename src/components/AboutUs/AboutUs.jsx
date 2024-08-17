import React from 'react';
import './AboutUs.css'; // Adjust based on where you store your CSS
import img from '../../assets/team2.jpg'

const AboutUs = () => {
    return (
        <section className="aboutUsContainer bg-customBlue text-white" id='aboutUs'>
            <h2 className="aboutUsTitle">About Us</h2>
            <p className="aboutUsDescription text-white opacity-80">
                Welcome to BB-ShopEase! Our mission is to bring ease and efficiency to your shopping experience. Whether you're looking for the latest products, best deals, or a smooth online shopping journey, we've got you covered.
            </p>
            <ul className="aboutUsPoints opacity-90 text-customGulabi">
                <li>User-Friendly Interface</li>
                <li>Secure and Fast Transactions</li>
                <li>Wide Range of Products</li>
                <li>Excellent Customer Support</li>
            </ul>
            <div className='flex items-center justify-center w-full'>
                <img
                    src={img}
                    alt="BB-ShopEase"
                    className="aboutUsImage"
                />
            </div>
        </section>
    );
};

export default AboutUs;
