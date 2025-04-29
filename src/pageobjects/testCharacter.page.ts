import BasePage from './basePage.page.ts'

class TestCharacterPage extends BasePage {
  private async getName(name: string) {
    return $(`h1=${name}`)
  }

  private get gender() {
    return $('b=Gender:')
  }

  private get specie() {
    return $('b=Specie:')
  }

  private get status() {
    return $('b=Status:')
  }

  public async openDefaultCharacter() {
    const characterUrl = `https://vue-aknxx1.stackblitz.io/character/11`
    await this.goToUrl(characterUrl)
    await this.gender.waitForDisplayed({ timeout: 10000 })
    await expect(await this.areDetailsDisplayed()).toBe(true)
  }

  public async checkPage(name: string) {
    const nameElement = await this.getName(name)
    await nameElement.waitForDisplayed({ timeout: 10000 })
  }

  public async areDetailsDisplayed(): Promise<boolean> {
    try {
      const isGenderDisplayed = await this.gender.isDisplayed()
      const isSpecieDisplayed = await this.specie.isDisplayed()
      const isStatusDisplayed = await this.status.isDisplayed()
      return isGenderDisplayed && isSpecieDisplayed && isStatusDisplayed
    } catch (error) {
      console.error('Error checking details visibility:', error)
      return false
    }
  }
}

const testCharacterPage = new TestCharacterPage()
export default testCharacterPage
