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
        ('Adley Rutschman', 'Orioles', 'Catcher', 'https://fivethirtyeight.com/wp-content/uploads/2020/05/GettyImages-1208312227-1-e1590103124225.jpg?w=375'),
        ('Vladimir Guerrero Jr.', 'Blue Jays', '1B', 'https://fivethirtyeight.com/wp-content/uploads/2021/05/GettyImages-1317350303-e1622089820183.jpg?w=375'),
        ('Edwin Diaz', 'Mets', 'Pitcher', 'https://www.justbaseball.com/wp-content/uploads/sites/2/2022/05/Screenshot-218.png?w=375'),
        ('Aaron Judge', 'Yankees', 'RF', 'https://fivethirtyeight.com/wp-content/uploads/2022/05/GettyImages-1397823968-4x3-1.jpg?w=575'),
        ('Jonathan India', 'Reds', '2B', 'https://cdnph.upi.com/pv/upi/ee600c8bf495d05ff4e2d2d1bf240513/MLB-REDSCARDINALS.jpg?w=375');
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
    },
    deleteCard: (req, res) => {
        let {id} = req.params
        sequelize.query(`
        DELETE FROM cards WHERE card_id = ${id}
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log('error', err))
    }
}

