import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { Button } from "@mui/material";

const CustomBooleanEditor = (props) => {
  const labelMap = {
    "All Day": "Cały dzień",
    Repeat: "Powtarzaj",
  };

  return (
    <AppointmentForm.BooleanEditor
      {...props}
      label={labelMap[props.label] || props.label}
    />
  );
};

const CustomTextEditor = (props) => {
  const placeholderMap = {
    "More Information": "Opis",
    Notes: "Notatki",
    Title: "Tytuł",
  };

  return (
    <AppointmentForm.TextEditor
      {...props}
      placeholder={placeholderMap[props.placeholder] || props.placeholder}
    />
  );
};

const CustomLabel = (props) => {
  const labelMap = {
    "More Information": "Opis",
    Details: "Szczegóły",
    "All Day": "Cały dzień",
    Repeat: "Powtarzaj",
  };

  return (
    <AppointmentForm.Label
      {...props}
      text={labelMap[props.text] || props.text}
    />
  );
};
const DateEditor = ({ excludeTime, ...restProps }) => {
  return (
    <AppointmentForm.DateEditor
      {...restProps}
      excludeTime={excludeTime}
      inputFormat={"DD/MM/YYYY HH:mm"}
    />
  );
};

const CustomCommandButton = ({ id, onExecute, ...restProps }) => {
  if (id === "saveButton") {
    return (
      <Button
        {...restProps}
        onClick={() => {
          onExecute();
        }}
        variant="contained"
        color="primary"
      >
        Zapisz
      </Button>
    );
  } else if (id === "deleteButton") {
    return (
      <Button
        {...restProps}
        onClick={() => {

          onExecute();
        }}
        style={{ marginRight: "auto", marginLeft: "1rem" }}
        variant="contained"
        color="error"
      >
        Usuń
      </Button>
    );
  } else if (id === "cancelButton") {
    return <></>;
  }
};

export { CustomBooleanEditor, CustomTextEditor, CustomLabel, DateEditor, CustomCommandButton };
