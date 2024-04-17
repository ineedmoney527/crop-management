import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EqualizerIcon from "@mui/icons-material/Equalizer";

const TransactionCharts = ({ transactions }) => {
  const [chartType, setChartType] = useState("line");

  if (!transactions) {
    return null;
  }

  const handleChartTypeChange = (newChartType) => {
    setChartType(newChartType);
  };

  const renderChart = () => {
    if (chartType === "line") {
      return renderLineChart();
    } else {
      return renderBarChart();
    }
  };

  const renderLineChart = () => {
    // Group transactions by month
    const monthlyTransactions = transactions.reduce((acc, transaction) => {
      const month = transaction.date.substring(0, 7); // Extract YYYY-MM
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }
      if (transaction.type === "Income") {
        acc[month].income += transaction.amount;
      } else {
        acc[month].expenses += transaction.amount;
      }
      return acc;
    }, {});

    // Prepare data for the line chart
    const months = Object.keys(monthlyTransactions).sort();
    const incomeData = months.map((month) => monthlyTransactions[month].income);
    const expensesData = months.map(
      (month) => -monthlyTransactions[month].expenses
    );

    // Calculate profit or loss for each month
    const profitLossData = months.map(
      (month) =>
        monthlyTransactions[month].income - monthlyTransactions[month].expenses
    );

    return (
      <div>
        <LineChart
          width={500}
          height={300}
          series={[
            { data: incomeData, label: "Income", id: "incomeId" },
            { data: expensesData, label: "Expenses", id: "expensesId" },
            {
              data: profitLossData,
              label: "Profit/Loss",
              id: "profitLossId",
              stroke: "orange",
              strokeWidth: 1,
            }, // Adjust the strokeWidth as needed
          ]}
          xAxis={[{ data: months, scaleType: "band" }]}
        />
      </div>
    );
  };

  const renderBarChart = () => {
    // Group transactions by month
    const monthlyTransactions = transactions.reduce((acc, transaction) => {
      const month = transaction.date.substring(0, 7); // Extract YYYY-MM
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }
      if (transaction.type === "Income") {
        acc[month].income += transaction.amount;
      } else {
        acc[month].expenses += transaction.amount;
      }
      return acc;
    }, {});

    // Prepare data for the bar chart
    const months = Object.keys(monthlyTransactions).sort();
    const incomeData = months.map((month) => monthlyTransactions[month].income);
    const expensesData = months.map(
      (month) => -monthlyTransactions[month].expenses
    );

    return (
      <BarChart
        width={500}
        height={300}
        series={[
          {
            data: incomeData,
            label: "Income",
            id: "incomeId",
            stack: "stack1",
          },
          {
            data: expensesData,
            label: "Expenses",
            id: "expensesId",
            stack: "stack1",
          },
        ]}
        xAxis={[{ data: months, scaleType: "band" }]}
      />
    );
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
      >
        <IconButton
          onClick={() => handleChartTypeChange("line")}
          aria-label="Show Line Chart"
          style={{ 
            backgroundColor: '#E9BA15', 
            marginRight: '10px',
            transition: 'background-color 0.3s', // Smooth transition effect
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FFD54F'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#E9BA15'; }}
        >
          <TrendingUpIcon />
        </IconButton>
        <IconButton
          onClick={() => handleChartTypeChange("bar")}
          aria-label="Show Bar Chart"
          style={{ 
            backgroundColor: '#9FC173', 
            marginRight: '10px',
            transition: 'background-color 0.3s', // Smooth transition effect
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#CED581'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#9FC173'; }}
        
        >
          <EqualizerIcon />
        </IconButton>
      </div>
      {renderChart()}
    </div>
  );
};

export default TransactionCharts;
