import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'iexchange-backend-test',
        type: 'postgres',
        host: configService.get('POSTGRES_HEROKU_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_HEROKU_USER'),
        password: configService.get('POSTGRES_HEROKU_PASSWORD'),
        database: configService.get('POSTGRES_HEROKU_DB'),
        logging: true,
        ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrationsTableName: 'migration',
        migrations: ['src/modules/migration/*.ts'],
        migrationsRun: true,
        cli: {
          migrationsDir: 'src/migration',
        },
        seeds: ['src/modules/seeds/**/*{.ts,.js}'],
        factories: ['src/modules/factories/**/*{.ts,.js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
