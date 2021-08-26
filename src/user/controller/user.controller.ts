import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDto, UserRole } from '../models/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() user: UserDto): Observable<UserDto | object> {
    return this.userService.create(user).pipe(
      map((user: UserDto) => user),
      catchError(err => of({ error: err.message }))
    );
  }

  @Post('login')
  login(@Body() user: UserDto): Observable<Object> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      })
    )
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Get(':id')
  findOne(@Param() params): Observable<UserDto> {
    return this.userService.findOne(params.id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Get()
  findAll(): Observable<UserDto[]> {
    return this.userService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<UserDto> {
    return this.userService.deleteOne(Number(id));
  }
 
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: UserDto): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateRoleOfUser(@Param('id') id: string, @Body() user: UserDto): Observable<UserDto> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getrole')
  async findUserById(@Body() params: any): Promise<any> {
    return await this.userService.findById(params.accessToken);
  }
}