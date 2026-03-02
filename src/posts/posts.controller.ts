import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreateReactionDto } from "./dto/create-reaction.dto";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    async findAll() {
        return this.postsService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.postsService.delete(id);
    }

    @Post(':id/reactions')
    async addReaction(@Param('id') id: string, @Body() createReactionDto: CreateReactionDto) {
        return this.postsService.addReaction(id, createReactionDto);
    }
}
