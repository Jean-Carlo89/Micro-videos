import { Entity } from "shared/domain/entity/entity";
import { UniqueEntityId } from "shared/domain/value-objects/unique-entity-id.vo";

import { NotFoundError } from "./../../../shared/domain/errors/not-found.error";
import {
    RepositoryInterface,
    SearchParams,
    SearchResult,
    SearchableRepositoryInterface,
    SortDirection,
} from "./repository-contracts";
export abstract class inMemoryRepository<E extends Entity>
    implements RepositoryInterface<E>
{
    items: E[] = [];
    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`;

        return await this._get(_id);
    }
    async findAll(): Promise<E[]> {
        return this.items;
    }
    async update(entity: E): Promise<void> {
        await this._get(entity.id);
        const indexFound = this.items.findIndex((i) => i.id === entity.id);

        this.items[indexFound] = entity;
    }
    async delete(id: string | UniqueEntityId): Promise<void> {
        const _id = `${id}`;
        await this._get(_id);
        const indexFound = this.items.findIndex((i) => i.id === _id);
        this.items.splice(indexFound, 1);
    }

    protected async _get(id: string) {
        const item = this.items.find((item) => item.id === id);

        if (!item) {
            throw new NotFoundError(`Entity not found using id : ${id}`);
        }

        return item;
    }
}

export abstract class inMemorySearchableRepository<E extends Entity>
    extends inMemoryRepository<E>
    implements SearchableRepositoryInterface<E>
{
    sortableFields: string[] = [];

    async search(props: SearchParams): Promise<SearchResult<E>> {
        const itemsFiltered = await this.applyFilter(this.items, props.filter);
        const itemsSorted = await this.applySort(
            itemsFiltered,
            props.sort,
            props.sort_dir,
        );

        const itemsPaginated = await this.applyPaginate(
            itemsSorted,
            props.page,
            props.per_page,
        );

        return new SearchResult({
            items: itemsPaginated,
            total: itemsFiltered.length,
            current_page: props.page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter,
            per_page: props.per_page,
        });
    }

    protected abstract applyFilter(
        items: E[],
        filter: string | null,
    ): Promise<E[]>;

    // protected async applySort(items: E[], sort: string | null, sort_dir: SortDirection | null): Promise<E[]> {
    //   if (!sort && !this.sortableFields.includes(sort)) {
    //     return items;
    //   }

    //   return [...items].sort((a, b) => {
    //     if (a.props[sort] < b.props[sort]) {
    //       return sort_dir === "asc" ? -1 : 1;
    //     }

    //     if (a.props[sort] > b.props[sort]) {
    //       return sort_dir === "asc" ? 1 : -1;
    //     }

    //     return 0;
    //   });
    // }

    protected async applySort(
        items: E[],
        sort: string | null,
        sort_dir: SortDirection | null,
    ): Promise<E[]> {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }

        return [...items].sort((a, b) => {
            if (a.props[sort] < b.props[sort]) {
                return sort_dir === "asc" ? -1 : 1;
            }

            if (a.props[sort] > b.props[sort]) {
                return sort_dir === "asc" ? 1 : -1;
            }

            return 0;
        });
    }

    protected async applyPaginate(
        items: E[],
        page: SearchParams["page"],
        per_page: SearchParams["per_page"],
    ): Promise<E[]> {
        const start = (page - 1) * per_page; // 1 * 15 = 15

        const limit = start + per_page; // 15+15 = 30

        return items.slice(start, limit);
    }
}
