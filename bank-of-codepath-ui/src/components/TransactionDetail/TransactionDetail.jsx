import axios from "axios";
import * as React from "react"
import {useParams} from "react-router-dom"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = React.useState(false);
  const [transaction, setTransaction] = React.useState({});
  const [isLoading, setIsLoading] = React.useState("");
  const [error, setError] = React.useState("");

  const {transactionId}= useParams();

  const link= "http://localhost:3001/bank/transactions/" + transactionId;

  React.useEffect(() =>{
    async function fetchTransactionById(){
      setIsLoading(true);
      setHasFetched(false);
      axios.get(link).then((response) =>{
        setTransaction(response.data.transaction);
      }).catch((err) =>{
        setError(err);
      })
      setIsLoading(false);
      setHasFetched(true);
    }
    fetchTransactionById();
  }, [transactionId])

  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId}/>
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null }) {
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category">{transaction.category}</p>
      </div>

      <div className="card-content">
        <p className="description">{transaction.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )
}
