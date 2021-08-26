import { UserRole } from "src/user/models/user.dto";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('menu_entity')
  export class MenuEntity{
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true, nullable: true })
    menuname: string;
  
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;
    
    /*@ManyToOne(type => UserEntity, user => user.menuEn)
    userEn: UserEntity;*/
  }