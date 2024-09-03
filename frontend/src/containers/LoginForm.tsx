import { MdLockOutline, MdPersonOutline } from "react-icons/md";
import { FieldConfig } from "../components/form/SmartField/types";
import { useAuth } from "../hooks/useAuth";
import { useSmartForm } from "../components/form/SmartForm/hooks/useSmartForm";
import { SmartField } from "../components/form/SmartField";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { memo } from "react";
import { Loading } from "../components/ui/Loading";
const MemoizedSmartField = memo(SmartField);

const loginFormFields: FieldConfig[] = [
  {
    id: "email",
    type: "text",
    label: "Email",
    placeholder: "Digite seu email",
    Icon: MdPersonOutline,
  },
  {
    id: "password",
    type: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    Icon: MdLockOutline,
  },
];

export function LoginForm() {
  const { handleLogin } = useAuth();
  const {
    data,
    handleChangeValue,
    serializedFields,
    errors,
    handleSubmit,
    loading,
  } = useSmartForm({
    fields: loginFormFields,
    onSubmit: handleLogin,
  });
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      {serializedFields.map((field) => (
        <MemoizedSmartField
          key={field.id}
          value={data[field.id]}
          onChangeValue={handleChangeValue}
          config={field}
          error={errors[field.id]}
        />
      ))}
      <Button className="w-full flex justify-center" behavior="submit">
        {loading && <Loading size="sm" className="mr-3" />}
        Login
      </Button>
    </form>
  );
}
