// importações
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    //Ejetar nosso userService
    constructor(private userService: UserService) { }

    @Mutation()//informa ao graphql que esse método vai modificar o estado no nosso banco de dados
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = await this.userService.createUser(data)
        return user
    }
}
