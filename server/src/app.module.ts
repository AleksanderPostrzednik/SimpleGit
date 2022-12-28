import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { GitosisModule } from './gitosis/gitosis.module';
import { ServiceController } from './service/service.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    PrismaModule, GitosisModule
  ],
  controllers: [UserController, ServiceController],
})
export class AppModule {}
