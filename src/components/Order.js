import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}

function Order(props) {
  const navigate = useNavigate();

  const detailHandler = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <tr>
      <td>{props.result._id}</td>
      <td>{props.result.address}</td>
      <td>{props.result.email}</td>
      <td>{props.result.phone}</td>
      <td>{props.result.price}</td>
      <td>{formatDate(props.result.date)}</td>
      <td>
        <Button
          className="btn btn-primary"
          onClick={() => detailHandler(props.result._id)}
        >
          Detail
        </Button>
      </td>
    </tr>
  );
}

export default Order;
