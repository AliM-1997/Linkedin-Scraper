const puppeteer=require("puppeteer")
const url="https://www.linkedin.com/jobs/https://www.linkedin.com/jobs/search?keywords=MLOps&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0"

async function run(){
try {
    const browser=await puppeteer.launch();
    const page =await browser.newPage();
    await page.goto(url);

    await page.screenshot({path:"screen.png",fullPage: true});
    console.log("printing screen test");



    await browser.close();

} catch (error) {
    console.error('Error:' + error );
}
}
run();