// importações
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
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

    @Query(() => User) //informa ao graphql que esse método vai retornar um usuário em especifico e que não há modificação do banco
    async user(@Args('id') id: string): Promise<User> {
        const user = await this.userService.findUserById(id)
        return user
    }

    @Mutation(() => User)//informa ao graphql que esse método vai modificar o estado no nosso banco de dados
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = await this.userService.createUser(data)
        return user
    }

    @Mutation(() => User)//informa ao graphql que esse método vai modificar o estado no nosso banco de dados
    async updateUser(
        @Args('id') id: string,
        @Args('data') data: UpdateUserInput
    ): Promise<User> {
        const user = this.userService.updateUser(id, data);
        return user;
    }

    @Mutation(() => Boolean)//informa ao graphql que esse método vai modificar o estado no nosso banco de dados
    async deleteUser(
        @Args('id') id: string
    ): Promise<boolean> {
        const deleted = await this.userService.deleteUser(id);
        return deleted;
    }
}
