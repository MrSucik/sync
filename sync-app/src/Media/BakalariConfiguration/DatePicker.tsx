import { Select, MenuItem } from "@material-ui/core";
import moment from "moment";
import React from "react";

interface Props {
  dates: string[];
  value: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<Props> = ({ onChange, value, dates }) => {
  return (
    <Select
      label="Vlastní datum"
      value={value}
      onChange={(event) => onChange(event.target.value as string)}
    >
      {dates.map((date) => (
        <MenuItem key={date} value={date}>
          {moment(date).format("DD-MM-YYYY")}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DatePicker;
