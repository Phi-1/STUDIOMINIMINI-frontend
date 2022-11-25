import Page from "./Page";
import * as util from "../util";


export default class ItemView implements Page {

    // elements
    private _page: HTMLDivElement
    private _itemInfo: HTMLDivElement
    private _gallery: HTMLDivElement
    // store data
    private _itemData: util.StoreItem

    constructor(itemData: util.StoreItem) {
        this._itemData = itemData
        this._createElements()
    }

    public render() {
        util.clearDOM()
        document.body.appendChild(this._page)
    }

    private _createElements() {
        this._page = this._createPageElement()
        this._itemInfo = this._createItemInfoElement()
        this._gallery = this._createGalleryElement()
        
        this._page.appendChild(this._itemInfo)
        this._page.appendChild(this._gallery)
    }

    private _createPageElement(): HTMLDivElement {
        const page = document.createElement("div")
        page.classList.add("item-page")
        return page
    }

    private _createItemInfoElement(): HTMLDivElement {
        const root = document.createElement("div")
        root.classList.add("fixed-item-info")

        const title = document.createElement("h1")
        title.classList.add("item-title")
        const description = document.createElement("p")
        description.classList.add("item-description")
        const price = document.createElement("span")
        price.classList.add("item-price")
        const reserveButton = document.createElement("div")
        reserveButton.classList.add("btn-reserve-item")

        root.appendChild(title)
        root.appendChild(description)
        root.appendChild(price)
        root.appendChild(reserveButton)

        return root
    }

    private _createGalleryElement(): HTMLDivElement {
        const gallery = document.createElement("div")
        gallery.classList.add("scrolling-gallery")
        return gallery
    }

}