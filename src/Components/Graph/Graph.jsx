import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './graph.css'; 

const Graph = ({ transactions, selectedCustomerId }) => {
  const customerTransactions = transactions.filter(transaction => transaction.customer_id === selectedCustomerId);

  const data = customerTransactions.reduce((acc, transaction) => {
    const dateIndex = acc.findIndex(item => item.date === transaction.date);
    if (dateIndex >= 0) {
      acc[dateIndex].amount += transaction.amount;
    } else {
      acc.push({ date: transaction.date, amount: transaction.amount });
    }
    return acc;
  }, []);

  return (
    <div className="graph-container">
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#888328" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default Graph;
