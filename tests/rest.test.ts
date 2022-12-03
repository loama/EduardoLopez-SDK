import LOTR from '../index'

// setup
function error (mssg: String) {
  console.log('\x1b[31m ' + mssg + ' \x1b[0m');
}

function success (mssg: String) {
  console.log('\x1b[32m ' + mssg + ' \x1b[0m');
}

function warn (mssg: String) {
  console.log('\x1b[33m ' + mssg + ' \x1b[0m')
}

// error('this is an error')
// success('correct')
// warn('warn')

let testsPassed = 0
let testsError = 0
let testsWithError = ['']

// tests

async function test () {
  console.log('Running tests ...')

  // Test 1 - assert that we can retrieve books even without Authentication
  const test1 = await LOTR.get('book')
  try {
    if (test1.total === 3) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test1')
  }

  // Test 2 - try to use an incorrect API key to login
  try {
    await LOTR.setup('incorrect-key')
    const test2 = await LOTR.get('movie')

    testsError = testsError + 1
    testsWithError.push('test2')
  } catch {
    testsPassed = testsPassed + 1
  }

  // Test 3 - try to use an correct API key to login
  try {
    await LOTR.setup('bI8jJSvOyGeTzadmKGDF')
    const test3 = await LOTR.get('movie')

    if (test3.total === 8) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test3')
  }

  // Test 4 - check that we can get a specific book by id
  try {
    const test4 = await LOTR.get('book/5cf5805fb53e011a64671582')

    if (test4.total === 1) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test4')
  }

  // Test 5 - check that we can get the chapters of a book
  try {
    const test5 = await LOTR.get('book/5cf5805fb53e011a64671582/chapter')

    if (test5.total === 22) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test5')
  }

  // Test 6 - get a specific movie
  try {
    const test6 = await LOTR.get('movie/5cd95395de30eff6ebccde56')

    if (test6.total === 1) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test6')
  }

  // Test 7 - get quotes from movie
  try {
    const test7 = await LOTR.get('movie/5cd95395de30eff6ebccde5d/quote')

    if (test7.total > 871) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test7')
  }

  // Test 8 - check that we can get all the characters
  try {
    const test8 = await LOTR.get('character')

    if (test8.total > 932) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test8')
  }

  // Test 9 - check that wrong graphql query doesn't return anything
  try {
    const test9 = await LOTR.graphQL(`chrctr {}`)

    if (test9.errors !== undefined && test9.data === undefined) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test8')
  }

  // Test 10 - check that correct graphql query returns without errors
  try {
    const test10:any = await LOTR.graphQL(`{
      book {
        _id
      }
    }`)

    if (test10.errors === undefined && test10.data!.book.length === 3) {
      testsPassed = testsPassed + 1
    } else {
      throw "myException"
    }
  } catch {
    testsError = testsError + 1
    testsWithError.push('test8')
  }

  // finish
  console.log('finished running tests:')
  if (testsError === 0) {
    success(testsError.toString() + ' tests had an error')
    success(testsPassed.toString() + ' tests passed')
  } else if (testsPassed > testsError) {
    error(testsError.toString() + ' tests had an error')
    warn(testsPassed.toString() + ' tests passed')
  } else {
    error(testsError.toString() + ' tests had an error')
    error(testsPassed.toString() + ' tests passed')
  } 
}


// run tests
test()