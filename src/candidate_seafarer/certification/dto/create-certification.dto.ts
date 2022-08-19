export class CreateCertificationDto {
    user_id: number;
    name: string;
    status: number;
    cert_number: string;
    valid_until: Date;
    type: number;
    file_cert: string;
}
