export type User = {
  id:  string;
  name:  string;
  email:  string;
  cpf:  string;
  phone:  string;
  role: "CITIZEN" | "BACKOFFICE" | "API";
  createdAt: string;
};
