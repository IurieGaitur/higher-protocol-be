import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    rank: number;
    @ApiProperty()
    experience_year: number;
    @ApiProperty()
    vessel_type: number;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    nationality: string;
    @ApiProperty()
    coverall_size: number;
    @ApiProperty()
    height: number;
    @ApiProperty()
    address: string;
    @ApiProperty()
    date_of_birth: Date;
    @ApiProperty()
    age: number;
    @ApiProperty()
    place_birth: string;
    @ApiProperty()
    religion: string;
    @ApiProperty()
    marit_status: string;
    @ApiProperty()
    weight: number;
    @ApiProperty()
    shoe_size: number;
}
