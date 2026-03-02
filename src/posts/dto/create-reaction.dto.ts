import { ReactionType } from "../reaction.schema";

export class CreateReactionDto {
    userId: string;
    username: string;
    reaction: ReactionType;
}
