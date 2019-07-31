import {
  IsInt,
  IsString,
  IsUrl,
  IsArray,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

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

  @ValidateIf(o => o.emails !== undefined)
  @IsArray()
  emails: ArrayValue[];
}
