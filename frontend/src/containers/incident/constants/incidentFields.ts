import { FieldConfig } from "../../../components/form/SmartField/types";

export const incidentFields: FieldConfig[] = [
  {
    id: "title",
    type: "text",
    label: "Título",
    placeholder: "Escreva o título",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Título é obrigatório",
      },
      {
        rule: (value) => value.length <= 100,
        message: "Título deve conter 100 caracteres ou menos",
      },
    ],
  },
  {
    id: "categoryId",
    type: "select",
    label: "Categoria",
    placeholder: "Selecione a categoria",
    required: true,
    fetchOptionsFromApi: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Categoria é obrigatória",
      },
    ],
  },
  {
    id: "content",
    type: "text",
    label: "Conteúdo",
    placeholder: "Escreva o conteúdo",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Conteúdo é obrigatório",
      },
      {
        rule: (value) => value.length >= 30,
        message: "Conteúdo deve ter pelo menos 30 caractéres",
      },
    ],
  },
  {
    id: "latitude",
    type: "number",
    label: "latitude",
    placeholder: "latitude",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "latitude is required",
      },
    ],
  },
  {
    id: "longitude",
    type: "number",
    label: "longitude",
    placeholder: "longitude",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "longitude is required",
      },
    ],
  },
];
