const data = require("../data/integer_memory_store.js")

const { createClient } = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_ANON_KEY}`);


class Pages {
  constructor(express, next) {
    this.express = express
    this.next = next
  }

  init() {
    this.initCustomPages()
    this.initDefaultPages()
  }

  initCustomPages() {
    /* With a monolith api+frontend, it's possible to serve pages with preloaded data */
    this.express.get('/preload_data', (req, res) => {
      res.pageParams = {
        value: data.value
      }
      return this.next.render(req, res, `/preload_data`)
    })

    /* Special-purpose routing example */
    this.express.get('/large_or_small/:special_value', (req, res) => {
      const intValue = parseInt(req.params.special_value)
      if(isNaN(intValue)) {
        return this.next.render(req, res, `/invalid_value`, req.query)
      }
      if(intValue < 5) {
        return this.next.render(req, res, `/special_small`, req.query)
      } else {
        return this.next.render(req, res, `/special_large`, req.query)
      }
    })

    this.express.get('/appointments', async (req, res) => {
      let bingbong = await supabase
          .from('inventory')
          .select('*')
      res.json(bingbong);
    })
  }

  initDefaultPages() {
    this.express.get('/', (req, res) => {
      return this.next.render(req, res, `/main`, req.query)
    })

    this.express.get('*', (req, res) => {
      return this.next.render(req, res, `${req.path}`, req.query)
    })
  }
}

module.exports = Pages
