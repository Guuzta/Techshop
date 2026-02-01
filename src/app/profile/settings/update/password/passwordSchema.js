import { object, string } from "yup";

const productSchema = object({
  currentPassword: string()
    .required("Campo senha atual é obrigatório")
    .min(6, "A senha atual precisa ter no mínimo 6 caracteres"),
  newPassword: string()
    .required("Campo nova senha é obrigatório")
    .min(6, "A nova senha precisa ter no mínimo 6 caracteres"),
});

export default productSchema;
