import axios from "axios"
import Pixiv from "./pixiv"

require("dotenv").config();
(async () => {
    const pixiv = await Pixiv.login(process.env.PIXIV_USERNAME, process.env.PIXIV_PASSWORD)
    // const result = await pixiv.illust.get("https://www.pixiv.net/en/artworks/75565793")
    /*await pixiv.util.downloadIllusts("black tights 00", "./downloads", "large", [{
        folder: "stockings 2", tag: "black tights"
    }])*/
    // await pixiv.util.downloadUgoira("https://www.pixiv.net/en/artworks/77382629", "./downloads", "webp", 50)
    const result = await pixiv.illust.get("gabriel dropout", {bookmarks: "100", type: "ugoira"})
    const dest = await pixiv.util.downloadUgoira(result, "./downloads", {speed: 4.0, reverse: false})
    // const result = await pixiv.search.illusts({word: "黒タイツ", moe: true})
    // const result = await pixiv.search.illusts({word: "hello"})
    console.log(result.url)
    console.log(dest)
})()
