import { ApiProperty } from "@nestjs/swagger";

export class CreateEducationDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    from: Date;
    @ApiProperty()
    to: Date;
    @ApiProperty()
    file_education: string;
}
