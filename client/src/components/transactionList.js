import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transaction = (props) => (
  <tr>
    <td>{props.transaction.date}</td>
    <td>{props.transaction.category}</td>
    <td>${props.transaction.amount}</td>
    <td>{props.transaction.description}</td>
    <td>{props.transaction.notes}</td>
    <td>
      <Link to={`/edit/${props.transaction._id}`}>
        <img className="actionImage" src="/images/editimg.png"></img>
      </Link>
      <Link onClick={() => { props.deleteTransaction(props.transaction._id); }}>
        <img className="actionImage" id="deleteBtn" src="/images/deleteimg.png"></img>
      </Link>
    </td>
  </tr>
);

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(`http://localhost:5000/transaction/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const transactions = await response.json();
      setTransactions(transactions);
    }

    getTransactions();

    return;
  }, [transactions.length]);

  async function deleteTransaction(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newTransactions = transactions.filter((el) => el._id !== id);
    setTransactions(newTransactions);
  }

  function transactionList() {
    return transactions.map((transaction) => {
      return (
        <Transaction
          transaction={transaction}
          deleteTransaction={() => deleteTransaction(transaction._id)}
          key={transaction._id}
        />
      );
    });
  }

  return (
    <div id="transactionListWindow">
      <div className="header">Transaction List</div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{transactionList()}</tbody>
      </table>
      <Link to="/create" id="addTransactionButton" style={{ textDecoration: 'none' }}>+</Link>
    </div>
  );
}