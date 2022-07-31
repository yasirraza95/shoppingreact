import React, { useContext, useEffect, useReducer } from "react";
import { Container, Row } from "react-bootstrap";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useParams } from "react-router-dom";
import OrderDetail from "../components/OrderDetail";
import { UserContext } from "../context/UserContext";
import OrderService from "../services/order.service";
import Footer from "../components/Footer";
import FooterInfo from "../components/FooterInfo";

const reducer = (state, action) => {
  switch (action.type) {
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

function OrdersDetailView() {
  const { id } = useParams();

  const { state } = useContext(UserContext);
  const { userInfo, token } = state;

  const [{ loading, error, data }, dispatch] = useReducer(reducer, {
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await OrderService.viewOrderDetail(id, token);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: result.data.data.order[0].order_detail,
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="product_section layout_padding">
        <Container>
          <div className="heading_container heading_center">
            <h2>Order Detail</h2>
          </div>
          <div>
            <Container>
              <Row>
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <LoadingBox />
                    ) : error ? (
                      <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                      data.map((detail) => (
                        <OrderDetail key={detail._id} result={detail} />
                      ))
                    )}
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

export default OrdersDetailView;
