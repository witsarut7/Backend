import { MenuEntity } from "src/menu/model/menu.entity";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { UserRole } from "./user.dto";


@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    username: string;
  
    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLocaleLowerCase();
    }

    /*@OneToMany(type => MenuEntity, menuEntity => menuEntity.userEn)
    menuEn: MenuEntity[];*/
}