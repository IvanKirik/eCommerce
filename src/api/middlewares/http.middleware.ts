import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { configService } from '../../services/config.service';

export const httpMiddleware: HttpMiddlewareOptions = {
  host: configService.get('VITE_API_URL_ECOMMERCE'),
  fetch,
};
