import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreatePostDto} from './dto/create-post.dto';
import {Post, PostDocument} from "./post.schema";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Reaction, ReactionDocument, ReactionType} from "./reaction.schema";
import {CreateReactionDto} from "./dto/create-reaction.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(Reaction.name) private reactionModel: Model<ReactionDocument>
    ) {
    }

    async create(dto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(dto);
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find()
            .populate('reactions')
            .exec();
    }

    async update(id: string, dto: UpdatePostDto): Promise<Post> {
        const updatedPost = await this.postModel
            .findByIdAndUpdate(
                id,
                {...dto, $inc: {__v: 1}},
                {runValidators: true}
            )
            .exec();

        if (!updatedPost) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return updatedPost;
    }

    async delete(id: string): Promise<void> {
        await this.postModel.deleteOne({_id: id});
        return;
    }

    async addReaction(postId: string, dto: CreateReactionDto): Promise<Post> {
        const reaction = new this.reactionModel(dto);
        const savedReaction = await reaction.save();

        const updatedPost = await this.postModel
            .findByIdAndUpdate(
                postId,
                {
                    $push: {reactions: savedReaction._id},
                    $inc: {__v: 1}
                },
                {runValidators: true}
            )
            .populate('reactions')
            .exec();

        if (!updatedPost) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }
        return updatedPost;
    }
}
