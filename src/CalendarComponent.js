import * as React from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import "./Calendar.css";
const initialValue = dayjs("2024-04-01");

function ServerDay(props) {
  const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isHighlighted = highlightedDates.some((date) =>
    day.isSame(dayjs(date), "day")
  );

  const getTooltipContent = (date) => {
    switch (date) {
      case "2024-03-20":
        return "Nursery Start: March 20, 2024 (30 days)";
      case "2024-04-20":
        return "Planting to Ground: April 20, 2024";
      case "2024-08-18":
        return "Estimated Harvest: August 18, 2024 (120 days)";
      default:
        return "";
    }
  };

  const getBadgeContent = (date) => {
    switch (date) {
      case "2024-03-20":
        return "🌱";
      case "2024-04-20":
        return "🌱🌿";
      case "2024-08-18":
        return "🌾";
      default:
        return "";
    }
  };

  return (
    <Tooltip
      title={isHighlighted ? getTooltipContent(day.format("YYYY-MM-DD")) : ""}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      >
        {isHighlighted && (
          <Badge
            overlap="circular"
            badgeContent={getBadgeContent(day.format("YYYY-MM-DD"))}
          >
            {props.children}
          </Badge>
        )}
      </PickersDay>
    </Tooltip>
  );
}

export default function DateCalendarValue() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDates, setHighlightedDates] = React.useState([
    "2024-03-20",
    "2024-04-20",
    "2024-08-18",
  ]);

  const generateHighlightedDates = () => {
    setIsLoading(true);
    setTimeout(() => {
      setHighlightedDates(["2024-03-20", "2024-04-20", "2024-08-18"]); // Simulate fetching data
      setIsLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    generateHighlightedDates();
  }, []);

  const handleMonthChange = (date) => {
    generateHighlightedDates();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDates,
          },
        }}
      />
    </LocalizationProvider>
  );
}
