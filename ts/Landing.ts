import * as util from "./util"
import Page from "./Page"


export default class Landing implements Page {

    // elements
    private _page: HTMLDivElement
    private _title: HTMLHeadingElement
    private _storeItems: HTMLDivElement[]

    // parallax settings
    private _translateRange = [-10, -40]
    private _backgroundParallax = 0.1 // amount background should move in proportion to foreground
    private _shouldAnimate = true
    
    // store item options
    private _palette = {
        yellow: "#FF9000",
        red: "#B20D30",
        green: "#00A676",
        blue: "#044389",
        // pink: "#FFCBE0"
    }
    private _shapes = ["circle", "rectangle"]
    private _randOffsetRange = 30
    private _randScaleRange = [1, 1.2]
    
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

        const offsetFromCenter = [window.innerWidth * 0.45, window.innerHeight * 0.4]
        const angularInterval = 360 / storeData.length

        storeData.forEach((v, i) => {
            const item = document.createElement("div")
            item.classList.add("store-item")
            item.dataset["index"] = i.toString()
            // TODO: give random offset
            item.dataset["shape"] = util.randomPick(this._shapes)
            const randColor = util.randomPick(this._palette)
            const randOffsetX = util.randomInRange(-this._randOffsetRange, this._randOffsetRange)
            const randOffsetY = util.randomInRange(-this._randOffsetRange, this._randOffsetRange)
            const randScale = util.randomInRange(this._randScaleRange[0], this._randScaleRange[1])
            const offsetX = offsetFromCenter[0] * (Math.cos(angularInterval / 180 * Math.PI * i)) + randOffsetX
            const offsetY = offsetFromCenter[1] * (Math.sin(angularInterval / 180 * Math.PI * i)) + randOffsetY
            const absoluteX = this._page.offsetWidth / 2 + offsetX
            const absoluteY = this._page.offsetHeight / 2 + offsetY
            item.style.left = `calc(100vw + ${offsetX}px)`
            item.style.top = `calc(100vh + ${offsetY}px)`
            item.style.borderColor = randColor
            item.style.animationDelay = `${util.randomInRange(0, 1000)}ms`
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