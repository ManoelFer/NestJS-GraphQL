// importações
import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType() //Define que essa classe é do tipo input, que são os valores que serão recebidos pelo endpoint
export class CreateUserInput {
    @IsString()// Validação do tipo do input
    @IsNotEmpty({ message: "Campo de name obrigatório" })//Validação para não aceitar o valor vazio para chave
    name: string; //Tipagem da coluna

    @IsEmail()// Validação do tipo do input
    @IsNotEmpty({ message: "Campo de email obrigatório" })//Validação para não aceitar o valor vazio para chave
    email: string; //Tipagem da coluna
}