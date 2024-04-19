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
  const { highlightedDates = {}, day, outsideCurrentMonth, ...other } = props;

  const isHighlighted = Object.keys(highlightedDates).some((key) =>
    day.isSame(dayjs(highlightedDates[key]), "day")
  );

  const getTooltipContent = (date) => {
    switch (date) {
      case highlightedDates.nursery:
        return `Nursery Start: ${highlightedDates.nursery} `;
      case highlightedDates.plant:
        return `Planting to Ground: ${highlightedDates.plant}`;
      case highlightedDates.harvest:
        return `Estimated Harvest: ${highlightedDates.harvest}`;
      default:
        return "";
    }
  };

  const getBadgeContent = (date) => {
    switch (date) {
      case highlightedDates.nursery:
        return "🌱";
      case highlightedDates.plant:
        return "🌿";
      case highlightedDates.harvest:
        return "🌾";
      default:
        return "🌾";
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

export default function DateCalendarValue({ markedDates }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDates, setHighlightedDates] = React.useState({});

  const generateHighlightedDates = () => {
    setIsLoading(true);
    setTimeout(() => {
      setHighlightedDates(markedDates);
      setIsLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    generateHighlightedDates();
  }, [markedDates]);

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
