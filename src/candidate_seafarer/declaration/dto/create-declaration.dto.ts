import { ApiProperty } from "@nestjs/swagger";

export class CreateDeclarationDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    employ_dismiss: boolean;
    @ApiProperty()
    serious_illness: boolean;
    @ApiProperty()
    eyesight: boolean;
    @ApiProperty()
    convict_in_court: boolean;
}
