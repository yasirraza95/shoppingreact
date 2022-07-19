import React from "react";
import { Container, Row } from "react-bootstrap";

function Wishlist() {
  return (
    <div>
      <Container>
        <Row>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="https://assetscontent.s3.ca-central-1.amazonaws.com/images/1652901714828.jpg" />
                </td>
                <td>Test</td>
                <td>
                  <button className="btn btn-primary" onClick={() => {}}>
                    Delete
                  </button>
                  &nbsp;
                  <button className="btn btn-primary" onClick={() => {}}>
                    Move to Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
      </Container>
    </div>
  );
}

export default Wishlist;
