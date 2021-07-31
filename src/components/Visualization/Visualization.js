import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import LineChart from 'react-linechart';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar'
import visual from './visual';
import './Visualization.css';

const Visualisation = (props) => {
    const [data, setData] = useState(null);
    const location = useLocation();

    useEffect( async () => {
        let orders= await visual();
        console.log(orders);

        orders = orders.map((o) => {
            let obj = { x: null, y: null };
            obj.x = o.CustomerID;
            obj.y = o.Amount || 0;
            return obj;
        })
        const tempData = [
            {
                color: "steelblue",
                points: orders
            }
        ];
        setData(tempData);

    }, [])
    return (
        <body>
      <Header />
      <SideBar />
      <div className="visual-screen-container">
        <div className="visual-screen-content">
        <div className="tabBody" style={{ marginRight: '20px', marginLeft: '40px'}}>

            {data && <LineChart
                xLabel="Order ID"
                yLabel="Amount"
                width={600}
                height={400}
                data={data}
            />}
        </div>
</div>
</div>
</body>
    );
};
export default Visualisation;