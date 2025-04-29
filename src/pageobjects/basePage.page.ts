export default class BasePage {
  open(path: string) {
    browser.url(path)
  }

  protected getTitle() {
    return browser.getTitle()
  }

  protected getUrl() {
    return browser.getUrl()
  }

  protected async goToUrl(url: string) {
    await browser.url(url)
    await this.browserDefaultPause()
  }

  protected async browserDefaultPause() {
    await browser.pause(5000)
  }

  get runThisProjectButton() {
    return $('button=Run this project')
  }

  public async scrollToBottom() {
    await browser.execute(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
  }

  public async isAtTop(): Promise<boolean> {
    const scrollPosition = await browser.execute(() => {
      return window.scrollY
    })
    console.log(`Current scroll position (Y): ${scrollPosition}`)
    return scrollPosition === 0
  }

  protected async clickRunThisProjectButton() {
    // Click the "Run this project" button
    await this.runThisProjectButton.waitForClickable({ timeout: 10000 })
    await this.runThisProjectButton.click()
  }

  protected async clickRunThisProjectIfNeeded() {
    // Check if the "Run this project" button is displayed
    const isButtonDisplayed = await this.runThisProjectButton.isDisplayed()
    if (isButtonDisplayed) {
      await this.clickRunThisProjectButton()
    }
  }
}
