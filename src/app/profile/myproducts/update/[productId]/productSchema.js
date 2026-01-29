import { object, string, number } from "yup";

const productSchema = object({
  name: string()
    .required("Campo nome é obrigatório")
    .min(4, "O nome precisa ter no mínimo 4 caracteres"),
  description: string()
    .required("Campo descrição é obrigatório")
    .min(15, "A descrição  precisa ter no mínimo 15 caracteres"),
  price: number("Apenas números são permitidos")
    .required("Campo preço é obrigatório")
    .min(0, "O preço não pode ser negativo")
    .typeError("Apenas números são permitidos"),
  stock: number()
    .integer("Quantidade precisa ser um número inteiro")
    .required("Campo estoque é obrigatório")
    .min(0, "A quantidade não pode ser negativa")
    .typeError("Apenas números são permitidos"),
});

export default productSchema;
