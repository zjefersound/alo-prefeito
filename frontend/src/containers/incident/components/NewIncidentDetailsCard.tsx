import { memo, useMemo } from "react";
import { SmartField } from "../../../components/form/SmartField";
import { Card } from "../../../components/ui/Card";
import { Heading } from "../../../components/ui/Heading";
import { Text } from "../../../components/ui/Text";
import { useNewIncident } from "../hooks/useNewIncident";
import { Button } from "../../../components/ui/Button";
import { MdOutlineSend } from "react-icons/md";
import { format } from "date-fns";
import { Loading } from "../../../components/ui/Loading";
import { useCategories } from "../../../hooks/useCategories";
import { ISelectOption } from "../../../models/ISelectOption";
const MemoizedSmartField = memo(SmartField);

export function NewIncidentDetailsCard() {
  const {
    data,
    errors,
    disabled,
    loading,
    visibleFields,
    handleSubmit,
    handleChangeValue,
    draftSavedAt,
  } = useNewIncident();
  const { categories } = useCategories();
  const options: { [key: string]: ISelectOption[] } = useMemo(
    () => ({
      categoryId: categories.map((c) => ({ value: c.id, label: c.name })),
    }),
    [categories]
  );
  return (
    <Card className="flex flex-col">
      <Heading size="xs">Detalhes do incidente</Heading>
      <Text asChild>
        <span className="mt-2">
          Essa informação ajuda outras pessoas entenderem o contexo do seu
          incidente.
        </span>
      </Text>
      <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
        {visibleFields.map((field) => (
          <MemoizedSmartField
            key={field.id}
            config={field}
            value={data[field.id]}
            onChangeValue={handleChangeValue}
            disabled={disabled}
            error={errors[field.id]}
            options={options[field.id]}
          />
        ))}
        <Button className="w-full" type="submit" disabled={disabled}>
          {loading && <Loading className="mr-2" size="sm" />}
          <MdOutlineSend className="size-6 mr-2" /> Publicar incidente
        </Button>
        <Text>Rescunho salvo {format(draftSavedAt, "hh:mm aaaaa'm'")}</Text>
      </form>
    </Card>
  );
}
