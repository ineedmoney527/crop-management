import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { pink } from "@mui/material/colors";

const TransactionPieChart = ({ transactions }) => {
  const [chartType, setChartType] = useState("Expense");

  if (!transactions) {
    return null;
  }

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === chartType
  );

  const transactionsByCategory = filteredTransactions.reduce(
    (accumulator, currentTransaction) => {
      const { category, amount } = currentTransaction;
      accumulator[category] = (accumulator[category] || 0) + amount;
      return accumulator;
    },
    {}
  );

  const pieChartData = Object.entries(transactionsByCategory).map(
    ([category, totalAmount]) => ({
      id: category,
      label: category,
      value: totalAmount,
    })
  );

  const handleChartTypeChange = (newChartType) => {
    setChartType(newChartType);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: 5 }}>
        {chartType === "Expense" ? "Expense Pie Chart" : "Income Pie Chart"}
      </Typography>
      <div style={{ width:'400px', height:'300px',alignItems:'center',
          p:'20px', m: '0 auto',
          justifyContent:'center', display:'flex', flexDirection:'column'
          }}
        >
        <PieChart
          series={[{ data: pieChartData }]}
          width={300}
          height={320}
          backgroundColor={'#ccc'}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "left" },
              padding:'50px'
            },
          }}
          sx={{ml: '70px', pb: '0px',
          alignContent:'center', alignItems:'center', display:'flex'}}
        />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <IconButton
            onClick={() => handleChartTypeChange("Expense")}
            aria-label="Show Expense Chart"
            sx={{ mr: '10px', '&:hover': { backgroundColor: '#CED581' } }} // Add margin-right, margin-bottom, and hover style
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography style={{ marginTop: "5px", fontSize: '20px' }}>
            {chartType === "Expense" ? "Expense" : "Income"}
          </Typography>
          <IconButton
            onClick={() => handleChartTypeChange("Income")}
            aria-label="Show Income Chart"
            sx={{ ml: '10px', '&:hover': { backgroundColor: '#CED581' } }} // Add margin-left, margin-bottom, and hover style
          >
            <ArrowRightIcon />
          </IconButton>
        </div>

      </div>
    </div>
  );
};

export default TransactionPieChart;
