import {
  createContext,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSmartForm } from "../../../components/form/SmartForm/hooks/useSmartForm";
import { incidentFields } from "../constants/incidentFields";
import {
  FormFields,
  FormValue,
} from "../../../components/form/SmartForm/types";
import { FormErrors } from "../../../models/IValidationReturn";
import { FieldConfig } from "../../../components/form/SmartField/types";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  IncidentPayload,
  incidentService,
} from "../../../services/incidentService";
import { useToast } from "../../../hooks/useToast";
import { TOAST_MESSAGES } from "../../../constants/toastMessages";
import { AxiosError } from "axios";
import { IApiErrorResponse } from "../../../models/IApiErrorResponse";

interface NewIncidentProviderProps {
  children: React.ReactNode;
}

export interface NewIncidentContextType {
  data: FormFields;
  handleChangeValue: (value: FormValue, id: string) => void;
  disabled: boolean;
  errors: FormErrors;
  handleSubmit: (e?: FormEvent) => void;
  loading: boolean;
  visibleFields: FieldConfig[];
  handleChangeContent: (value: string) => void;
  initialContent: string;
  draftSavedAt: Date;
}

export const NewIncidentContext = createContext<NewIncidentContextType>(
  {} as NewIncidentContextType
);

export const NewIncidentProvider = ({ children }: NewIncidentProviderProps) => {
  const { launchToast } = useToast();
  const storedIncidentDraft = localStorage.getItem("incidentDraft");
  const draft = storedIncidentDraft
    ? JSON.parse(storedIncidentDraft)
    : undefined;
  const navigate = useNavigate();
  const [draftSavedAt, setDraftSavedAt] = useState(new Date());

  const handleCreateIncident = async (data: IncidentPayload) => {
    const payload = {
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
    };
    incidentService
      .create(payload)
      .then((res) => {
        launchToast({
          title: TOAST_MESSAGES.Incident.createdTitle,
          description: TOAST_MESSAGES.Incident.createdDescription,
        });
        localStorage.removeItem("incidentDraft");
        navigate("/");
      })
      .catch((error: AxiosError<IApiErrorResponse>) => {
        launchToast({
          color: "danger",
          title: TOAST_MESSAGES.Incident.createErrorTitle,
          description:
            typeof error.response?.data?.message ||
            TOAST_MESSAGES.Incident.createErrorDescription,
        });
      });
  };

  const {
    data,
    handleChangeValue,
    disabled,
    errors,
    serializedFields,
    handleSubmit,
    loading,
  } = useSmartForm({
    dataValue: draft,
    fields: incidentFields,
    onSubmit: handleCreateIncident,
  });

  const handleChangeContent = useCallback(
    debounce((text: string) => {
      handleChangeValue(text, "content");
    }, 1000),
    []
  );

  const visibleFields = useMemo(
    () => serializedFields.filter((field) => field.id !== "content"),
    []
  );

  const initialContent = draft?.content || "";

  useEffect(() => {
    localStorage.setItem("incidentDraft", JSON.stringify(data));
    setDraftSavedAt(new Date());
  }, [data]);

  const values = useMemo(
    () => ({
      data,
      handleChangeValue,
      disabled,
      errors,
      handleSubmit,
      loading,
      visibleFields,
      handleChangeContent,
      initialContent,
      draftSavedAt,
    }),
    [
      data,
      disabled,
      errors,
      handleSubmit,
      loading,
      visibleFields,
      initialContent,
      draftSavedAt,
    ]
  );

  return (
    <NewIncidentContext.Provider value={values}>
      {children}
    </NewIncidentContext.Provider>
  );
};
