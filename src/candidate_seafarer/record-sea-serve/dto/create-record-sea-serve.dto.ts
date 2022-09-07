import { ApiProperty } from "@nestjs/swagger";

export class CreateRecordSeaServeDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    company_id: number;
    @ApiProperty()
    vessel_type: string;
    @ApiProperty()
    sign_date: Date;
    @ApiProperty()
    sign_off: Date;
}
