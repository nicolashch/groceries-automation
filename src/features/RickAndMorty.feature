@RickAndMorty
Feature: Rick and morty

  Background:
    Given that the user is on the Rick and morty page

  Scenario Outline: Check character details
    When the user selects character "<name>"
    Then the user should see the character "<name>" details
    And the user returns to the home page

    Examples:
      | name         |
      | Rick Sanchez |
      | Morty Smith  |
      | Summer Smith |

  Scenario: Return to the Home page
    Given that the user is on a character details page
    When the user clicks the "Home" button at the footer
    Then the user returns to the home page

  Scenario: Scoll to the top of the page
    Given the user is at the bottom of the page
    When the user clicks the "Top" button at the footer
    Then the user returns to the top of the page

  Scenario: Add new character
    When the user clicks the "Add" button at the footer
    Then the user is redirected to the add character page