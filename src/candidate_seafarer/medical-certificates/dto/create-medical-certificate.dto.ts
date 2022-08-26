import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalCertificateDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    issue_by: string;
    @ApiProperty()
    date_issue: Date;
    @ApiProperty()
    valid_until: Date;
    @ApiProperty()
    med_file: string;
}
