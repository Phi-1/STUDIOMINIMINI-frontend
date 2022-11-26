import Page from "./Page";
import * as util from "../util";


export default class ItemView implements Page {

    // elements
    private _page: HTMLDivElement
    private _itemInfo: HTMLDivElement
    private _gallery: HTMLDivElement
    private _galleryItems: HTMLDivElement[] = []
    // store data
    private _itemData: util.StoreItem
    // settings
    private _pageParallax = 0.1

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
        reserveButton.innerText = "Reserve"

        root.appendChild(title)
        root.appendChild(description)
        root.appendChild(price)
        root.appendChild(reserveButton)

        return root
    }

    private _onGalleryScroll() {
        // TODO: background parallax on gallery scroll
        const scrollMax = this._gallery.scrollHeight - this._gallery.getBoundingClientRect().height
        // get scroll y, normalize as function of total height (prob sum of image heights since height is set)
        // set background position interpolated between base (50%) and some parallax constant
    }

    private _createGalleryElement(): HTMLDivElement {
        const gallery = document.createElement("div")
        gallery.classList.add("scrolling-gallery")
        gallery.addEventListener("scroll", this._onGalleryScroll.bind(this))
        // TODO: set image item width dynamically based on image aspect ratio and predetermined max width/height
        for (let i = 0; i < 8; i++) {
            const image = document.createElement("div")
            image.classList.add("item-image")
            this._galleryItems.push(image)
            gallery.appendChild(image)
        }
        return gallery
    }

}