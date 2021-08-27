import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserDto } from '../models/user.dto';
import jwt_decode from 'jwt-decode'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService
  ) {}

  create(user: UserDto): Observable<UserDto> {
    return this.authService.hashPassword(user.password).pipe(
        switchMap((passwordHash: string) => {
            const newUser = new UserEntity();
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash;
            newUser.role = user.role;

            return from(this.userRepository.save(newUser)).pipe(
                map((user: UserDto) => {
                    const {password, ...result} = user;
                    return result;
                }),
                catchError(err => throwError(err))
            )
        })
    )
  }

  findOne(id: number): Observable<UserDto> {
    return from(this.userRepository.findOne({id})).pipe(
        map((user: UserDto) => {
            const {password, ...result} = user;
            return result;
        })
    )
  }

  findAll(): Observable<UserDto[]> {
    return from(this.userRepository.find()).pipe(
        map((users: UserDto[]) => {
            users.forEach(function (v) {delete v.password});
            return users;
        })
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: UserDto): Observable<any> {
    delete user.role;

    return from(this.userRepository.update(id, user));
  }

  updateRoleOfUser(id: number, user: UserDto): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  login(user: UserDto): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: UserDto) => {
          if(user) {
              return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
          } else {
              return 'Wrong Credentials';
          }
      })
    )
  }

  validateUser(email: string, password: string): Observable<UserDto> {
    return this.findByMail(email).pipe(
        switchMap((user: UserDto) => this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
                if(match) {
                    const {password, ...result} = user;
                    return result;
                } else {
                    throw Error;
                }
            })
        ))
    )
  }

  findByMail(email: string): Observable<UserDto> {
    return from(this.userRepository.findOne({email}));
  }

  //decoded acccessToken
  async findById(acccessToken: string): Promise<any> {
  
    const decoded: any = await jwt_decode(acccessToken);
    const userId: string = decoded.user
    const res = await this.userRepository.findOne({ where: {id:userId["id"]}})
   
    const Objdata: object = {
      id: res.id,
      username: res.username,
      email: res.email,
      role: res.role
    }

    return Objdata;
  }
}
