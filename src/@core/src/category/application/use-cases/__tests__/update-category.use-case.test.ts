import { CategoryInMemoryRepository } from '../../../../category/infra/repository/category-in-memory.repository';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
import { CreateCategoryUseCase } from '../create-category.use-case';
import { UpdateCategoryUseCase } from '../update-category.use-case';

describe('CreateCategoryUseCase', () => {
    let useCase: UpdateCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
        useCase = new UpdateCategoryUseCase.UseCase(repository);
    });

    it('should throw error when entity not found', async () => {
        await expect(() =>
            useCase.execute({ id: 'fake id', name: 'fake' }),
        ).rejects.toThrow(
            new NotFoundError(`Entity not found using id : fake id`),
        );
    });

    it('should update a category', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');

        const entity = new Category({ name: 'Movie' });

        repository.items = [entity];

        let output = await useCase.execute({ id: entity.id, name: 'test' });

        expect(spyUpdate).toHaveBeenCalledTimes(1);

        expect(output).toStrictEqual({
            id: entity.id,
            name: 'test',
            description: null,
            is_active: true,
            created_at: entity.created_at,
        });

        const arrange = [
            {
                input: {
                    id: entity.id,
                    name: 'test',
                    description: 'some desc',
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: 'some desc',
                    is_active: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: 'test',
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: 'test',
                    is_active: false,
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: false,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: 'test',
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: false,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: 'test',
                    is_active: true,
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: null,
                    is_active: true,
                    created_at: entity.created_at,
                },
            },
            {
                input: {
                    id: entity.id,
                    name: 'test',
                    is_active: false,
                    description: 'some desc',
                },
                expected: {
                    id: entity.id,
                    name: 'test',
                    description: 'some desc',
                    is_active: false,
                    created_at: entity.created_at,
                },
            },
        ];

        for (const i of arrange) {
            //console.log(i);

            output = await useCase.execute({
                id: i.input.id,
                name: i.input.name,
                description: i.input.description,
                is_active: i.input.is_active,
                //created_at: i.entity.created_at,
            });
            expect(output).toStrictEqual({
                id: entity.id,
                name: i.expected.name,
                description: i.expected.description,
                is_active: i.expected.is_active,
                created_at: i.expected.created_at,
            });
        }
    });
});
