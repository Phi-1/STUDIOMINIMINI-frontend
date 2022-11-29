function lerp(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b
}

function clearDOM() {
    while (document.body.lastElementChild) {
        document.body.removeChild(document.body.lastElementChild)
    }
}

function randomPick<T>(options: Array<T> | {[key: string]: T}): T {
    if (Array.isArray(options)) {
        return options[Math.floor(Math.random() * options.length)]
    }
    const keys = Object.keys(options)
    return options[keys[Math.floor(Math.random() * keys.length)]]
}

function randomIntRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

function randomFloatRange(min: number, max: number): number {
    return Math.random() * (max-min) + min
}

type StoreItem = { id: string, title: string, description: string, price: number, reserved: boolean }
function createStoreItem(id: string, title: string, description: string, price: number, reserved: boolean): StoreItem {
    return { id, title, description, price, reserved }
}

const palette = {
    grey: "#090909",
    pink: "#ffc0cb",
    purple: "#54428E",
    gold: "#FCDE9C"
}

type DeviceType = "Small" | "Large"
type DeviceListener = (deviceType?: DeviceType) => any
const device = (() => {
    

    const widthBreakpoint = 1100
    let deviceType: DeviceType = window.innerWidth > widthBreakpoint ? "Large" : "Small"
    const deviceListeners: DeviceListener[] = []

    window.addEventListener("resize", () => {
        const currentDeviceType: DeviceType = window.innerWidth > widthBreakpoint ? "Large" : "Small"
        if (currentDeviceType !== deviceType) {
            deviceType = currentDeviceType
            deviceListeners.forEach((callback) => callback(deviceType))
        }
    })

    return {
        getType: (): DeviceType => {
            return deviceType
        },
        addDeviceListener: (callback: DeviceListener) => {
            deviceListeners.push(callback)
        }
    }
})()

export { lerp, clearDOM, randomPick, randomIntRange, randomFloatRange, StoreItem, createStoreItem, palette, device, DeviceType }