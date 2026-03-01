import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from "./post.schema";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

    async create(dto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(dto);
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }
    async update(id: string, dto: UpdatePostDto): Promise<Post> {
        const updatedPost = await this.postModel
            .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
            .exec();

        if (!updatedPost) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }

        return updatedPost;
    }
    
    async delete(id: string): Promise<void> {
        await this.postModel.deleteOne({ _id: id });
        return;
    }
}
