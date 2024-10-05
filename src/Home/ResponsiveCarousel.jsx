import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResponsiveCarousel.css'
import AddCarousel from './AddCarousel';

const ImageCarousel = () => {
  return (<div className='carousel-main-div'>
  <AddCarousel/>
    <div className='main-div'>
        
        
    
          
        
          
      <div className="carousel-div">
        <Carousel className='carousel'  interval={1500} controls={false}>
          <Carousel.Item className="carousel-item">
            <img className="carousel-image" src="/assets/secondCarousel/add1.jpg" alt="First slide" />
          </Carousel.Item>
          <Carousel.Item className="carousel-item">
            <img className="carousel-image" src="/assets/secondCarousel/add2.jpg" alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item className="carousel-item">
            <img className="carousel-image" src="/assets/secondCarousel/add1.jpg" alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  
    
   </div>
  );
};

export default ImageCarousel;
