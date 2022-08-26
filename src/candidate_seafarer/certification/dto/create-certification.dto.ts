import { ApiProperty } from "@nestjs/swagger";

export class CreateCertificationDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    status: number;
    @ApiProperty()
    cert_number: string;
    @ApiProperty()
    valid_until: Date;
    @ApiProperty()
    type: number;
    @ApiProperty()
    file_cert: string;
}
