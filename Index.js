const puppeteer = require('puppeteer');

(async () => {
    // Launch browser in Railway (headless mode)
    const browser = await puppeteer.launch({
        headless: true, // Change to false if debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Open the Gold Eagle website
    await page.goto('https://telegram.geagle.online/', { waitUntil: 'networkidle2' });

    // Inject session token into localStorage
    await page.evaluate(() => {
        localStorage.setItem("session_token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiZmNiYjg2MWQtMmY5ZS00OGQ3LTlmZTMtYmQzMjdmMzA5ODg4IiwiZmlyc3RfbmFtZSI6IkFuYWJlbCIsImxhbmd1YWdlX2NvZGUiOiJlbiIsInVzZXJuYW1lIjoiQW5hYmVsQ2FzdGVsbGEifSwic2Vzc2lvbl9pZCI6MTYwMzgwMiwic3ViIjoiZmNiYjg2MWQtMmY5ZS00OGQ3LTlmZTMtYmQzMjdmMzA5ODg4IiwiZXhwIjoxNzQ0OTc0ODI2fQ.c-jge3nQtZcI4nqUJN3MCoiHaxfKUFzQOB6-l7sU3Bk");
    });

    // Reload page to apply session token
    await page.reload({ waitUntil: 'networkidle2' });

    // Take a screenshot (optional, for debugging)
    await page.screenshot({ path: 'screenshot.png' });

    console.log("✅ Session token injected & page loaded!");

    // Keep script running (optional, remove if not needed)
    await new Promise(() => {});

    // Close browser if needed (remove if keeping bot running)
    // await browser.close();
})();
