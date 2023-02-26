import { v4 as uuidv4 } from 'uuid';

class Item {
    public id: string;
    public name: string;
    public img: string;
    public price: number;
    private _configurable: boolean;
    private _assemblyCapability : boolean;

    constructor (name: string, price: number, img:string = '', configurable: boolean = true) {
        this.id = uuidv4();
        this.name = name;
        this.img = img;
        this.price = price;
        this._configurable = configurable;
        this._assemblyCapability = true;
    }

    get configurable(): boolean  {
        if (this._configurable && this._assemblyCapability) {
            return true
        } else {
            return false;
        }

        //todo return (this._configurable && this._assemblyCapability);
    }
    get assemblyCapability(): boolean {
        return this._assemblyCapability;
    }

    //todo use toggle instead of change
    changeAssemblyCapability = (): void => {
        this._assemblyCapability = !this._assemblyCapability;
    }


}

export default Item;