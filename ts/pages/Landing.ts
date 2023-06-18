import * as util from "../util"
import Page from "./Page"


export default class Landing implements Page {

    // elements
    private _page: HTMLDivElement
    private _title: HTMLHeadingElement
    private _itemContainer: HTMLDivElement
    private _storeItems: HTMLDivElement[]
    private _navContainer: HTMLElement

    // parallax settings
    private _translateRange = [-10, -40]
    private _backgroundParallax = 0.15 // amount background should move in proportion to foreground
    private _shouldAnimate = true
    
    // item settings
    private _shapes = ["circle", "rectangle", "diamond"]
    private _baseOffsetRange = [0.42, 0.38] // in proportion to screen size
    private _randOffsetRange = 50           // in  pixels
    private _randScaleRange = [0.95, 1.05]
    private _diamondTilt = 1
    
    constructor(deviceType: util.DeviceType) {
        this._createElements(deviceType)
        util.device.addDeviceListener(((deviceType: util.DeviceType) => {
            this._createElements(deviceType)
            this.render()
        }).bind(this))
    }

    public render() {
        util.clearDOM()
        document.body.appendChild(this._page)
    }

    private _createElements(deviceType: util.DeviceType) {
        if (deviceType === "Small") this._createLayoutSmall()
        else this._createLayoutLarge()
    }

    private _createLayoutSmall() {
        this._page = this._createPageElement("Small")
        this._title = this._createTitleElement("Small")
        this._itemContainer = this._createItemContainerElement()
        this._storeItems = this._createStoreItems("Small", [0, 1, 2, 3, 4, 5, 6])
        this._navContainer = this._createNavElement()

        // element tree
        this._storeItems.forEach((item) => this._itemContainer.appendChild(item))

        this._page.appendChild(this._title)
        this._page.appendChild(this._itemContainer)
        this._page.appendChild(this._navContainer)
    }

    private _createLayoutLarge() {
        this._page = this._createPageElement("Large")
        this._title = this._createTitleElement("Large")
        this._storeItems = this._createStoreItems("Large", [0, 1, 2, 3, 4, 5, 6])
        
        // element tree
        this._page.appendChild(this._title)
        this._storeItems.forEach((item) => this._page.appendChild(item))

        // reset items on window resize
        // TODO: delay reset with each resize, so that reordering only happens after final resize event
        window.addEventListener("resize", (() => {
            this._storeItems.forEach((item) => this._page.removeChild(item))
            this._storeItems = this._createStoreItems("Large", [0, 1, 2, 3, 4, 5, 6])
            this._storeItems.forEach((item) => this._page.appendChild(item))
        }).bind(this))
    }
    
    private _setPageParallax(event: MouseEvent) {
        if (!this._shouldAnimate) return
        // normalized mouse coordinates
        const [nX, nY] = [event.clientX / window.innerWidth, event.clientY / window.innerHeight]
        const [tX, tY] = [util.lerp(this._translateRange[0], this._translateRange[1], nX), util.lerp(this._translateRange[0], this._translateRange[1], nY)]
        this._page.animate({
            transform: `translate(${tX}%, ${tY}%)`,
            backgroundPosition: `${tX*this._backgroundParallax}% ${tY*this._backgroundParallax}%`
        }, {
            duration: 1000,
            easing: "ease-out",
            fill: "forwards"
        })
        this._shouldAnimate = false
        setTimeout(() => this._shouldAnimate = true, 20)
    }
    
    private _createPageElement(deviceType: util.DeviceType): HTMLDivElement {
        const page = document.createElement("div")
        page.classList.add("landing-page")
        if (deviceType === "Large") page.addEventListener("mousemove", this._setPageParallax.bind(this))
        return page
    }

    private _createTitleElement(deviceType: util.DeviceType): HTMLDivElement {
        const title = document.createElement("h1")
        title.classList.add("page-title")
        title.innerText = "STUDIOMINIMINI"
        return title
    }

    private _onItemScroll() {
        this._storeItems.forEach((item) => {
            console.log(item.scrollTop)
        })
    }

    private _createItemContainerElement(): HTMLDivElement {
        const container = document.createElement("div")
        container.classList.add("store-item-container")
        container.addEventListener("scroll", this._onItemScroll.bind(this))
        return container
    }

    private _createStoreItems(deviceType: util.DeviceType, storeData: number[]): HTMLDivElement[] {
        const items: HTMLDivElement[] = []

        const offsetFromCenter = [window.innerWidth * this._baseOffsetRange[0], window.innerHeight * this._baseOffsetRange[1]]
        const angularInterval = 360 / storeData.length

        storeData.forEach((v, i) => {
            const item = document.createElement("div")
            item.classList.add("store-item")

            item.dataset["shape"] = util.randomPick(this._shapes)
            if (item.dataset["shape"] === "diamond") {
                item.style.setProperty("--tilt", this._diamondTilt.toString())
                this._diamondTilt *= -1
            }

            const randColor1 = util.randomPick(util.palette)
            item.style.borderColor = randColor1
            
            if (deviceType === "Large") {
                const randScale = util.randomFloatRange(this._randScaleRange[0], this._randScaleRange[1])
                const randOffsetX = util.randomIntRange(-this._randOffsetRange, this._randOffsetRange)
                const randOffsetY = util.randomIntRange(-this._randOffsetRange, this._randOffsetRange)
                const offsetX = offsetFromCenter[0] * (Math.cos(angularInterval / 180 * Math.PI * i)) + randOffsetX
                const offsetY = offsetFromCenter[1] * (Math.sin(angularInterval / 180 * Math.PI * i)) + randOffsetY
                item.style.left = `calc(100vw + ${offsetX}px)`
                item.style.top = `calc(100vh + ${offsetY}px)`
                item.style.scale = randScale.toString()
            }

            item.style.animationDelay = `${util.randomIntRange(0, 1000)}ms`
            
            items.push(item)
        })

        return items
    }

    private _createNavElement(): HTMLElement {
        const navContainer = document.createElement("nav")
        navContainer.classList.add("landing-nav-container")

        const navButtonUp = document.createElement("div")
        navButtonUp.classList.add("landing-nav-btn-up")
        const iconUp = document.createElement("i")
        // TODO: fa icons

        const navButtonDown = document.createElement("div")
        navButtonDown.classList.add("landing-nav-btn-down")
        const iconDown = document.createElement("i")
        // TODO: fa icons

        navContainer.appendChild(navButtonUp)
        navContainer.appendChild(navButtonDown)

        return navContainer
    }

}