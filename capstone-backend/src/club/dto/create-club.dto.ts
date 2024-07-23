import { IsArray, IsInt, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateClubDto {
    @IsString()
    @IsNotEmpty()
    name: string;
   
    @IsString()
    @IsNotEmpty()
    school: string; 

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsArray()
    @IsNotEmpty()
    adminList: number[];

    @IsInt()
    @IsNotEmpty()
    userId: number;
    
    @IsInt()
    @IsOptional()
    memberId: number;
}
