import { axios } from 'axios'
import React, { useEffect, useReducer } from 'react'
import { Container, Row } from 'react-bootstrap'
import About from '../components/About'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from '../components/Product'
import Slider from '../components/Slider'
import Why from '../components/Why'
import ProductService from '../services/product.service';

const reducer = (state, action) => {
    switch(action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, data: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

function HomeView() {

    const [{ loading, error, data }, dispatch] = useReducer(reducer, {
        data: [], loading: true, error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await ProductService.getAllProducts();
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data.data.items }); 
            } catch(err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };

        fetchData();

    }, [])

    return (
        <>
            <Slider />
            <section className="product_section layout_padding">
                <Container>
                    <div className="heading_container heading_center">
                        <h2>Our Products</h2>
                    </div>
                    <Row>
                        {
                            loading ? (<LoadingBox />) 
                            : error ? (<MessageBox variant="danger">{ error }</MessageBox>)
                            : (
                                data.map(product => (
                                    <Product product = { product } />
                                ))
                            )
                        }
                    </Row>
                </Container>
            </section>
            <About />
            <Why />
        </>
    )
}

export default HomeView
