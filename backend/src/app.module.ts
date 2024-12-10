import { Module, Logger } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().uri().required(),
      // TODO google where this could be useful .valid('development', 'production', 'test', 'provision').default('development')
      PORT: Joi.number().port().default(3000),
    }),
  }), 
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      
      const logger = new Logger('MongooseConnection');
      return {
        uri: configService.get<string>('MONGODB_URI'),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () => logger.log('connected'));
          connection.on('open', () => logger.log('open'));
          connection.on('disconnected', () => logger.warn('disconnected'));
          connection.on('reconnected', () => logger.log('reconnected'));
          connection.on('disconnecting', () => logger.warn('disconnecting'));
          return connection;
        },
      };
  },
    
  }),
  NotesModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
