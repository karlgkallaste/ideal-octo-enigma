import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReactionDocument = HydratedDocument<Reaction>;

export enum ReactionType {
    Like = 1,
    Dislike = 2,
}

@Schema()
export class Reaction {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    username: string;

    @Prop({ type: Number, enum: ReactionType, required: true })
    reaction: ReactionType

    @Prop({ default: Date.now })
    date: Date;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
