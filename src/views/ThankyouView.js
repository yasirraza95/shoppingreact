import React, { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";
import Image from "../components/Image";
import Product from "../components/Product";
import { UserContext } from "../context/UserContext";

function ThankyouView() {
  const { state } = useContext(UserContext);
  const {
    thankyou: { thank },
  } = state;

  console.log(thank.order_detail);
  return (
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Order Information</h2>
          </div>
          <div>Thank you for placing order</div>
          <h6>Your information is below</h6>
          <div>
            <strong>Shipping Email: {thank.email}</strong>
          </div>
          <div>
            <strong>Shipping Phone: {thank.phone}</strong>
          </div>
          <div>
            <strong>Shipping Address: {thank.address}</strong>
          </div>
          <div>
            <Container>
              <Row>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thank.order_detail.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <Image src={product.image} alt={product.name}></Image>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                        <td>{product.price * product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>
            </Container>
          </div>
        </Container>
      </section>
      <FooterInfo />
      <Footer />
    </>
  );
}

export default ThankyouView;
