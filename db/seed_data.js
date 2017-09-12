module.exports = {

  // steps
  steps: [
    {
      category: 'operation',
      order: 1,
      target: {},
      type: 'get',
      options: {
        value: 'http://staging.mystrengthbook.com'
      }
    },
    {
      category: 'operation',
      order: 2,
      target: {
        type: 'css',
        value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(1) > input'
      },
      type: 'sendKeys',
      options: {
        value: 'blake4@tillerdigital.ca'
      }
    },
    {
      category: 'operation',
      order: 3,
      target: {
        type: 'css',
        value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(2) > input'
      },
      type: 'sendKeys',
      options: {
        value: 'T!ll3rTEAM'
      }
    },
    {
      category: 'operation',
      order: 4,
      target: {
        type: 'css',
        value: '#login-wrapper > form > div.frame.narrow > div > div:nth-child(5) > button'
      },
      type: 'click',
      options: {
        type: 'left'
      }
    },
    {
      category: 'assertion',
      order: 5,
      target: {
        type: 'css',
        value: 'body'
      },
      type: 'textNotContains',
      options: {
        value: 'Calendar'
      }
    },
    {
      category: 'assertion',
      order: 6,
      target: {
        type: 'css',
        value: 'body'
      },
      type: 'textContains',
      options: {
        value: 'Calendar'
      }
    }
  ]

} //module.exports
