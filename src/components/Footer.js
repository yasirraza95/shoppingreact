import React from 'react'
import { Container } from 'react-bootstrap'
import './Footer.css';

function Footer() {
    return (
        <div>
            <footer className="footer_section">
                <Container>
                <p>
                    &copy; <span id="displayYear"></span> All Rights Reserved By
                    <a href="https://html.design/">Free Html Templates</a>
                </p>
                </Container>
            </footer>    
        </div>
    )
}

export default Footer
