import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const TransactionPieChart = ({ transactions }) => {
  // Filter out expense transactions
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  // Organize expenses by category and calculate total expense for each category
  const expensesByCategory = expenseTransactions.reduce(
    (accumulator, currentTransaction) => {
      const { category, amount } = currentTransaction;
      accumulator[category] = (accumulator[category] || 0) + amount;
      return accumulator;
    },
    {}
  );

  // Convert expensesByCategory object to an array of objects suitable for PieChart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, totalAmount]) => ({
      id: category,
      label: category,
      value: totalAmount,
    })
  );

  return (
    <PieChart
      series={[
        {
          data: pieChartData,
        },
      ]}
      width={400}
      height={200}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 0,
        },
      }}
    />
  );
};

export default TransactionPieChart;
