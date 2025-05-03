 sidebar 设计说明
 
 url 访问了/STS8600-Documentation 会展示如下sidebar
 
 sidebar: {
          '/STS8600-Documentation': [
            {
              text: 'STS8600 Documentation',
              collapsed: true,
              link: '/STS8600-Documentation',
              items: [
                {
                  text: 'STS8600 v1.0.0 Manual', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation', collapsed: true, items: [
                    {
                      text: 'API Manual', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/API-manual', collapsed: true, items: [
                        {
                          text: 'Analog', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/API-manual/Analog', collapsed: true, items: [
                            {
                              text: 'DIZITIZER', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/API-manual/Analog/DIZITIZER', collapsed: true, items: [
                                { text: 'DGT WaveformResult', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/API-manual/Analog/DIZITIZER/DGT_WaveformResult' },
                                { text: 'TestFlow', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/API-manual/Analog/DIZITIZER/TestFlow' },
                                { text: 'BinMap', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/API-manual/Analog/DIZITIZER/Binmap' }
                              ]
                            }
                          ]
                        },
                      ]
                    },
                    {
                      text: 'Hardware Manual', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Hardware-manual', collapsed: true, items: [
                        {
                          text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Hardware-manual/Template', items: [
                            { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Hardware-manual/Template/Template' }
                          ]
                        }
                      ]
                    },
                    {
                      text: 'Software Manual', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Software-manual', collapsed: true, items: [
                        { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Software-manual/Template' },
                      ],
                    },
                    {
                      text: 'Reference', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Reference',collapsed:true, items: [
                        { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Reference/Template' },
                      ]
                    },
                    {
                      text: 'Use cases and application paper', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper', collapsed: true, items: [
                        {
                          text: 'Application-note', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Application-note',collapsed:true, items: [
                            {
                              text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Application-note/template',collapsed:true,items: [
                                { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Application-note/Template/Template' }
                              ]
                            },
                          ]
                        },
                        { text: 'Card-Usage', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Card-Usage',collapsed:true,items: [
                          {
                            text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Card-Usage/template', collapsed:true,items: [
                              { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Card-Usage/Template/Template' }
                            ]
                          },
                        ] },
                        { text: 'Function', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Function',collapsed:true,items: [
                          {
                            text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Function/template', collapsed:true,items: [
                              { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Function/Template/Template' }
                            ]
                          },
                        ] },
                        { text: 'Power-and-analog', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Power-and-analog-test',collapsed:true,items: [
                          {
                            text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Power-and-analog-test/template',collapsed:true, items: [
                              { text: 'Template', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Power-and-analog-test/Template/Template' }
                            ]
                          },
                        ] },
                        { text: 'Protocol', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Protocol',collapsed:true,items:[
                          {text: 'I2C', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Protocol/I2C'},
                          {text: 'JIAG', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Protocol/JTAG'},
                          {text: 'SPI', link: '/STS8600-Documentation/STS8600-v1.0.0-Documentation/Use-cases-and-application-paper/Protocol/SPI'}
                        ] }
                      ]
                    }
                  ]
                },
                {
                  text: 'STS8600 v1.0.0 Notification', link: '/STS8600-Documentation/Notification', collapsed: true, items: [
                    { text: 'Product change notification', link: '/STS8600-Documentation/Notification/Product-change-notification' }
                  ]
                },
                {
                  text: 'STS8600 v1.0.0 Service', link: '/STS8600-Documentation/Service', collapsed: true, items: [
                    { text: 'Template', link: '/STS8600-Documentation/Service/Template' }
                  ]
                },
              ]
            }
          ],
        },