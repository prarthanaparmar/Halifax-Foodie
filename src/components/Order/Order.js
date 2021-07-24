import React from 'react';
import PropTypes from 'prop-types';
import './Order.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
// import Select from 'react-select'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css'
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const options = [
  { value: 'Pizza', label: 'Chocolate' },
  { value: 'Burger', label: 'Strawberry' },
  { value: 'Strawberry', label: 'Vanilla' }
]

// function Order() {

//   return (
//   <body>
//     <Header />
//     <SideBar />
//     <div className="order-screen-container">
//         <div className="order-screen-content">
//         <FormControl style={{ marginRight:"2%", width:"50%", height:"50%" }}>
//         <InputLabel htmlFor="age-native-simple">Select an food item</InputLabel>
//         <Select native onChange={this.onChange}>
//           <option aria-label="None" value="" />
//           <option value="Pizza">Pizza</option>
//           <option value="Burger">Burger</option>
//           <option value="Pasta">Pasta</option>
//         </Select>
//         <InputLabel style={{ marginTop:"9%", marginRight:"1%" }} htmlFor="age-native-simple">Select quantity</InputLabel>
//         <Select native onChange={this.onChange}>
//           <option aria-label="None" value="" />
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </Select>
//         <Button style={{ marginTop:"10%", marginRight:"1%" }}>
//           Add to Cart
//         </Button>
//       </FormControl>
//       <Button variant="contained" style={{ marginTop:"10%", marginRight:"7%" }} color="primary" href="/cart">
//       Click here to go to cart!
//     </Button>
//       </div>
//     </div>
//   </body>
// )
//   }

class Order extends React.Component {

  state = {
    products: [
      {title: 'Pizza', count: 0, price: 20},
      {title: 'Pasta', count: 0, price: 15},
      {title: 'Burger', count: 0, price: 10},
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
      'https://15ix4rukfb.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction',
    //   { key1: `${Corpus_Name}, 
    //     key2: ${Source_Name}` }
    );
  }

  render () {
  return(
    <body>
    <Header />
     <SideBar />
     <div className="order-screen-container">
         <div className="order-screen-content">
            <div>
                <ProductList products={this.state.products} onChange={this.onChange} />
                <Total products={this.state.products} />
                <Button style={{ marginTop:"10%", marginRight:"1%" }} onClick={this.handleSubmit}>  Place Order  </Button> 
                {/* post call to DynamoDB with Items,Amount, Status */}
                {/* alert which displays order ID */}
                {/* order status as placed, dispatched and delivered */}
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
        <input 
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
    Total Amount: 
    {products.reduce((sum, i) => (
      sum += i.count * i.price
    ), 0)}
  </h3>
)

export default Order;
