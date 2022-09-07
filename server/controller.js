require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize (CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        CREATE TABLE cards (
            card_id SERIAL PRIMARY KEY,
            name VARCHAR,
            team VARCHAR,
            position VARCHAR,
            image_url VARCHAR
        );

        INSERT INTO cards(name, team, position, image_url)
        VALUES
        ('Adley Rutschman', 'Orioles', 'Catcher', 'https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg5NjQ5NTg3MTE4NTQ4MTY1/usatsi_18324070_168388303_lowres.jpg'),
        ('Vladimir Guerrero Jr.', 'Blue Jays', '1B', 'https://fivethirtyeight.com/wp-content/uploads/2021/05/GettyImages-1317350303-e1622089820183.jpg?w=575'),
        ('Edwin Diaz', 'Mets', 'Pitcher', 'https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwMTczMDM2Nzk0NjE5MTYx/usatsi_18527820.jpg'),
        ('Aaron Judge', 'Yankees', 'RF', 'https://fivethirtyeight.com/wp-content/uploads/2022/05/GettyImages-1397823968-4x3-1.jpg?w=916'),
        ('Jonathan India', 'Reds', '2B', 'https://cdn.vox-cdn.com/thumbor/cdf_uym3wVV08Uv7gUicjicxQoU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23017519/1342744414.jpg');
        `)
        .then(() => {
            console.log('database seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    getCollection: (req, res) => {
        sequelize.query(`
        SELECT * FROM cards
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error', err))
    },
    createCard: (req, res) => {
        let {name, team, position, image_url} = req.body
        sequelize.query(`
        INSERT INTO cards (name, team, position, image_url) 
        VALUES
        ('${name}', '${team}', '${position}', '${image_url}')
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error', err))
    }
}

