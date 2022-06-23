import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  function handleOnFormFieldChange(evt){
    props.setForm({... props.form, [evt.target.name]: evt.target.value});
  }
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm isCreating={props.isCreating} form={props.form} handleOnSubmit={props.handleOnSubmit} handleOnFormFieldChange={handleOnFormFieldChange}/>
    </div>
  )
}

export function AddTransactionForm(props) { 
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" placeholder="Description" onChange={props.handleOnFormFieldChange} value={props.form ? props.form.description : ""} />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" placeholder="Category" onChange={props.handleOnFormFieldChange}  value={props.form ? props.form.category : ""}/>
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" type="number" placeholder="Amount" onChange={props.handleOnFormFieldChange}  value={props.form ? props.form.amount : -1}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
