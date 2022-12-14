import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect password or email');
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError('Incorrect password or email');
    const token = sign({}, 'thisisasecretkey', {
      subject: user.id,
      expiresIn: '7d',
    });
    return {
      user: {
        name: user.name,
        email,
      },
      token,
    };
  }
}

export default AuthenticateUserUseCase;
