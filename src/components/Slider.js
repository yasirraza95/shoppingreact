import React from 'react'
import { Carousel } from 'react-bootstrap'

function Slider() {
    return (
        <Carousel>
        <Carousel.Item>
            <img className="d-block w-100" src="images/24slideone.jpg"
                alt="First slide" />
            <Carousel.Caption>
            <h1>Welcome to our shop</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quam velit saepe dolorem deserunt quo quidem ad optio.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src="images/29slidetwo.jpg"
                alt="Second slide" />

            <Carousel.Caption>
            <h1>Welcome to our shop</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quam velit saepe dolorem deserunt quo quidem ad optio.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src="images/24slideone.jpg"
                alt="Third slide" />

            <Carousel.Caption>
            <h1>Welcome to our shop</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quam velit saepe dolorem deserunt quo quidem ad optio.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
}

export default Slider
