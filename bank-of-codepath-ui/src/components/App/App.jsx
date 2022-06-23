import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"

export default function App() {
  const [isLoading, setIsLoading] = React.useState("");
  const [transactions, setTransactions] = React.useState([]);
  const [transfers, setTransfers] = React.useState([]);
  const [error, setError] = React.useState("");
  const [filterInputValue, setFilterInputValue] = React.useState("");
  const [newTransactionForm, setNewTransactionForm] = React.useState({category:"",description:"",amount:0});
  const [isCreating, setIsCreating] = React.useState(false);
  return (
    <div className="App">
      <nav className="app">
        <BrowserRouter>
          <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
          <main>
            <Routes>
              <Route path="/" element={<Home transactions={transactions} setTransactions={setTransactions} transfers={transfers} setTransfers={setTransfers} error={error} setError={setError} isLoading={isLoading} setIsLoading={setIsLoading} filterInputValue={filterInputValue} newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm} isCreating={isCreating} setIsCreating={setIsCreating}/>} />
              <Route path="/transactions/:transactionId" element={<TransactionDetail />} />
            </Routes>
          </main>
        </BrowserRouter>
      </nav>
    </div>
  )
}
