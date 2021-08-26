import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { MenuDto } from '../model/menu.dto';
import { MenuService } from '../service/menu.service';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/user/models/user.dto';

@Controller('menus')
export class MenuController {

  constructor(private menuService: MenuService) { }
  
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() menu: MenuDto): Observable<MenuDto | object> {
    return this.menuService.create(menu).pipe(
      map((menu: MenuDto) => menu),
      catchError(err => of({ error: err.message }))
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params): Observable<MenuDto> {
    return this.menuService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Observable<MenuDto[]> {
    return this.menuService.findAll();
  }

  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<MenuDto> {
    return this.menuService.deleteOne(Number(id));
  }

}
