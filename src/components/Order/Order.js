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

const options = [
  { value: 'Pizza', label: 'Chocolate' },
  { value: 'Burger', label: 'Strawberry' },
  { value: 'Strawberry', label: 'Vanilla' }
]

function Order() {

  const [state, setState] = React.useState<{ item: string , quantity: number }>({
    item: '',
    quantity: '',
  });

  // const handleChange = (event: name?: string, value: unknown }>) => {
  //   const name = event.target.name
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  
  return (
  <body>
    <Header />
    <SideBar />
    <div className="order-screen-container">
        <div className="order-screen-content">
        <FormControl style={{ marginRight:"2%", width:"50%", height:"50%" }}>
        <InputLabel htmlFor="age-native-simple">Select an food item</InputLabel>
        <Select native >
          <option aria-label="None" value="" />
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Pasta">Pasta</option>
        </Select>
        {/* </FormControl>
        <FormControl style={{ marginTop:"7%", marginRight:"1%", width:"50%", height:"50%" }}> */}
        <InputLabel style={{ marginTop:"9%", marginRight:"1%" }} htmlFor="age-native-simple">Select quantity</InputLabel>
        <Select native onChange={this.handleChange}>
          <option aria-label="None" value="" />
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
        <Button style={{ marginTop:"10%", marginRight:"1%" }}>
          Add to Cart
        </Button>
      </FormControl>
      <Button variant="contained" onClick={this.onAddToCart} style={{ marginTop:"10%", marginRight:"7%" }} color="primary" href="/cart">
      Click here to go to cart!
    </Button>
      </div>
    </div>
  </body>
)
  }

// Order.propTypes = {};

// Order.defaultProps = {};

export default Order;
