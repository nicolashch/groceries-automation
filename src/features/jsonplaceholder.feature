@api
@regression
Feature: JSONPlaceholder API Tests

  Scenario: Get all posts
    When I send a GET request to "/posts"
    Then the response status code should be 200
    And the response body should be an array
    And the response array should not be empty
    And each element in the response body array should have the properties:
      | property |
      | userId   |
      | id       |
      | title    |
      | body     |

  Scenario: Create a new post
    Given I set the request body to:
      """
      {
        "title": "This is a test post",
        "body": "This is the content of my fantastic new post.",
        "userId": 101
      }
      """
    When I send a POST request to "/posts"
    Then the response status code should be 201
    And the response body should have the property "id"
    And the response body should have the property "title" with value "This is a test post"
    And the response body should have the property "body" with value "This is the content of my fantastic new post."
    And the response body should have the property "userId" with value "101"

  Scenario: Update an existing post
    Given I set the request body to:
      """
      {
        "id": 1,
        "title": "Updated Title",
        "body": "This post has been updated.",
        "userId": 1
      }
      """
    When I send a PUT request to "/posts/1"
    Then the response status code should be 200
    And the response body should have the property "title" with value "Updated Title"
    And the response body should have the property "id" with value "1"

  Scenario: Delete a post
    When I send a DELETE request to "/posts/1"
    Then the response status code should be 200