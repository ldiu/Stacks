import React, { useState } from "react";
import { useNavigate } from "react-router";
import CurrencyInput from 'react-currency-input-field';

export default function Create() {
  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: 0,
    description: "",
    notes: ""
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newTransaction = { ...form };

    await fetch("http://localhost:5000/transaction/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ date: "", category: "", amount: "", description: "", notes: ""});
    navigate("/");
  }

  return (
    <div id="addTransactionWindow">
      <div className="header">Add New Transaction</div>
      <form onSubmit={onSubmit}>

        <div className="formItems">
          <label className="formLabel" htmlFor="date">Date:</label>
          <input
            type="date"
            className="formInput"
            id="date"
            value={form.date}
            required
      
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </div>

        <div className="formItems">
          <label className="formLabel" htmlFor="date">Category:</label>
          <input
            type="category"
            className="formInput"
            id="category"
            value={form.category}
            onChange={(e) => updateForm({ category: e.target.value })}
          />
        </div>
        
        <div className="formItems">
          <label className="formLabel" htmlFor="amount">Amount:</label>

          <CurrencyInput
            id="amount"
            className="formInput"
            placeholder="$0.00"
            prefix="$"
            decimalScale={2}
            required
            onValueChange={(e) => updateForm({amount: e})}
          />
       </div>

       <div className="formItems">
          <label className="formLabel" htmlFor="description">Description:</label>
          <input
            type="text"
            className="formInput"
            id="description"
            placeholder=" &#34;Cineplex Tickets&#34;"
            value={form.description}
            required
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>

        <div className="formItems">
          <label className="formLabel" htmlFor="notes">Notes:</label>
          <textarea
            type="text"
            className="formInput"
            id="notes"
            value={form.notes}
            onChange={(e) => updateForm({ notes: e.target.value })}
          ></textarea>
        </div>

        <div className="formSubmit">
          <input
            type="submit"
            value="Add Transaction"
            className="formButton"
          />
        </div>
      </form>
    </div>
  );
}
