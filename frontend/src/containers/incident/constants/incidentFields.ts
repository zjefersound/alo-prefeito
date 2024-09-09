import { FieldConfig } from "../../../components/form/SmartField/types";

export const incidentFields: FieldConfig[] = [
  {
    id: "title",
    type: "text",
    label: "Add a title",
    placeholder: "Your creative title",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Title is required",
      },
      {
        rule: (value) => value.length <= 100,
        message: "Title must be 100 characters or less",
      },
    ],
  },
  {
    id: "categoryId",
    type: "select",
    label: "Add a category",
    placeholder: "Select the category",
    required: true,
    fetchOptionsFromApi: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Category is required",
      },
    ],
  },
  {
    id: "content",
    type: "text",
    label: "Content",
    placeholder: "Enter the content",
    required: true,
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Content is required",
      },
      {
        rule: (value) => value.length >= 30,
        message: "Content must be at least 30 characters long",
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
