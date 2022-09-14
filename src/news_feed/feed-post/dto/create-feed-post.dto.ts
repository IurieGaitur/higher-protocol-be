export class CreateFeedPostDto {
    creator_id: number;
    created_at: Date;
    text: string;
    comments_nr: number;
    likes_nr: number;
    shares_nr: number;
}
