"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
        bodyParser: true,
    });
    app.use(helmet);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const configService = await app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Movie API')
        .setDescription('A simple move API that can create and view list of movies')
        .setVersion('1.0')
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    const PORT = (_a = configService.get('PORT')) !== null && _a !== void 0 ? _a : 3000;
    await app.listen(PORT, () => {
        console.log(`auth svc running at port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map