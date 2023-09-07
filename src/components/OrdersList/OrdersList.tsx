// use this function to fetch the orders.
import { useEffect, useState } from "react";
import { getOrders } from "../../api/api";
import { Button } from "../Button/Button";

interface Order {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  fullName: string;
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalSum: number;
}

export function OrdersList(){

  /**
   * TODO: Implement the OrdersList component.
   *
   * Fetch the orders from the API and display them in a list/table.
   *
   * use the imported function to fetch the orders from the API: getOrders()
   */
  
  const [orders, setOrders] = useState<Order[]>([]);
 
  useEffect(()=>{
    const fetchOrders = async ()=>{
      try {
        const result = getOrders();
        setOrders(await result);
      } catch (error) {
        console.error('error', error);
      }}
    fetchOrders();
  }
   , []);

  return (
    <div>
      <h1>Orders List</h1>
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Order Number</th>
            <th style={{ padding: '10px' }}>Date</th>
            <th style={{ padding: '10px' }}>Full Name</th>
            <th style={{ padding: '10px' }}>Amount of Products</th>
            <th style={{ padding: '10px' }}>totalSum</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const { id: orderNumber, ...restOfOrder } = order;

            return (
              <tr key={orderNumber}>
                <td style={{ padding: "10px" }}>{orderNumber}</td>
                <td style={{ padding: "10px" }}>{restOfOrder.created_at}</td>
                <td style={{ padding: "10px" }}>
                  {
                    (restOfOrder.fullName = `${restOfOrder.first_name} ${restOfOrder.last_name}`)
                  }
                </td>
                <td style={{ padding: "30px" }}>
                  {restOfOrder.products.reduce(
                    (total, product) => total + product.quantity,
                    0
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  {
                    (restOfOrder.totalSum = order.products.reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    ))
                  }
                </td>
                <td style={{ padding: "10px" }}>
                  <Button
                    onClick={() => alert(`Order Number: ${orderNumber}`)}
                    children="View Order"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
