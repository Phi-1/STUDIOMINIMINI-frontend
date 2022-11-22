
type Route = (routeArgs?: string[]) => void

export default class Router {

    private readonly _routes: {[hash: string]: Route} = {

    }

    constructor() {
        window.addEventListener("hashchange", this._onHashChange)
    }

    private _onHashChange(event: HashChangeEvent) {
        const newHash = event.newURL.split("#")[1]
        console.log(newHash)
    }

}