// importações
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity'

@Injectable() // para fazer injeção de dependências no nestjs
export class UserService {

    //injeta o repositório utilizando a entidade de usuário
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    //método para criar um usuário
    async createUser(data: CreateUserInput): Promise<User> {
        const user = await this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user)

        if (!userSaved) {
            throw new InternalServerErrorException('Falha na criação do usuário')
        }

        return userSaved
    }
}
