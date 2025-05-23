import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

const pages = {
  login: LoginPage,
}

Given(/^I am on the (\w+) page$/, async (page: keyof typeof pages) => {
  await pages[page].open()
})

Given(/^The user is logged in as a (\w+)$/, async userType => {
  if (userType === 'standard_user') {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')
  } else {
    throw new Error(`User type ${userType} is not supported`)
  }
})

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
  await LoginPage.login(username, password)
})

Then(/^I should see a flash message saying (.*)$/, async message => {
  await expect(SecurePage.flashAlert).toBeExisting()
  await expect(SecurePage.flashAlert).toHaveText(
    expect.stringContaining(message)
  )
})
