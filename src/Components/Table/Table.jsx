import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';

const Table = ({ customers, transactions, onFilter, onShowGraph }) => {
  const [customerName, setCustomerName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
    onFilter(event.target.value, transactionAmount);
  };

  const handleTransactionAmountChange = (event) => {
    setTransactionAmount(event.target.value);
    onFilter(customerName, event.target.value);
  };

  return (
    <div className="">
      <div className="card-header start text-center m-3 p-2 h5 text-white">Customer and Transaction Data</div>
      <div className="card-body">
        <div className="form-inline justify-content-center mb-3">
          <input type="text" className="form-control filter-input" placeholder="Search Customer Name" value={customerName} onChange={handleCustomerNameChange} />
          <input type="text" className="form-control filter-input" placeholder="Search Transaction Amount" value={transactionAmount} onChange={handleTransactionAmountChange} />
        </div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{customers.find(customer => customer.id === transaction.customer_id)?.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>
                  <button type="button" className="btn btn-dark" onClick={() => onShowGraph(transaction.customer_id)}>
                    Show Graph
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
