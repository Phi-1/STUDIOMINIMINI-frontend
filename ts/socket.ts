import { createStoreItem, StoreItem } from "./util"


class Socket {

    private _storeItems: StoreItem[]

    constructor() {
        this._storeItems = []
        for (let i = 0; i < 5; i++) {
            this._storeItems.push(createStoreItem(`item${i}`, "title", "hello how you doin", 24, false))
        }
    }

    public getStoreItem(id: string): StoreItem | null {
        // TODO: null checking
        this._storeItems.forEach((item) => {
            if (item["id"] === id) return item
        })
        return null
    }

    public getStoreItems(): StoreItem[] {
        if (this._storeItems) return this._storeItems
        // request data over connection
    }

}

const socket = new Socket()
export default socket