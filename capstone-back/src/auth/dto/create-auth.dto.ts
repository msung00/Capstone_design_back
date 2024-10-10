import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    accessToken!: string;
}
