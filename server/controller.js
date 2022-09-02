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
        ('Vladimir Guerrero Jr.', 'Blue Jays', '1B', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blue_Jays_Vladimir_Guerrero_jogs_back_to_dugout_July_27%2C_2020_%2850161781342%29_%28cropped%29.jpg'),
        ('Edwin Diaz', 'Mets', 'Pitcher', 'https://static01.nyt.com/images/2022/08/26/multimedia/26kepner-diaz-top/26kepner-diaz-top-mobileMasterAt3x.jpg'),
        ('Aaron Judge', 'Yankees', 'RF', 'https://cdn.vox-cdn.com/thumbor/Yzuoe4SmxylQ08Yjam1s1-uUeEs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23972560/1242678634.jpg'),
        ('Jonathan India', 'Reds', '2B', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jonathan_India_%2851205081535%29_%28cropped%29.jpg/1200px-Jonathan_India_%2851205081535%29_%28cropped%29.jpg');
        `)
        .then(() => {
            console.log('database seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}