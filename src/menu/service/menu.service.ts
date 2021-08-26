import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../model/menu.entity';
import { Repository } from 'typeorm';
import { MenuDto } from '../model/menu.dto';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MenuService {
  
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) { }
  
  create(menu: MenuDto): Observable<MenuDto> {
    const nerwMenu = new MenuEntity();
    nerwMenu.menuname = menu.menuname;
    nerwMenu.role = menu.role;
    return from(this.menuRepository.save(nerwMenu));
  }

  findOne(id: number): Observable<MenuDto> {
    return from(this.menuRepository.findOne({id})).pipe(
        map((menu: MenuDto) => {
            const { ...result } = menu;
            return result;
        })
    )
  }

  findAll(): Observable<MenuDto[]> {
    return from(this.menuRepository.find()).pipe(
        map((menus: MenuDto[]) => {
            return menus;
        })
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.menuRepository.delete(id));
  }
}
