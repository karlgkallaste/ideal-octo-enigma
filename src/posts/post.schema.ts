import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Reaction} from "./reaction.schema";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop()
    title: string;

    @Prop()
    body: string;
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }] })
    reactions: Reaction[]
}

export const PostSchema = SchemaFactory.createForClass(Post);
