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
    const deviceType = util.device.getType()
    const router = new Router()
    router.define("", () => new Landing(deviceType).render())
    new Landing(deviceType).render()
    // new ItemView(storeItem).render()
}

main()