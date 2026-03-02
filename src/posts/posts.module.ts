import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post, PostSchema } from "./post.schema";
import { Reaction, ReactionSchema } from "./reaction.schema";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Post.name, schema: PostSchema },
        { name: Reaction.name, schema: ReactionSchema }
    ])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
