import { useNavigate } from "react-router-dom";
import { FieldConfig } from "../components/form/SmartField/types";
import { SmartForm } from "../components/form/SmartForm";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { userService, UserSignupPayload } from "../services/userService";
import { useState } from "react";
import { Alert } from "../components/ui/Alert";
import { TOAST_MESSAGES } from "../constants/toastMessages";
import { useToast } from "../hooks/useToast";
const signupFormFields: FieldConfig[] = [
  {
    id: "name",
    label: "Nome",
    type: "text",
    placeholder: "Digite seu nome",
    validations: [
      {
        rule: (value) => value.trim().length >= 3,
        message: "O nome deve ter pelo menos 3 caracteres",
      },
      {
        rule: (value) => value.split(" ").length > 1,
        message: "Insira seu sobrenome",
      },
    ],
  },
  {
    id: "email",
    label: "Email",
    type: "text",
    placeholder: "Digite seu email",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "O email é obrigatório",
      },
      {
        rule: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Endereço de email inválido",
      },
    ],
  },
  {
    id: "phone",
    label: "Número de telefone",
    type: "tel",
    placeholder: "Digite seu telefone",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "O telefone é obrigatório",
      },
      {
        rule: (value) => /^[0-9]{10,11}$/.test(value),
        message: "O telefone deve ter 11 dígitos",
      },
    ],
  },
  {
    id: "cpf",
    label: "CPF",
    type: "text",
    placeholder: "Digite seu CPF",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "O CPF é obrigatório",
      },
      {
        rule: (value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value),
        message: "CPF inválido. Ex: 000.000.000-00",
      },
    ],
  },
  {
    id: "password",
    label: "Senha",
    type: "password",
    placeholder: "Digite sua senha",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "A senha é obrigatória",
      },
      {
        rule: (value) => value.length >= 8,
        message: "A senha deve ter pelo menos 8 caracteres",
      },
    ],
  },
  {
    id: "confirmPassword",
    label: "Confirme sua senha",
    type: "password",
    placeholder: "Digite sua senha novamente",
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "A confirmação da senha é obrigatória",
      },
      {
        rule: (value, form) => value === form.password,
        message: "As senhas não correspondem",
      },
    ],
  },
];

export function SignupForm() {
  const { launchToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (data: UserSignupPayload) => {
    const payload = {
      ...data,
      role: "CITIZEN"
    }
    return userService
      .signup(payload)
      .then(() => {
        navigate("/login");
        launchToast({
          title: TOAST_MESSAGES.Signup.createdTitle,
          description: TOAST_MESSAGES.Signup.createdDescription,
        });
      })
      .catch((error) => {
        setError(
          error.response?.data?.error ||
            TOAST_MESSAGES.common.unexpectedErrorDescription,
        );
      });
  };
  const formState = useSmartForm({
    fields: signupFormFields,
    onSubmit,
  });
  return (
    <>
      <SmartForm submitText="Criar conta" formState={formState} />
      {error && <Alert color="error">{error}</Alert>}
    </>
  );
}
