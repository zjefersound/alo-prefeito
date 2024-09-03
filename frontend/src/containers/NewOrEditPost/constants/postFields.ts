import { FieldConfig } from "../../../components/form/SmartField/types";

export const postFields: FieldConfig[] = [
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
    validations: [
      {
        rule: (value) => value.trim() !== "",
        message: "Category is required",
      },
    ],
    options: [
      { value: "1", label: "Question" },
      { value: "2", label: "Issue" },
      { value: "3", label: "Discussion" },
      { value: "4", label: "Feedback" },
      { value: "5", label: "Debate" },
      { value: "6", label: "Tutorials" },
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
        rule: (value) => value.length >= 50,
        message: "Content must be at least 50 characters long",
      },
    ],
  },
  {
    id: "latitude",
    type: "text",
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
    type: "text",
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
