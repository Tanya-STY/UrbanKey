import React from 'react';
import './PaymentHistory.css';

/*the monthPay for condo owner payer is the amount they need to pay every month taken
from OwnerDashboard.js*/
const PaymentHistory = ({ onClose, monthPay }) => { 
  const payments = [
    { date: 'September 2023', amount: '$' + monthPay.toFixed(2), method: 'Bank Transfer', reference: '12345', status: 'Paid' },
    { date: 'October 2023', amount: '$' + monthPay.toFixed(2), method: 'Credit Card', reference: '65078', status: 'Pending' },
    { date: 'November 2023', amount: '$' + monthPay.toFixed(2), method: 'Debit Card', reference: '78965', status: 'Pending' },
    { date: 'December 2023', amount: '$' + monthPay.toFixed(2), method: 'Credit Card', reference: '83743', status: 'Rejected'}
  ];

  return (
    <div className="payment-history-container">
      <div className='payment-history-overlay' onClick={onClose}></div>
      <div className='payment-history-popup'>
      <h1 className="title">Payment History</h1>
      <table className="payment-history-table">
        <thead>
          <tr>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Reference Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.date}</td>
              <td>{payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.reference}</td>
              <td className={payment.status.toLowerCase()}>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="go-back-button" onClick={onClose}>Go Back</button>
        {/* <button className="see-invoices-button">See Invoices</button> */}
      </div>
    </div>
    </div>
  );
};

export default PaymentHistory;