import { ApiProperty } from "@nestjs/swagger";
import { Candidate } from "../entities/candidate.entity";

export class CreateCandidateDto {
    
    @ApiProperty()
    personal_details: string;    

    @ApiProperty()
    about: string;

    @ApiProperty()
    experiences: string;

    @ApiProperty()
    degree: string;

    @ApiProperty()
    licences: string;

    @ApiProperty()
    hard_skills: string;

    @ApiProperty()
    soft_skills: string;

    @ApiProperty()
    position: string;

    @ApiProperty()
    starting_date: Date;

    @ApiProperty()
    location: string;

    @ApiProperty()
    is_remote: boolean;

    @ApiProperty()
    match_score: number;

    @ApiProperty()
    user_id: number;

    static toCandidate(dto: CreateCandidateDto): Candidate {
        const candidate = new Candidate();
        Object.assign(candidate, dto);
        return candidate;
    }
}
