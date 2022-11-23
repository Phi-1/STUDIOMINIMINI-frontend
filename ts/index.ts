import Landing from "./pages/Landing"
import Router from "./Router"


function itemRoute() {
    
}

function main() {
    const landingPage = new Landing()
    const router = new Router()
    router.define("", () => landingPage.render())
    landingPage.render()
}

main()