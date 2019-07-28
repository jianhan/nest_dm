/**
 * JwtPayload represent data structure used for generating signed JWT.
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload {
  sub: string;
  email: string;
}
