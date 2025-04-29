Feature: Purchase scenarios

  @purchase
  Scenario: The user adds a product to the cart
    Given The user is logged in as a standard_user
    When The user adds to the cart the product Sauce Labs Backpack
    Then The cart is updated with 1 item