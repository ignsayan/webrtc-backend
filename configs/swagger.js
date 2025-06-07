import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const docPath = path.resolve('./docs');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${process.env.APP_NAME}`,
            version: '1.0.0',
            description: 'API Documentation V1',
        },
        servers: [
            {
                url: `${process.env.APP_HOST}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        path.join(docPath, '*.js'),
    ],
};

const swagger = swaggerJSDoc(options);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const __swaggerDistPath = path.join(
    __dirname,
    '..',
    'node_modules',
    'swagger-ui-dist'
);

export default swagger;