import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({
  student,
  alumni,
  admin,
}: {
  student: any;
  alumni: any;
  admin: any;
}) {
  return (
    <div className="my-3 font-bold">
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label ">Role</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="flex items-center justify-center"
        >
          <FormControlLabel
            value="student"
            control={<Radio />}
            label="student"
            onChange={student}
          />
          <FormControlLabel
            value="alumni"
            control={<Radio />}
            label="alumni"
            onChange={alumni}
          />
          <FormControlLabel
            value="admin"
            control={<Radio />}
            label="admin"
            onChange={admin}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
