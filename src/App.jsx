import React, { useState, useRef } from 'react';
import Table from './Components/Table/Table';
import Graph from './Components/Graph/Graph';
import data from './data.json'; 

const App = () => {
  const [filteredTransactions, setFilteredTransactions] = useState(data.transactions);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const graphRef = useRef(null);

  const handleFilter = (customerName, transactionAmount) => {
    let filtered = data.transactions;

    if (customerName) {
      filtered = filtered.filter(transaction => {
        const customer = data.customers.find(c => c.id === transaction.customer_id);
        return customer && customer.name.toLowerCase().includes(customerName.toLowerCase());
      });
    }

    if (transactionAmount) {
      filtered = filtered.filter(transaction => transaction.amount.toString().includes(transactionAmount));
    }

    setFilteredTransactions(filtered);
  };

  const handleShowGraph = (customerId) => {
    setSelectedCustomerId(customerId);
    setTimeout(() => { 
      graphRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 300); 
  };

  const selectedCustomer = data.customers.find(customer => customer.id === selectedCustomerId);
  const selectedCustomerTransactions = data.transactions.filter(transaction => transaction.customer_id === selectedCustomerId);

  return (
    <div className="container mt-4">
      <Table customers={data.customers} transactions={filteredTransactions} onFilter={handleFilter} onShowGraph={handleShowGraph}/>
      {selectedCustomerId && (
        <div className="mt-4 text-center" ref={graphRef}>
          <h3>{selectedCustomer.name}'s Transactions</h3>
          <ul className="list-group list-group-flush">
            {selectedCustomerTransactions.map(transaction => (
              <li key={transaction.id} className="list-group-item">
                Date: {transaction.date}, Amount: {transaction.amount}
              </li>
            ))}
          </ul>
          <Graph transactions={data.transactions} selectedCustomerId={selectedCustomerId} />
        </div>
      )}
    </div>
  );
};

export default App;
