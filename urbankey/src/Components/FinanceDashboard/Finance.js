import React, { useState, useEffect } from "react";
import "./Finance.css";
import OverviewGraph from "./OverviewGraph";
import axios from "axios";
import useAuth from "../../CustomeHooks/useAuth";

const Finance = () => {
  const { auth, setAuth } = useAuth();
  const [feePerSquareFoot, setFeePerSquareFoot] = useState(0);
  const [feePerParkingSpot, setFeePerParkingSpot] = useState(0);
  const [operationName, setOperationName] = useState("");
  const [cost, setCost] = useState(0);
  const [annualReport, setAnnualReport] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [isGraphVisible, setIsGraphVisible] = useState(false);

  const updateFees = async () => {
    try {
      const token = auth?.token;
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.post(
        "http://localhost:5000/update_financial_status",
        {
          feePerParkingSpot,
          feePerSquareFoot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      // Update financial status after updating fees
      setCost(response.data.update_financial_status);
    } catch (error) {
      console.error("Error updating fees:", error);
    }
  };

  const addCost = async () => {
    try {
      const token = auth?.token;
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.post(
        "http://localhost:5000/update_financial_cost",
        {
          operation_cost: cost,
          operationName: operationName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data.total_cost);

       // Update financial status after adding cost
    setCost(response.data.total_cost); // Update the cost state with the updated financial status
    
    } catch (error) {
      console.error("Error adding cost:", error);
    }
  };

  const generateOverviewGraph = () => {
    const sampleData = [
      { name: "John Doe", date: "2024-01-15", amountPaid: 1200 },
      { name: "Jane Smith", date: "2024-02-20", amountPaid: 1500 },
      { name: "Alice Johnson", date: "2024-02-25", amountPaid: 2000 },
      { name: "Bob Brown", date: "2024-04-10", amountPaid: 1000 },
      { name: "Mohammad Bachir", date: "2024-06-20", amountPaid: 4500 },
      { name: "Rachida Sultan", date: "2024-07-25", amountPaid: 900 },
      { name: "Bob Marley", date: "2024-10-10", amountPaid: 1000 },
      { name: "Celine Dion", date: "2024-12-20", amountPaid: 3500 },
    ];

    // Generate annual report
    setAnnualReport(sampleData);

    // Generate overview data
    const monthData = Array.from({ length: 12 }, () => 0);
    sampleData.forEach((item) => {
      const month = new Date(item.date).getMonth();
      monthData[month] += item.amountPaid;
    });

    const overviewData = monthData.map((amountCollected, index) => ({
      month: new Date(2024, index, 1).toLocaleString("default", {
        month: "long",
      }),
      amountCollected,
    }));

    setOverviewData(overviewData);
    setIsGraphVisible(true);
  };

  return (
    <div className="finance-container">
      <h1>Financial Management Dashboard</h1> <br />
      <div className="dashboard">
        <section className="section">
          <h2>Condo Fees</h2>
          <div className="input-group">
            <label>Fee per Square Foot ($):</label>
            <input
              type="number"
              value={feePerSquareFoot}
              onChange={(e) => setFeePerSquareFoot(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Fee per Parking Spot ($):</label>
            <input
              type="number"
              value={feePerParkingSpot}
              onChange={(e) => setFeePerParkingSpot(e.target.value)}
            />
          </div>
          <button className="btn green" onClick={updateFees}>
            Update Fees
          </button>
        </section>

        <div className="separator"></div>

        <section className="section">
          <h2>Record Operational Costs</h2>
          <div className="input-group">
            <label>Operation Name:</label>
            <input
              type="text"
              value={operationName}
              onChange={(e) => setOperationName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Cost ($):</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <button className="btn green" onClick={addCost}>
            Add Cost
          </button>
        </section>
      </div>
      <h2>Overview</h2>
      <div style={{ width: "66%", margin: "0 auto" }}>
        {isGraphVisible && <OverviewGraph overviewData={overviewData} />}
      </div>
      <div className="annual-report-header">
        <h2>Annual Financial Reports</h2>
        <button className="btn green" onClick={generateOverviewGraph}>
          Generate
        </button>
      </div>
      <div className="annual-report">
        {annualReport.map((item, index) => (
          <div key={index} className="report-item">
            <p>
              <strong>Name:</strong> {item.name} |{" "}
              <strong>Date of Purchase:</strong> {item.date} |{" "}
              <strong>Amount Paid:</strong> ${item.amountPaid}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finance;
