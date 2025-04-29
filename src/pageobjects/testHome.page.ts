import BasePage from './basePage.page.ts'

class TestHomePage extends BasePage {
  protected get maintitle() {
    return $('h1=Personajes')
  }

  protected getSeeDetailsLinkByCharacterName(name: string) {
    const selector = `//span[normalize-space(text())='${name}']/../a[normalize-space(text())='Ver detalle']`
    return $(selector)
  }

  protected get charactersGrid() {
    return $('.grid')
  }

  private async isHomePageURL() {
    // Check if the current URL is the expected home page URL
    const expectedUrl = 'https://vue-aknxx1.stackblitz.io/'
    const currentUrl = await this.getUrl()
    return currentUrl === expectedUrl
  }

  private async navigateToHomePage() {
    // Open the test home page
    if (await this.isHomePageURL()) {
      console.log('Already on the home page')
      return
    }
    await browser.url('https://vue-aknxx1.stackblitz.io/')
    await browser.pause(8000)
  }

  public async checkPage() {
    // Check if the main title and gird are displayed
    await this.maintitle.waitForDisplayed({ timeout: 10000 })
    await this.charactersGrid.waitForDisplayed({ timeout: 10000 })
  }

  public async open() {
    // Open the test home page
    await this.navigateToHomePage()
    await this.clickRunThisProjectIfNeeded()
    await this.checkPage()
  }

  async clickSeeDetailsForCharacter(name: string) {
    const linkElement = this.getSeeDetailsLinkByCharacterName(name)
    await linkElement.waitForClickable({ timeout: 20000 }) // Good practice to wait
    await linkElement.click()
  }
}

const testHomePage = new TestHomePage()
export default testHomePage
