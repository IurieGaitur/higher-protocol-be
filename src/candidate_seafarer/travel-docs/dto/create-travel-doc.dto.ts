import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class CreateTravelDocDto {
    @ApiProperty()
    user_id: number;
    
    @ApiProperty()
    type: string;
    
    @ApiProperty()
    number_doc: string;
    
    @IsDate()
    @ApiProperty()
    valid_until: Date;
    
    @ApiProperty()
    file_doc: string;
}
