
type RouteHandler = (routeOptions: string[]) => void

export default class Router {

    private _routes: {[route: string]: RouteHandler}

    constructor() {
        this._routes = {}
        window.addEventListener("hashchange", this._onHashChange.bind(this))
    }

    public define(route: string, callback: RouteHandler) {
        this._routes[route] = callback
    }

    private _onHashChange(event: HashChangeEvent) {
        const newHash = event.newURL.split("#")[1]
        const [route, ...options] = newHash.split("/")
        if (route in this._routes) this._routes[route](options)
    }

}