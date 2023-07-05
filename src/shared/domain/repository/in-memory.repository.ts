import { NotFoundError } from "./../../../shared/domain/errors/not-found.error";
import { Entity } from "shared/domain/entity/entity";
import { UniqueEntityId } from "shared/domain/value-objects/unique-entity-id.vo";
import { RepositoryInterface, SearchParams, SearchResult, SearchableRepositoryInterface } from "./repository-contracts";

export abstract class inMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
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

export abstract class inMemorySearchableRepository<E extends Entity> extends inMemoryRepository<E> implements SearchableRepositoryInterface<E> {
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);

    const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.per_page);

    return new SearchResult({ items: itemsFiltered, total: itemsFiltered.length, current_page: props.page, sort: props.sort, sort_dir: props.sort_dir, filter: props.filter, per_page: props.per_page });
  }

  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

  protected abstract applySort(items: E[], sort: string | null, sort_dir: string | null): Promise<E[]>;

  protected abstract applyPaginate(items: E[], page: SearchParams["page"], per_page: SearchParams["per_page"]): Promise<E[]>;
}
