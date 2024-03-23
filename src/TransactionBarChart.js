import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
const TransactionBarChart = ({ transactions }) => {
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

  // Prepare data for the chart
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
        { data: incomeData, label: "Income", id: "incomeId", stack: "stack1" },
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
export default TransactionBarChart;
