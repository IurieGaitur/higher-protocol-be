import { Candidate } from "../entities/candidate.entity";

export class CreateCandidateDto {
    
    personal_details: string;    
    about: string;
    experiences: string;
    degree: string;
    licences: string;
    hard_skills: string;
    soft_skills: string;
    position: string;
    starting_date: Date;
    location: string;
    is_remote: boolean;
    match_score: number;
    user_id: number;

    static toCandidate(dto: CreateCandidateDto): Candidate {
        const candidate = new Candidate();
        Object.assign(candidate, dto);
        return candidate;
    }
}
