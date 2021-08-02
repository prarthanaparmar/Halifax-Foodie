import React from 'react';
import PropTypes from 'prop-types';
import './Order.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
// import Button from "react-bootstrap/Button";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios';

const options = [
  { value: 'Pizza', label: 'Chocolate' },
  { value: 'Burger', label: 'Strawberry' },
  { value: 'Strawberry', label: 'Vanilla' }
]

var orderStatus = ["Placed","In Progress","Dispatched","Delivered"];
var randomOrderStatus = orderStatus[Math.floor(Math.random() * orderStatus.length)];

console.log(randomOrderStatus)

class Order extends React.Component {

  state = {
    products: [
      {title: ' Pizza ', count: 0, price: 20},
      {title: ' Pasta ', count: 0, price: 15},
      {title: ' Burger ', count: 0, price: 10},
    ]
  }
  
  onChange = (index, val) => {
    this.setState({
      products: this.state.products.map((product, i) => (
        i === index ? {...product, count: val} : product
      ))
    })
  }

  handleSubmit = (event) => {
     Axios.post(
      'https://backend-yfg27siima-uc.a.run.app/api/order/placeOrder',{
       "items": "Pizza",
         "customerID": "1234",
        "createdOn": "26-07-21",
         "amount": "20 CAD",
         "orderStatus": randomOrderStatus // orderStatus can be Placed/In Progress/Delivered
       }).then((response) => {
         console.log("inserted")
         console.log(response);
         console.log(response.data.data);
         alert("Order is successfully created. Order ID is " + response.data.data);
     });
  }

  render () {
  return(
    <body>
    <Header />
     <SideBar />
     <div className="order-screen-container">
         <div className="order-screen-content">
            <div>
              <h2> Menu </h2>
                <ProductList products={this.state.products} onChange={this.onChange} />
                <Total products={this.state.products} />
                <Button style={{ marginTop:"7%", marginRight:"1%" }} onClick={this.handleSubmit}>  Place Order  </Button> 
            </div>
      </div>
    </div>
    </body>
  )
  }
};

const ProductList = ({ products, onChange }) => (
  <ul>
    {products.map((product, i) => (
      <li key={i}>
        {product.title}
        <input style={{ marginTop:"1%", marginRight:"1%" }}
          type="text" 
          value={product.count}
          onChange={e => onChange(i, parseInt(e.target.value) || 0)}
        />
      </li>
    ))}
  </ul>
);

const Total = ({ products }) => (
  <h3>
    Total Amount :  {products.reduce((sum, i) => (
      sum += i.count * i.price
    ), 0)}    CAD </h3>
)

export default Order;
