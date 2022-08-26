import { ApiProperty } from "@nestjs/swagger";

export class CreateExperienceDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    rank: number;
    @ApiProperty()
    company_id: number;
    @ApiProperty()
    vessel_type: string;
    @ApiProperty()
    duration: number;
    @ApiProperty()
    valid_status: string;
    @ApiProperty()
    file_experience: string;
}
