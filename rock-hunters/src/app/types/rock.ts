export interface RockListType {
    _id: string,
    name: string,
    imageUrl: string,
    origin: string,
    length: number,
    height: number,
    width: number,
    weigth: number,
    _ownerId: string,
    username: string,
    _createdOn: number,
    likes: number
    owner: {
        email: string,
        username: string,
        _id: string,
    }
}