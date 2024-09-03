import { useContext } from "react";
import { NewIncidentContext } from "../contexts/NewIncidentContext";

export const useNewIncident = () => {
  return useContext(NewIncidentContext);
};
