import Page from "./Page";
import { StoreItem } from "./util";


export default class ItemView implements Page {

    private _itemData: StoreItem

    constructor(itemData: StoreItem) {
        this._itemData = itemData
    }

    public render() {

    }

}