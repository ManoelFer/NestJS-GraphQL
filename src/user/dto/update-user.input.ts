// importações
import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType() //Define que essa classe é do tipo input, que são os valores que serão recebidos pelo endpoint
export class UpdateUserInput {
    @IsString()// Validação do tipo do input
    @IsNotEmpty({ message: "Campo de name obrigatório" })//Validação para não aceitar o valor vazio para chave
    @IsOptional()// Define o campo como opcional
    name?: string; //Tipagem da coluna

    @IsEmail()// Validação do tipo do input
    @IsNotEmpty({ message: "Campo de email obrigatório" })//Validação para não aceitar o valor vazio para chave
    @IsOptional()// Define o campo como opcional
    email?: string; //Tipagem da coluna
}