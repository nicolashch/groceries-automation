import { $ } from '@wdio/globals'
import Page from './page'

class ProductsPage extends Page {
  /**
   * Define selectors using getter methods
   */
  protected get productList() {
    return $$('.inventory_item')
  }

  protected get cartButton() {
    return $('.shopping_cart_container')
  }

  protected get productCounterInCart() {
    return $('.shopping_cart_container .shopping_cart_badge')
  }

  protected get addToCartButton() {
    return $('.btn_primary btn_inventory')
  }

  /**
   * Open the products page
   */
  public async open() {
    await super.open('inventory.html')
  }

  /**
   * Add a product to the cart by its name
   */
  public async addProductToCart(productName: string) {
    let productFound = false

    const products = await this.productList
    for (const item of products) {
      const name = await item.$('.inventory_item_name').getText()
      if (name === productName) {
        await item.$('.btn_inventory').click()
        productFound = true
        break
      }
    }

    if (!productFound) {
      throw new Error(`Product with name ${productName} not found`)
    }
  }

  /**
   * Verify the cart counter matches the expected number of products
   */
  public async verifyCartCounter(expectedCount: number) {
    await this.productCounterInCart.waitForDisplayed({ timeout: 10000 })
    const counterText = await this.productCounterInCart.getText()
    if (parseInt(counterText, 10) !== expectedCount) {
      throw new Error(
        `Cart counter (${counterText}) does not match expected count (${expectedCount})`
      )
    }
  }

  /**
   * Navigate to the cart
   */
  async goToCart() {
    await this.cartButton.click()
  }
}

export default new ProductsPage()
