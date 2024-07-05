const { transposeIterableHandle } = require("puppeteer");
const puppeteer=require("puppeteer")
const url="https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0"

async function run(){
try {
    const browser=await puppeteer.launch();
    const page =await browser.newPage();
    await page.goto(url);

    await page.screenshot({path:"screen.png",fullPage: true});
    
    console.log("printing screen test");
    await page.waitForSelector('.search-bar__full-placeholder');
    await page.click(".search-bar__full-placeholder")
    await page.keyboard.type('MLOps');
    await page.keyboard.press('Enter');

    await page.waitForSelector('.job-card-list__title');

    await page.click(".base-card")
    
    await page.reload();
    



    await browser.close();

} catch (error) {
    console.error('Error:' + error );
}
}
run();