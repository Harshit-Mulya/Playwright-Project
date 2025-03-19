
class AmazonPage {
    constructor(page) {
      this.page = page;
      this.searchBox = page.locator('input[id="twotabsearchtextbox"]');
        this.searchButton = page.locator('input[id="nav-search-submit-button"]');
        this.productTitleLocator = page.locator('h2[aria-label="Apple iPhone 15 (128 GB) - Black"]');
    }
  
    async openURL() {
      await this.page.goto('https://www.amazon.in/',{ 
        waitUntil: 'load', 
        timeout: 60000
      });
    }
  
    async getTitle() {
      return await this.page.title();
    }

    async searchForProduct(searchTerm) {
        await this.searchBox.fill(searchTerm);
        await this.searchButton.click();
        await this.page.waitForSelector('.s-main-slot');
      }

      async getProductTitle() {
        return await this.productTitleLocator.getAttribute('aria-label');
      }
  }
  module.exports = AmazonPage;