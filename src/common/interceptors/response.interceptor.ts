import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        // If data is already in the API response structure, return it directly
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        let message = 'Success';
        let responseData = data;

        if (data && typeof data === 'object') {
          if ('message' in data && typeof data.message === 'string') {
            message = data.message;
            // If the returned object has only 'message', we set responseData to null
            if (Object.keys(data).length === 1) {
              responseData = null;
            } else {
              // Copy response data without the message property to avoid redundancy
              const { message: _, ...rest } = data;
              responseData = rest;
            }
          }
        }

        return {
          success: true,
          statusCode,
          message,
          data: responseData !== undefined ? responseData : null,
        };
      }),
    );
  }
}
