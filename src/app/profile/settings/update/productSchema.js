import { object, string, number } from "yup";

const productSchema = object({
  name: string()
    .required("Campo nome é obrigatório")
    .min(4, "O nome precisa ter no mínimo 4 caracteres"),
  email: string().required("Campo email é obrigatório").email("Email inválido"),
});

export default productSchema;
