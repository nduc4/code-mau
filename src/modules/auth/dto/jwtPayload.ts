export interface JwtPayload {
  iat: number;
  exp: number;
  email: string;
}

export interface JwtRefreshPayload {
  iat: number;
  exp: number;
  sub: string;
}
