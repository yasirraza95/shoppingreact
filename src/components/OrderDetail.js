import React from "react";
import Image from "./Image";

function OrderDetail(props) {
  return (
    <tr>
      <td>
        <Image src={props.result.image} alt={props.result.name} />
      </td>
      <td>{props.result.name}</td>
      <td>{props.result.price}</td>
      <td>{props.result.quantity}</td>
      <td>{props.result.total_price}</td>
    </tr>
  );
}

export default OrderDetail;
