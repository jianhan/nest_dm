import { IsInt, IsString, IsUrl, IsArray, IsNotEmpty } from 'class-validator';

export interface ArrayValue {
  value: string;
}
export class GithubProfile {
  @IsInt()
  id: number;

  @IsString()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsUrl()
  profileUrl: string;

  @IsArray()
  photos: ArrayValue[];

  @IsArray()
  emails: ArrayValue[];
}
