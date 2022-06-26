// importações
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    //Ejetar nosso userService
    constructor(private userService: UserService) { }

    @Query(() => [User]) //informa ao graphql que esse método vai retornar um array de usuários e que não há modificação do banco com ela
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers()
        return users
    }

    @Mutation(() => User)//informa ao graphql que esse método vai modificar o estado no nosso banco de dados
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = await this.userService.createUser(data)
        return user
    }
}
