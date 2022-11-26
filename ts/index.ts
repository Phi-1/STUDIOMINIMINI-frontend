import ItemView from "./pages/ItemView"
import Landing from "./pages/Landing"
import Router from "./Router"


function itemRoute() {
    
}

function main() {
    // const landingPage = new Landing()
    // const router = new Router()
    // router.define("", () => landingPage.render())
    // landingPage.render()
    const itemView = new ItemView({id: "waddip", title: "hey", description: "hello", price: 12, reserved: false})
    itemView.render()
}

main()