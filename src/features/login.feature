@regression
Feature: Login scenarios

  @login
  Scenario Outline: Login with different users

    Given I am on the login page
    When I login with <username> and <password>

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | locked_out_user         | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |
