import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IdentificationTypeController } from '../controllers/v1/identificationType.controller';
import { PrismaService } from 'src/core/application/prisma/prisma.service';
import { LoggerModule } from 'src/core/application/loggger/logger.module';
import { IdenditicatioService } from 'src/core/application/services/identification.service';
import { HttpModule } from '@nestjs/axios';
import { AuthGuardModule } from 'auth-guard-michimoney';
import { AuthConfig } from 'auth-guard-michimoney/dist/auth-config.dto';

@Module({
  imports: [
    LoggerModule.register(process.env.USE_KAFKA === 'true'),
    HttpModule,
    AuthGuardModule.register({
      introspectionUrl: 'http://192.168.68.144:8080/realms/MICHIMONEY/protocol/openid-connect/token/introspect',
      clientId: 'mi-app',
      clientSecret: 'cWBFSs49Zp5cSOdvTv25KMLgYIQgXJIF',
    } as AuthConfig), // Proporciona la configuración aquí*/
  ],
  controllers:[IdentificationTypeController],
  providers: [IdenditicatioService, PrismaService],
})
export class IdentificationModule {}
