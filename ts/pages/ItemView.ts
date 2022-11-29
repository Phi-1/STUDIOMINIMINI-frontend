import Page from "./Page"
import * as util from "../util"


export default class ItemView implements Page {

    // elements
    private _page: HTMLDivElement
    private _itemInfo: HTMLDivElement
    private _gallery: HTMLDivElement
    private _galleryItems: HTMLImageElement[] = []
    // store data
    private _itemData: util.StoreItem
    // settings
    private _imageHeight = 55 //vmin
    private _shouldAnimate = true
    private _pageParallax = 1.4

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

    private _onGalleryScroll() {
        if (!this._shouldAnimate) return
        const scrollMax = this._page.scrollHeight - this._page.getBoundingClientRect().height
        const nScroll = this._page.scrollTop / scrollMax
        const bgPos = util.lerp(0, -50, nScroll) * this._pageParallax
        this._page.animate({
            backgroundPositionY: `${bgPos}%`
        }, {
            duration: 400,
            easing: "ease-out",
            fill: "forwards"
        })
        this._shouldAnimate = false
        setTimeout(() => this._shouldAnimate = true, 20)
    }

    private _createPageElement(): HTMLDivElement {
        const page = document.createElement("div")
        page.classList.add("item-page")
        page.addEventListener("scroll", this._onGalleryScroll.bind(this))
        return page
    }

    private _createItemInfoElement(): HTMLDivElement {
        const root = document.createElement("div")
        root.classList.add("fixed-item-info")

        const title = document.createElement("h1")
        title.classList.add("item-title")
        title.innerText = this._itemData.title

        const description = document.createElement("p")
        description.classList.add("item-description")
        description.innerText = this._itemData.description

        // TODO: format price with currency sign and decimal point
        const price = document.createElement("span")
        price.classList.add("item-price")
        price.innerText = this._itemData.price.toString()

        const reserveButton = document.createElement("div")
        reserveButton.classList.add("btn-reserve-item")
        reserveButton.innerText = "Reserve"

        const priceButtonContainer = document.createElement("div")
        priceButtonContainer.classList.add("price-button-container")
        priceButtonContainer.appendChild(price)
        priceButtonContainer.appendChild(reserveButton)

        root.appendChild(title)
        root.appendChild(description)
        root.appendChild(priceButtonContainer)

        return root
    }

    private _createGalleryElement(): HTMLDivElement {
        const gallery = document.createElement("div")
        gallery.classList.add("scrolling-gallery")
        // TODO: set image item width dynamically based on image aspect ratio
        for (let i = 0; i < 8; i++) {
            const image = new Image()
            image.src = "https://unsplash.it/1920/1080"
            const proportionalWidth = image.naturalWidth / image.naturalHeight
            image.classList.add("item-image")
            image.style.height = `${this._imageHeight}vmin`
            image.style.width = `${this._imageHeight * proportionalWidth}vmin`
            this._galleryItems.push(image)
            gallery.appendChild(image)
        }
        return gallery
    }

}