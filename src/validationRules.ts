import { ValidationRule } from "antd/lib/form";

export const requiredRule: ValidationRule = {required: true, message: "To pole jest wymagane"};

export const emailRule: ValidationRule = {type: "email", message: "Niepoprawny adres e-mail"};
