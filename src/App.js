import React, { useState, useCallback, useEffect } from "react";
import Paper from "@mui/material/Paper";
import "moment/locale/pl";

import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  MonthView,
  DateNavigator,
  TodayButton,
  DayView,
  ViewSwitcher,
  Toolbar,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

import parseDateString from "./utils/paarseDateString";
import formatDateString from "./utils/formatDateString";
import {
  CustomBooleanEditor,
  CustomTextEditor,
  CustomLabel,
  DateEditor,
  CustomCommandButton,
} from "./components/CustomAppointmentForm";

const App = () => {
  const currentDate = new Date();
  const [data, setData] = useState([]);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "date"), (snapshot) => {
      const appointmentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: parseDateString(doc.data().startDate),
        endDate: parseDateString(doc.data().endDate),
      }));
      setData(appointmentsData);
    });

    return () => unsubscribe();
  }, []);

  const changeAddedAppointment = useCallback((addedAppointment) => {
    setAddedAppointment(addedAppointment);
  }, []);

  const changeAppointmentChanges = useCallback((appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  }, []);

  const changeEditingAppointment = useCallback((editingAppointment) => {
    setEditingAppointment(editingAppointment);
  }, []);

  const commitChanges = useCallback(async ({ added, changed, deleted }) => {
    if (added) {
      const formattedAdded = {
        ...added,
        startDate: formatDateString(new Date(added.startDate)),
        endDate: formatDateString(new Date(added.endDate)),
      };
      await addDoc(collection(db, "date"), formattedAdded);
    }
    if (changed) {
      const appointmentId = Object.keys(changed)[0];
      const updatedChanges = changed[appointmentId];

      if (updatedChanges.startDate) {
        updatedChanges.startDate = formatDateString(
          new Date(updatedChanges.startDate)
        );
      }

      if (updatedChanges.endDate) {
        updatedChanges.endDate = formatDateString(
          new Date(updatedChanges.endDate)
        );
      }

      const appointmentDoc = doc(db, "date", appointmentId);
      await updateDoc(appointmentDoc, updatedChanges);
    }
    if (deleted !== undefined) {
      const appointmentDoc = doc(db, "date", deleted);
      await deleteDoc(appointmentDoc);
    }
  }, []);

  return (
    <Paper>
      <Scheduler data={data} locale={"pl-PL"}>
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}
        />
        <EditRecurrenceMenu />
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <MonthView startDayHour={9} endDayHour={19} displayName="Miesiące" />
        <DayView startDayHour={9} endDayHour={19} displayName="Dni" />
        <WeekView startDayHour={9} endDayHour={19} displayName="Tygodnie" />
        <AllDayPanel />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton messages={{ today: "Dzisiaj" }} />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          commandButtonComponent={CustomCommandButton}
          dateEditorComponent={DateEditor}
          textEditorComponent={CustomTextEditor}
          labelComponent={CustomLabel}
          booleanEditorComponent={CustomBooleanEditor}
        />
      </Scheduler>
    </Paper>
  );
};

export default App;
