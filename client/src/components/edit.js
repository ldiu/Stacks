import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   date: "",
   category: "",
   amount: 0,
   description: "",
   notes: "",
   transactions: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/transaction/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const transaction = await response.json();
     if (!transaction) {
       window.alert(`Transaction with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(transaction);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedTransaction = {
    date: form.date,
    category: form.category,
    amount: form.amount,
    description: form.description,
    notes: form.notes,
   };
 
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedTransaction),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 return (
   <div id="update">
     <div className="header">Update transaction</div>
     <form onSubmit={onSubmit}>
       <div className="formItem">
         <label className="formLabel" htmlFor="date">Date: </label>
         <input
           type="text"
           className="formInput"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <div className="formItem">
         <label className="formLabel" htmlFor="category">Category: </label>
         <input
           type="text"
           className="formInput"
           id="category"
           value={form.category}
           onChange={(e) => updateForm({ category: e.target.value })}
         />
       </div>
       <div className="formItem">
         <label className="formLabel" htmlFor="amount">Amount: </label>
         <input
           type="text"
           className="formInput"
           id="amount"
           value={form.amount}
           onValueChange={(e) => updateForm({amount: e})}
         />
       </div>
       <div className="formItem">
         <label className="formLabel" htmlFor="description">Description: </label>
         <input
           type="text"
           className="formInput"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="formItem">
         <label className="formLabel" htmlFor="notes">Notes: </label>
         <textarea
            type="text"
            className="formInput"
            id="notes"
            value={form.notes}
           onChange={(e) => updateForm({ notes: e.target.value })}
           ></textarea>
       </div>
       <br />
 
       <div className="formItem">
         <input
           type="submit"
           value="Update Transaction"
           className="formButton"
         />
       </div>
     </form>
   </div>
 );
}