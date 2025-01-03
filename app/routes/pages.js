import {createClient} from 's'

const supabaseUrl = 'https://cyrokafeqtyphlvgdpbp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


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

        /* Special-purpose routing example */
        this.express.get('/large_or_small/:special_value', (req, res) => {
            const intValue = parseInt(req.params.special_value)
            if (isNaN(intValue)) {
                return this.next.render(req, res, `/invalid_value`, req.query)
            }
            if (intValue < 5) {
                return this.next.render(req, res, `/special_small`, req.query)
            } else {
                return this.next.render(req, res, `/special_large`, req.query)
            }
        });

        this.express.get('/appointments', (req, res) => {
            const data = [];

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
