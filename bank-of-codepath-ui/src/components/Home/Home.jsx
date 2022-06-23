import * as React from "react"
import { useEffect } from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import axios from "axios"
import "./Home.css"

export default function Home(props) {

  function handleOnSubmitNewTransaction(){
    handleOnCreateTransaction();
  }

  async function handleOnCreateTransaction(){
    props.setIsCreating(true);
    axios.post("http://localhost:3001/bank/transactions", {transaction: props.newTransactionForm}).then(
      (response) =>{
        props.setTransactions(transactions => [...transactions, response.data.transaction]);
        props.setNewTransactionForm({category:"",description:"",amount:0});
        props.setIsCreating(false);
        console.log(props.transactions);
      },
      (err) =>{
        props.setError(err);
        props.setIsCreating(false);
      }
    )
  }

  let filteredTransactions=props.transactions;
  if(filteredTransactions && props.filterInputValue != ""){
    filteredTransactions = filteredTransactions.filter((transaction) =>{
      return transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase());
    })
  }

  React.useEffect(() =>{
    //props.setIsLoading(true);
    axios.get("http://localhost:3001/bank/transactions").then(
      (response) =>{
        props.setTransactions(response.data.transactions)
        
      }).catch((err) =>{
        props.setError(err);
      }
    )
     axios.get("http://localhost:3001/bank/transfers").then(
      (response) =>{
        props.setTransfers(response.data.transfers)
        props.setIsLoading(false);
      }).catch((err) =>{
        props.setError(err);
      }
    );

  }, []); 

  return (
    <div className="home">
      <AddTransaction isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm} handleOnSubmit={handleOnSubmitNewTransaction}/>
      {props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions}/>}
      {props.error ? <h2 className="error">{props.error}</h2> : null}
    </div>
  )
}
