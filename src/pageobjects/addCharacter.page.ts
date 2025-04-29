import BasePage from './basePage.page.ts'

class AddCharacterPage extends BasePage {
  public async checkPageUrl() {
    const expectedUrl = 'https://vue-aknxx1.stackblitz.io/new'
    const currentUrl = await this.getUrl()
    console.log('Current URL:', currentUrl)
    await expect(currentUrl).toBe(expectedUrl)
  }
}

const addCharacterPage = new AddCharacterPage()
export default addCharacterPage
