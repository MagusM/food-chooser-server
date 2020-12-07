import { addNewFood, addUser, addUserFood, deselectUsersFood, getAllFoods, userLoggeddIn} from './repositories/postgres'
import bodyParser from 'body-parser';
import { ICheckboxFoodOption } from './entities/interfaces';
import {beerList} from './constants'

const express = require('express')
var cors = require('cors')
var fs = require('fs');

const app = express()
const port = 2000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/foods', (req, res) => {
    getAllFoods().then((data) => res.send(data.rows))
})

app.post('/foods', (req, res) => {
    console.log("Body", req.body)
    addNewFood(req.body.foodName).then(() => res.send('ok'))
})

app.post('/users', (req, res) => {
    console.log("Body", req.body)
    addUser(req.body.user).then(() => res.send('ok'))
})

app.post('/userLoginStatus', (req, res) => {
    console.log("Body", req.body)
    userLoggeddIn(req.body.user).then(() => res.send('ok'))
})

app.post('/userFood', async (req, res) => {
    console.log("Body", req.body)

    let email: string = req.body.email
    let foods: ICheckboxFoodOption[] = req.body.foods
    
    await deselectUsersFood(email);

    foods.forEach(async (food: ICheckboxFoodOption) => {
        await addUserFood(food, email)
    })
    res.send("ok")
})

app.get('/beers', (req, res) => {
     res.send(beerList)
})

app.post('/userChosenBeer', (req, res) => {

    fs.appendFile('favoriteBeers.txt', `${req.body.email}: ${req.body.chosenBeer}\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.send('ok');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})