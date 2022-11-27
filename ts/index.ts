import ItemView from "./pages/ItemView"
import Landing from "./pages/Landing"
import Router from "./Router"
import * as util from "./util"

const storeItem = util.createStoreItem(
    "1", "Big item you buy", 
    "hello here is some sample text for this sample item. It details how you shouyld buy this item right here",
    14, false
)

function main() {
    // const landingPage = new Landing()
    // const router = new Router()
    // router.define("", () => landingPage.render())
    // landingPage.render()
    const itemView = new ItemView(storeItem)
    itemView.render()
}

main()