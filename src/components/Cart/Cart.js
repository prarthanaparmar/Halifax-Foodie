import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Pizza', 50, 2),
  createData('Pasta', 20, 1)
];

function Cart() {
  return (
    <body>
    <Header />
    <SideBar />
    <div className="cart-screen-container">
        <div className="cart-screen-content">
        return (
    <TableContainer component={Paper} style={{ width:"50%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Food Item</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
        </div>
        </body>
  )
}

// Cart.propTypes = {};

// Cart.defaultProps = {};

export default Cart;
