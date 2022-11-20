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

function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

export { lerp, clearDOM, randomPick, randomInRange }