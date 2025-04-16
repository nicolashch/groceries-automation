import { When, Then } from '@cucumber/cucumber'
import ProductsPage from '../pageobjects/products.page'

When(
  /^The user adds to the cart the product (.+)$/,
  async function (product: string) {
    await ProductsPage.addProductToCart(product)
  }
)

Then(/^The cart is updated with (.+) item$/, async function (item: string) {
  await ProductsPage.verifyCartCounter(parseInt(item, 10))
})
