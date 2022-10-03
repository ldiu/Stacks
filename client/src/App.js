import React from "react";
import { Route, Routes } from "react-router-dom";
import './style.css';
import Login from "./components/login";
import Navbar from "./components/navbar";
import TransactionList from "./components/transactionList";
import Edit from "./components/edit";
import Create from "./components/create";
import MainWindow from "./components/mainWindow";
import Register from "./components/register";


 
const App = () => {
 return (
   <div id="mainContainer">
     <Navbar />
     <div id="main">
     <Routes>
       <Route exact path="/" element={<MainWindow />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/view" element={<TransactionList  />} />
       <Route path="/login" element={<Login  />} />
       <Route path="/register" element={<Register  />} />
     </Routes>
     </div>
   </div>
 );
};
 
export default App;