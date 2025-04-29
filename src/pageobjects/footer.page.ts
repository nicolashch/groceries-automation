import BasePage from './basePage.page.ts'

class FooterPage extends BasePage {
  get footer() {
    return $('footer')
  }

  private get homeButton() {
    return this.footer.$('a[href="/"]')
  }

  private get topButton() {
    return this.footer.$('button=Top')
  }

  private get addButton() {
    return this.footer.$('a[href="/new"]')
  }

  async clickHomeButton() {
    await this.homeButton.waitForClickable({ timeout: 10000 })
    await this.homeButton.click()
  }

  async clickTopButton() {
    await this.topButton.waitForClickable({ timeout: 10000 })
    await this.topButton.click()
  }

  async clickAddButton() {
    await this.addButton.waitForClickable({ timeout: 10000 })
    await this.addButton.click()
  }
}
const footerPage = new FooterPage()
export default footerPage
