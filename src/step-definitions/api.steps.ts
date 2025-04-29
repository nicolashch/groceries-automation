import { Given, When, Then, DataTable } from '@wdio/cucumber-framework'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { expect } from '@wdio/globals'

interface ApiContext {
  baseUrl: string
  response?: AxiosResponse
  requestBody?: any
  error?: AxiosError
  lastPostId?: number | string
}

const BASE_URL = 'https://jsonplaceholder.typicode.com'

// --- Given Steps ---

Given(
  'I set the request body to:',
  function (this: ApiContext, docString: string) {
    try {
      this.requestBody = JSON.parse(docString)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse JSON request body: ${error.message}`)
      }
      throw new Error(`Failed to parse JSON request body: ${error}`)
    }
  }
)

// --- When Steps ---

// Generic step for GET requests
When(
  'I send a GET request to {string}',
  async function (this: ApiContext, endpoint: string) {
    try {
      this.error = undefined // Clear previous error
      const url = `${BASE_URL}${endpoint}`
      console.log(`Sending GET request to: ${url}`)
      this.response = await axios.get(url)
      console.log(`Received status: ${this.response.status}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error
        this.response = error.response // Store response even on error
        console.error(
          `API GET request failed: ${error.message}`,
          error.response?.data ?? ''
        )
      } else {
        if (error instanceof Error) {
          console.error(`An unexpected error occurred: ${error.message}`)
          throw error // Re-throw non-axios errors
        }
      }
    }
  }
)

// Generic step for POST requests
When(
  'I send a POST request to {string}',
  async function (this: ApiContext, endpoint: string) {
    this.lastPostId = undefined
    try {
      this.error = undefined // Clear previous error
      const url = `${BASE_URL}${endpoint}`
      console.log(`Sending POST request to: ${url}`)
      if (!this.requestBody) {
        throw new Error(
          "Request body is not set. Use the 'Given I set the request body to:' step."
        )
      }
      this.response = await axios.post(url, this.requestBody, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      console.log(`Received status: ${this.response.status}`)

      if (
        this.response?.data &&
        typeof this.response.data === 'object' &&
        'id' in this.response.data
      ) {
        this.lastPostId = this.response.data.id
        console.log(`Saved post ID: ${this.lastPostId}`)
      } else {
        console.warn('Response data did not contain an "id" property.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error
        this.response = error.response // Store response even on error
        console.error(
          `API POST request failed: ${error.message}`,
          error.response?.data ?? ''
        )
      } else {
        if (error instanceof Error) {
          console.error(`An unexpected error occurred: ${error.message}`)
          throw error // Re-throw non-axios errors
        }
      }
    }
  }
)

// Generic step for PUT requests
When(
  'I send a PUT request to {string}',
  async function (this: ApiContext, endpoint: string) {
    this.lastPostId = undefined // Clear previous post ID
    try {
      this.error = undefined // Clear previous error
      const url = `${BASE_URL}${endpoint}`
      console.log(`Sending PUT request to: ${url}`)
      if (!this.requestBody) {
        throw new Error(
          "Request body is not set. Use the 'Given I set the request body to:' step."
        )
      }
      // PUT requests typically replace the entire resource
      this.response = await axios.put(url, this.requestBody, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      console.log(`Received status: ${this.response.status}`)
      // Note: PUT responses might also contain the updated resource with an ID
      if (
        this.response?.data &&
        typeof this.response.data === 'object' &&
        'id' in this.response.data
      ) {
        // You might want to store this ID if relevant for subsequent steps
        // this.lastPostId = this.response.data.id;
        console.log(`PUT response contains ID: ${this.response.data.id}`)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error
        this.response = error.response // Store response even on error
        console.error(
          `API PUT request failed: ${error.message}`,
          error.response?.data ?? ''
        )
      } else {
        if (error instanceof Error) {
          console.error(`An unexpected error occurred: ${error.message}`)
          throw error // Re-throw non-axios errors
        }
        // Handle cases where error is not an Error instance if necessary
        console.error(`An unexpected error occurred: ${error}`)
        throw new Error(`An unexpected error occurred: ${error}`)
      }
    }
  }
)

// Generic step for DELETE requests
When(
  'I send a DELETE request to {string}',
  async function (this: ApiContext, endpoint: string) {
    this.lastPostId = undefined // Clear previous post ID
    try {
      this.error = undefined // Clear previous error
      const url = `${BASE_URL}${endpoint}`
      console.log(`Sending DELETE request to: ${url}`)
      // DELETE requests typically don't have a request body
      this.response = await axios.delete(url)
      console.log(`Received status: ${this.response.status}`)
      // DELETE responses usually have an empty body or just status confirmation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.error = error
        this.response = error.response // Store response even on error
        console.error(
          `API DELETE request failed: ${error.message}`,
          error.response?.data ?? ''
        )
      } else {
        if (error instanceof Error) {
          console.error(`An unexpected error occurred: ${error.message}`)
          throw error // Re-throw non-axios errors
        }
        // Handle cases where error is not an Error instance if necessary
        console.error(`An unexpected error occurred: ${error}`)
        throw new Error(`An unexpected error occurred: ${error}`)
      }
    }
  }
)

// --- Then Steps ---

Then(
  'the response status code should be {int}',
  function (this: ApiContext, expectedStatus: number) {
    if (!this.response) {
      throw new Error(`No response received. Error: ${this.error?.message}`)
    }
    expect(this.response.status).toEqual(expectedStatus)
  }
)

Then('the response body should be an array', function (this: ApiContext) {
  if (!this.response) throw new Error('No response received.')
  expect(Array.isArray(this.response.data)).toBe(true)
})

Then('the response array should not be empty', function (this: ApiContext) {
  if (!this.response) throw new Error('No response received.')
  expect(Array.isArray(this.response.data)).toBe(true)
  expect(this.response.data.length).toBeGreaterThan(0)
})

Then(
  'each element in the response body array should have the properties:',
  function (this: ApiContext, dataTable: DataTable) {
    if (!this.response) {
      throw new Error('No response received.')
    }

    if (!Array.isArray(this.response.data)) {
      throw new Error(
        `Expected response data to be an array, but received type ${typeof this
          .response.data}`
      )
    }

    if (this.response.data.length === 0) {
      console.warn('Response data array is empty. Skipping property check.')
      return
    }

    const propertiesToCheck = dataTable.rows().flat()

    if (propertiesToCheck.length === 0) {
      throw new Error('No properties provided in the DataTable to check.')
    }

    for (const [index, element] of this.response.data.entries()) {
      if (typeof element !== 'object' || element === null) {
        throw new Error(
          `Element at index ${index} is not an object (type: ${typeof element}). Cannot check properties.`
        )
      }

      for (const property of propertiesToCheck) {
        try {
          expect(element).toHaveProperty(property)
        } catch (e) {
          throw new Error(
            `Element at index ${index} is missing the property '${property}'. Element: ${JSON.stringify(
              element
            )}`
          )
        }
      }
    }

    console.log(
      `Verified that all ${
        this.response.data.length
      } elements have the required properties: ${propertiesToCheck.join(', ')}.`
    )
  }
)

Then(
  'the response body should have the property {string}',
  function (this: ApiContext, property: string) {
    if (!this.response) throw new Error('No response received.')
    expect(this.response.data).toHaveProperty(property)
  }
)

Then(
  'the response body should have the property {string} with value {string}',
  function (this: ApiContext, property: string, value: string) {
    if (!this.response) throw new Error('No response received.')
    expect(this.response.data).toHaveProperty(property)
    // Attempt to parse value if it looks like a number or boolean, otherwise compare as string
    let expectedValue: any = value
    if (!isNaN(Number(value))) {
      expectedValue = Number(value)
    } else if (value.toLowerCase() === 'true') {
      expectedValue = true
    } else if (value.toLowerCase() === 'false') {
      expectedValue = false
    }
    expect(this.response.data[property]).toEqual(expectedValue)
  }
)

// Overload for integer values
Then(
  'the response body should have property {string} with value {int}',
  function (this: ApiContext, property: string, value: number) {
    if (!this.response) throw new Error('No response received.')
    expect(this.response.data).toHaveProperty(property)
    expect(this.response.data[property]).toEqual(value)
  }
)

// Overload for float values
Then(
  'the response body should have property {string} with value {float}',
  function (this: ApiContext, property: string, value: number) {
    if (!this.response) throw new Error('No response received.')
    expect(this.response.data).toHaveProperty(property)
    expect(this.response.data[property]).toEqual(value)
  }
)
