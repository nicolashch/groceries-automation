import { Given, Then, When } from '@wdio/cucumber-framework'
import testHomePage from '../pageobjects/testHome.page'
import testCharacterPage from '../pageobjects/testCharacter.page'
import footerPage from '../pageobjects/footer.page'
import addCharacterPage from '../pageobjects/addCharacter.page'

Given('that the user is on the Rick and morty page', async function () {
  await testHomePage.open()
})

Given('the user is at the bottom of the page', async function () {
  await testHomePage.scrollToBottom()
})

Given('that the user is on a character details page', async function () {
  await testCharacterPage.openDefaultCharacter()
})

When('the user selects character {string}', async function (character: string) {
  await testHomePage.clickSeeDetailsForCharacter(character)
  console.log('Selected character:', character)
})

When(
  'the user clicks the {string} button at the footer',
  async function (buttonName: 'Top' | 'Home' | 'Add') {
    const action = buttonName.toLowerCase()

    switch (action) {
      case 'top':
        await footerPage.clickTopButton()
        await browser.pause(2000)
        break
      case 'home':
        await footerPage.clickHomeButton()
        break
      case 'add':
        await footerPage.clickAddButton()
        break
      default:
        throw new Error(
          `Unsupported button name "${buttonName}" provided in the step.`
        )
    }
  }
)

Then(
  'the user should see the character {string} details',
  async function (character: string) {
    await testCharacterPage.checkPage(character)
    await testCharacterPage.areDetailsDisplayed().then(isDisplayed => {
      console.log('Character details displayed:', isDisplayed)
      expect(isDisplayed).toBe(true)
    })
  }
)

Then('the user returns to the home page', async function () {
  await footerPage.clickHomeButton()
  await testHomePage.checkPage()
})

Then('the user returns to the top of the page', async function () {
  const isAtTop = await testHomePage.isAtTop()
  await expect(isAtTop).toBe(true)
})

Then('the user is redirected to the add character page', async function () {
  await addCharacterPage.checkPageUrl()
})
