// importações
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity'

@Injectable() // para fazer injeção de dependências no nestjs
export class UserService {

    //injeta o repositório utilizando a entidade de usuário
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    //método para listagem de usuários
    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users
    }

    //método para trazer um usuário por id
    async findUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user) {
            throw new NotFoundException("Usuário não encontrado")
        }

        return user
    }

    //método para criar um usuário
    async createUser(data: CreateUserInput): Promise<User> {
        const user = this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user)

        if (!userSaved) {
            throw new InternalServerErrorException('Falha na criação do usuário')
        }

        return userSaved
    }

    //método para alterar um usuário
    async updateUser(id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.findUserById(id);

        await this.userRepository.update(user, { ...data });

        const userUpdated = this.userRepository.create({ ...user, ...data })

        return userUpdated;
    }


    //método para exclusão de um usuário
    async deleteUser(id: string): Promise<boolean> {
        const user = await this.findUserById(id);

        const deleted = await this.userRepository.delete(user);

        if (deleted) {
            return true;
        }

        return false;
    }
}
