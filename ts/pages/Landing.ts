import * as util from "../util"
import Page from "./Page"


export default class Landing implements Page {

    // elements
    private _page: HTMLDivElement
    private _title: HTMLHeadingElement
    private _storeItems: HTMLDivElement[]

    // parallax settings
    private _translateRange = [-10, -40]
    private _backgroundParallax = 0.15 // amount background should move in proportion to foreground
    private _shouldAnimate = true
    
    private _palette = ["#A41623", "#29335C", "#F3A712"]
    private _shapes = ["circle", "rectangle", "diamond"]
    private _baseOffsetRange = [0.42, 0.38] // in proportion to screen size
    private _randOffsetRange = 50
    private _randScaleRange = [0.95, 1.05]
    private _diamondTilt = 1
    
    constructor() {
        this._createElements()
        this._setPageParallax()
    }

    public render() {
        util.clearDOM()
        document.body.appendChild(this._page)
    }

    private _createElements() {
        this._page = this._createPageElement()
        this._title = this._createTitleElement()
        this._storeItems = this._createStoreItems([0, 1, 2, 3, 4, 5, 6])
        // element tree
        this._page.appendChild(this._title)
        this._storeItems.forEach((item) => this._page.appendChild(item))
    }

    private _createPageElement(): HTMLDivElement {
        const page = document.createElement("div")
        page.classList.add("page")
        return page
    }

    private _createTitleElement(): HTMLDivElement {
        const title = document.createElement("h1")
        title.classList.add("page-title")
        title.innerText = "STUDIOMINIMINI"
        return title
    }

    // TODO: reposition items on window resize
    private _createStoreItems(storeData: number[]): HTMLDivElement[] {
        const items: HTMLDivElement[] = []

        const offsetFromCenter = [window.innerWidth * this._baseOffsetRange[0], window.innerHeight * this._baseOffsetRange[1]]
        const angularInterval = 360 / storeData.length

        storeData.forEach((v, i) => {
            const item = document.createElement("div")
            item.classList.add("store-item")
            item.dataset["index"] = i.toString()
            // TODO: make it rarer for too many items to get the same shape
            item.dataset["shape"] = util.randomPick(this._shapes)
            if (item.dataset["shape"] === "diamond") {
                item.style.setProperty("--tilt", this._diamondTilt.toString())
                this._diamondTilt *= -1
            }
            const randColor1 = util.randomPick(this._palette)
            const randColor2 = util.randomPick(this._palette)
            const randScale = util.randomFloatRange(this._randScaleRange[0], this._randScaleRange[1])
            const randOffsetX = util.randomIntRange(-this._randOffsetRange, this._randOffsetRange)
            const randOffsetY = util.randomIntRange(-this._randOffsetRange, this._randOffsetRange)
            const offsetX = offsetFromCenter[0] * (Math.cos(angularInterval / 180 * Math.PI * i)) + randOffsetX
            const offsetY = offsetFromCenter[1] * (Math.sin(angularInterval / 180 * Math.PI * i)) + randOffsetY
            item.style.left = `calc(100vw + ${offsetX}px)`
            item.style.top = `calc(100vh + ${offsetY}px)`
            item.style.scale = randScale.toString()
            item.style.setProperty("--pseudo-border-color", randColor1)
            item.style.animationDelay = `${util.randomIntRange(0, 1000)}ms`
            item.style.borderColor = randColor2
            items.push(item)
        })

        return items
    }

    private _setPageParallax() {
        this._page.addEventListener("mousemove", (event: MouseEvent) => {
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
        })
    }

}