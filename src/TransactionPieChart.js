import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
      <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: 20 }}>
        {chartType === "Expense" ? "Expense Pie Chart" : "Income Pie Chart"}
      </Typography>
      <div style={{ maxWidth: 500, textAlign: "center" }}>
        <PieChart
          series={[{ data: pieChartData }]}
          width={300}
          height={320}
          alignItems="center"
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
            },
          }}
        />
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <IconButton
            onClick={() => handleChartTypeChange("Expense")}
            aria-label="Show Expense Chart"
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="body1" style={{ margin: "0 10px" }}>
            {chartType === "Expense" ? "Expense" : "Income"}
          </Typography>
          <IconButton
            onClick={() => handleChartTypeChange("Income")}
            aria-label="Show Income Chart"
          >
            <ArrowRightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionPieChart;
