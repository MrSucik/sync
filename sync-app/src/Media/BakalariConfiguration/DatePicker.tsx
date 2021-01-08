import { Select, MenuItem } from "@material-ui/core";
import moment from "moment";
import React from "react";

interface Props {
  dates: string[];
  value: number;
  onChange: (value: number) => void;
}

const DatePicker: React.FC<Props> = ({ onChange, value, dates }) => {
  return (
    <Select
      label="Vlastní datum"
      value={moment(value).format("DD-MM-YYYY")}
      onChange={(event) =>
        onChange(moment(event.target.value as string, "DD-MM-YYYY").valueOf())
      }
      MenuProps={{ PaperProps: { style: { backgroundColor: "#fff" } } }}
    >
      {dates.map((date) => (
        <MenuItem key={date} value={date}>
          {date}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DatePicker;
