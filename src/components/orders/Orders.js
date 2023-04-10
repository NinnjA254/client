import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../api/fetchOrders";
import { checkLogin } from "../../api/checkLogin";
import CreateOrder from "../CreateOrder/CreateOrder";
import Order from "../order/Order";
import "./Orders.css";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({
    idFilter: "",
    statusFilter: "All",
  });
  //console.log(orders)
  //console.log(filter.idFilter === '')
  useEffect(() => {
    checkLogin().then((response) => {
      if (response.data.includes("orders")) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        navigate("/admin");
      }
    });
    fetchOrders().then((response) => {
      if (response.status === 200) {
        setOrders(response.data);
      }
      //handle authorisation here
    });
  }, []);

  function renderOrders() {
    if (orders.length >= 1) {
      if (filter.idFilter !== "") {
        //filtering by id only when idFilter length is greater than one
        if (filter.idFilter.length < 24) {
          return <p>Invalid Id</p>;
        }
        const foundOrder =
          orders.find((order) => order._id === filter.idFilter) || null;
        if (foundOrder)
          return <Order order={foundOrder} setOrders={setOrders} />;
        return <p>Order with that Id does not exist</p>;
      }
      if (filter.idFilter === "") {
        //if idFilter is empty, orders are displayed, filtered by statusFilter
        let filteredOrders = [];
        if (filter.statusFilter === "All") {
          filteredOrders = orders;
        } else if (filter.statusFilter === "Pending") {
          filteredOrders = orders.filter(
            (order) => order.orderStatus === false
          );
        } else if (filter.statusFilter === "Fulfilled") {
          filteredOrders = filteredOrders = orders.filter(
            (order) => order.orderStatus === true
          );
        }
        if (filteredOrders.length === 0)
          return <p>No {`No ${filter.statusFilter} orders found`}</p>;
        return filteredOrders.map((order, index) => (
          <Order key={index} order={order} setOrders={setOrders} />
        ));
      }
    }
    return <p>There are no orders in the system</p>;
  }
  if (!authorized) return <p>You are not authorized to view this page</p>;
  return (
    <div id="orders">
      <div id="orders-header-and-search-bar">
        <div id="orders-header">
          <h3>Orders</h3>
          {!showForm && (
            <button
              id="create-order-button"
              onClick={() => setShowForm((prev) => !prev)}
            >
              CreateOrder
            </button>
          )}
        </div>
        {!showForm ? (
          <SearchBar
            filter={filter}
            setFilter={setFilter}
            displayAllFilters={filter.idFilter === ""}
            placeholder="Find Order by Id"
          />
        ) : (
          <h5 id="create-order-heading">create Order</h5>
        )}
      </div>

      {showForm ? (
        <CreateOrder setShowForm={setShowForm} setOrders={setOrders} />
      ) : (
        orders && <ul id="orders-container">{renderOrders()}</ul> // the conditional && is to make sure orders don't render before they are fetched from the server
      )}
    </div>
  );
}
