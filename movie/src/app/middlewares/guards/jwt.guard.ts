import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../../domain/interface/tokenPayload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req?.headers?.authorization) {
      throw new ForbiddenException('Unauthenticated user');
    }
    const token = req?.headers?.authorization.split(' ')[1];
    const details: TokenPayload | string = this.jwtService.decode(token);
    req['user'] = details;
    return true;
  }
}
