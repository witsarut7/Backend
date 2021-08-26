import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MenuEntity } from './model/menu.entity';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './service/menu.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuEntity]),
    AuthModule,
    UserModule
  ],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
