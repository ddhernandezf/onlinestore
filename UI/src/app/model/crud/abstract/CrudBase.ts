export abstract class CrudBase {
    Id: number;
    Name: string;

    protected constructor(id: number, name: string) {
        this.Id = id;
        this.Name = name;
    }
}
