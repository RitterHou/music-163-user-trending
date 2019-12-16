const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;

new CronJob('0 * * * * *', function () {
    const url = 'https://music.163.com/#/user/songs/rank?id=400271789';

    (async () => {
        const browser = await puppeteer.launch({
            // headless: false,
            // slowMo: 250
        });
        const page = await browser.newPage();
        await page.goto(url);
        // await page.setViewport({ width: 1920, height: 1080 });
        // await page.screenshot({ path: 'example.png' });
        // await page.waitFor(10000000)

        // 数据的内容被存放在iframe中
        const iframeElement = await page.$('iframe');
        const iframe = await iframeElement.contentFrame();

        const result = await iframe.evaluate(() => {
            let musics = document.querySelectorAll('#m-record .j-flag ul li');
            let data = [];
            for (let music of musics) {
                let a = music.querySelector('.tt .ttc .txt a')
                let href = a.getAttribute('href');
                let id = href.split('id=')[1];
                let name = a.innerText;
                data.push({ 'id': id, 'name': name });
            }
            return data;
        });

        await browser.close();

        console.log(JSON.stringify({ 'time': currentTime(), 'data': result, 'total': result.length }));
    })();

    function currentTime() {
        function format(value) {
            if (value < 10) {
                value = '0' + value;
            }
            return value;
        }
        let now = new Date();
        return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
            + ' ' + format(now.getHours()) + ':' + format(now.getMinutes()) + ':' + format(now.getSeconds());
    }

}, null, true, 'Asia/Shanghai');
