import React from "react";
import { Container, Row } from "react-bootstrap";

function Orders() {
  return (
    <div>
      <Container>
        <Row>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="https://assetscontent.s3.ca-central-1.amazonaws.com/images/1652901714828.jpg" />
                </td>
                <td>Test</td>
                <td>1</td>
                <td>
                  <button className="btn btn-primary" onClick={() => {}}>
                    Delete
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

export default Orders;
