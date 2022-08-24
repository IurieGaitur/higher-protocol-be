export class CreateMedicalCertificateDto {
    user_id: number;
    name: string;
    issue_by: string;
    date_issue: Date;
    valid_until: Date;
    med_file: string;
}
