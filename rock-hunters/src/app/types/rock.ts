export interface RockWithOwnerType {
    _id: string,
    name: string,
    imageUrl: string,
    origin: string,
    length: number,
    height: number,
    width: number,
    weight: number,
    _ownerId: string,
    _createdOn: number,
    owner: {
        email: string,
        username: string,
        _id: string,
    }
}

export interface RockType {
    _id: string,
    _ownerId: string,
    name: string,
    imageUrl: string,
    origin: string,
    length: number,
    height: number,
    width: number,
    weight: number,
    _createdOn: number,
}

export interface RockAddEditType {
    name: string,
    imageUrl: string,
    origin: string,
    length: number,
    height: number,
    width: number,
    weight: number,
}

export interface RockFavouriteType {
    _ownerId: string,
    rockId: string,
    _createdOn: number,
    _id: string,
    rock: {
        name: string,
        imageUrl: string,
        origin: string,
        length: number,
        height: number,
        width: number,
        weight: number,
        _id: string,
        _createdOn: number,
        _updatedOn: number,
        _ownerId: string,
    }
}