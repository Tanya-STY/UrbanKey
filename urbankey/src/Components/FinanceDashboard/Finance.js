import React, { useState, useEffect } from "react";
import "./Finance.css";
import OverviewGraph from "./OverviewGraph";
import axios from "axios";
import useAuth from "../../CustomeHooks/useAuth";
import { DataGrid } from "@mui/x-data-grid";

const Finance = () => {
  const { auth, setAuth } = useAuth();
  const [feePerSquareFoot, setFeePerSquareFoot] = useState(0);
  const [feePerParkingSpot, setFeePerParkingSpot] = useState(0);
  const [operationName, setOperationName] = useState("");
  const [cost, setCost] = useState(0);
  const [annualReport, setAnnualReport] = useState([]);
  const [overviewData, setOverviewData] = useState([]);
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [financeData, setFinanceData] = useState([]);

  const fetchUserData = async () => {
    try {
      const token = auth?.token;
      const response = await axios.get(
        "https://urbankey-backend.onrender.com/finance/information",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const financeData = response.data.filter(
        (item) => item.condo_fee !== "" && item.occupant_name !== ""
      );
      setFinanceData(financeData);
      console.log("Finance data: ", financeData);
    } catch (error) {
      console.log("Error fetching finance data: ", error);
      console.log(financeData);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "condo_fee", headerName: "Condo Fee", width: 130 },
    { field: "occupant_name", headerName: "Name", width: 200 },
    { field: "random_date", headerName: "Date", width: 200 },
    { field: "payment_type", headerName: "Payment Type", width: 200 },
    { field: "status", headerName: "Status", width: 130 },
  ];

  // const updateFees = () => {
  //   alert(
  //     `Fees updated: Fee per Square Foot: $${feePerSquareFoot}, Fee per Parking Spot: $${feePerParkingSpot}`
  //   )};

  const updateFees = async () => {
    try {
      const token = auth?.token;
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.post(
        "https://urbankey-backend.onrender.com/update_financial_status",
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
        "https://urbankey-backend.onrender.com/update_financial_cost",
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

    // Generate annual report
    setAnnualReport(financeData); //change this - ihana

    // Generate overview data
    const monthData = Array.from({ length: 12 }, () => 0);
    financeData.forEach((item) => {
      const month = new Date(item.random_date).getMonth();
      monthData[month] += item.condo_fee;
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
      <div className="another_overview-graph">
        {isGraphVisible && <OverviewGraph overviewData={overviewData} />}
      </div>
      <div className="annual-report-header">
        <h2>Annual Financial Reports</h2>
        <button className="btn green" onClick={generateOverviewGraph}>
          Generate
        </button>
        
      </div>
      <div className="annual-report">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={financeData.map((data, index) => ({
              id: index + 1,
              condo_fee: data.condo_fee,
              occupant_name: data.occupant_name,
              random_date: data.random_date,
              payment_type: data.payment_type,
              status: data.status,
            }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          /> 
        </div>
      </div>
    </div>
  );
};

export default Finance;