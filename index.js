const puppeteer = require('puppeteer');

const url = "https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0";

async function run() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.screenshot({ path: "screen.png", fullPage: true });
        console.log("printing screen test");

        await page.waitForSelector('.search-bar__full-placeholder');
        await page.click('.search-bar__full-placeholder');
        await page.keyboard.type('MLOps');
        await page.keyboard.press('Enter');

        await page.waitForSelector('.job-card-list__title', { timeout: 60000 });

        await page.screenshot({ path: "search_results.png", fullPage: true });
        

        const jobs = await page.evaluate(() => {
            const jobCards = document.querySelectorAll('.two-pane-serp-page__results');
            const jobDetails = [];

            jobCards.forEach(card => {
                const title = card.querySelector('.job-card-list__title')?.innerText;
                const company = card.querySelector('.job-card-container__company-name')?.innerText;
                const location = card.querySelector('.job-card-container__metadata-item')?.innerText;
                const link = card.querySelector('a')?.href || 'No link';

                jobDetails.push({
                    title,
                    company,
                    location,
                    link
                });
            });

            return jobDetails;
        });

        console.log(jobs);

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

run();