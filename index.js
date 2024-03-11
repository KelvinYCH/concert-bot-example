const origin = "https://google.com";
const successTarget = "https://google.com";
const proxyArray = require("./proxy.json");
require("events").EventEmitter.defaultMaxListeners = proxyArray.length + 3;

const { createInstance } = require("concert-bot/utils/puppeteerUtil")

const isSuccess = async (page) => {
        try {
            let url = page.url();
            if (url.indexOf(successTarget) >= 0) return true;
        } catch (e) {
            console.log(e);
        }
        return false;
};

proxyArray.map(async (proxyEle) => {
    const { proxy, id, pw } = proxyEle;
    await createInstance(origin, proxy, id, pw, isSuccess);
});
