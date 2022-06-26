// importações
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType() //Informa que é um objeto
@Entity() //Especifica ao código que essa classe se trata de uma entidade
export class User {
    @PrimaryGeneratedColumn() // Especifica que a coluna id é uma coluna de chave primaria que é gerada automaticamente
    @Field(() => ID) // Informa ao graphql o tipo da coluna
    id: string; // tipagem da coluna

    @Column()
    name: string;

    @Column()
    email: string;
}