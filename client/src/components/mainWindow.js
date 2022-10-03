import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./progressBar";

export default function MainWindow() {
  var today = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let thisMonth = months[today.getMonth()];

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

  var total = 0;
  transactions.forEach(function (transaction) {
    total += (parseFloat(transaction.amount));
  });

  var netSpending = 0;
  var max = 1000;
  netSpending = (max - total).toFixed(2);
  total = total.toFixed(2);
  let comment = "";

  if (netSpending > 0){
    comment = "under";
  } else{
    comment = "over";
  }

  return (
    <div id='mainDisplay'>
      <div id="MDTitle"> {thisMonth} Budget </div>
      <div id="MDRatio">${total} / ${max}</div>
      <ProgressBar bgcolor={getFillColor(total, max) }
                min={0}
                max={max}
                total={total}
            />
      <div id="MDComment">You are ${Math.abs(netSpending)} {comment} budget. </div>
      <Link to="/view" id="viewAll" style={{ textDecoration: 'none' }}>View all Transactions</Link>
      <Link to="/create" id="addTransactionButton" style={{ textDecoration: 'none' }}>+</Link>
    </div>
  )
  function getFillColor(total, max) {
    
    var net = total / max;

    if (net < .5) {
      return " rgb(45, 49, 66)"
  } else if (net < .80) {
      return "rgb(204, 85, 0)"}
      else {
          return "rgb(128,0,0)"
      }

}
}
