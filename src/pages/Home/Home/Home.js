import React from 'react';
import Banner from '../Banner/Banner';
import Featured from '../Featured/Featured';
import Gallery from '../Gallery/Gallery';
import Info from '../Info/Info';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <Info></Info>
            <Gallery></Gallery>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;