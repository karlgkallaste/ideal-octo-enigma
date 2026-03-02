import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { Post } from './post.schema';
import { Reaction } from './reaction.schema';

describe('PostsService', () => {
  let service: PostsService;

  const mockPostModel = {
    new: jest.fn().mockImplementation((dto) => ({ ...dto, save: jest.fn().mockResolvedValue(dto) })),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  const mockReactionModel = {
    new: jest.fn().mockImplementation((dto) => ({ ...dto, save: jest.fn().mockResolvedValue(dto) })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
        {
          provide: getModelToken(Reaction.name),
          useValue: mockReactionModel,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
