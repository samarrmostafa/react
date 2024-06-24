import React, { useState } from 'react'
import { Carousel} from 'react-bootstrap'
import img2 from '../../../Assests/images/banner/img2.jpg'
import img3 from '../../../Assests/images/banner/img3.jpg'
import img1 from '../../../Assests/images/banner/img1.jpg'
const Silder = () => {
    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }
    return (
        <div className='mt-[50px]'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className="slider-background mt-[0px]" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img
                        style={{ height: "350px", width: "1343.53px" }}
                        className=""
                        src={img2}
                        alt="  "
                    />
                    <div className="">
                        
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item className="slider-background2" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img
                        style={{ height: "350px", width: "1343.53px" }}
                        className=""
                        src={img3}
                        alt="  "
                    />
                    <div className="">
                       
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item className="slider-background3" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <img
                        style={{ height: "350px", width: "1343.53px" }}
                        className=""
                        src={img1}
                        alt="  "  />
                    
                        <p className="slider-title absolute ml-[-400px] text-[1000px] h-20 w-46 text-black">   Your Best Gate To <br/> Buy,Sell,Donate & Exchange <br/>Whateever You need</p>
                        
                </div>
            </Carousel.Item>

          
           
        </Carousel>
      
        </div>
    )
}

export default Silder