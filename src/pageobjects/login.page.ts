import { $ } from '@wdio/globals'
import Page from './page'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  protected get inputUsername() {
    return $('#user-name')
  }

  protected get inputPassword() {
    return $('#password')
  }

  protected get btnSubmit() {
    return $('#login-button')
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username)
    await this.inputPassword.setValue(password)
    await this.btnSubmit.click()
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open() {
    return super.open('v1')
  }
}

export default new LoginPage()
