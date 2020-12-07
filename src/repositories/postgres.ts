import { ICheckboxFoodOption, IUser } from '../entities/interfaces'
import postgresConnection from './dbConfig';

const { Pool } = require('pg');

const pool = new Pool(postgresConnection);

export async function getAllFoods() {
    return pool.query('SELECT * FROM foods')
}

export async function addNewFood(foodName: string) {
    pool.query('INSERT INTO Foods(FOOD_NAME, FOOD_CATEGORY) VALUES($1, $2)', [foodName, 'אוכל'])
}

export async function addUser(user: IUser) {
    await pool.query(`UPDATE Users SET FIRST_NAME=$1, LAST_NAME=$2, BIRTH_DATE=$3, ID_NUMBER=$4, PHONE_NAMBER=$5, LAST_UPDATED=NOW() WHERE EMAIL=$6;`,
        [user.FIRST_NAME, user.LAST_NAME, user.BIRTH_DATE, user.ID_NUMBER, user.PHONE_NAMBER, user.EMAIL]);
    
    await pool.query(`INSERT INTO Users (EMAIL, FIRST_NAME, LAST_NAME, BIRTH_DATE, ID_NUMBER, PHONE_NAMBER, CREATED_AT, LAST_UPDATED)
                    SELECT $1, $2, $3, $4, $5, $6, NOW(), NOW()
                    WHERE NOT EXISTS (SELECT 1 FROM Users WHERE EMAIL=$7);`, [user.EMAIL, user.FIRST_NAME, user.LAST_NAME, user.BIRTH_DATE, user.ID_NUMBER, user.PHONE_NAMBER, user.EMAIL]);
    
}

export async function userLoggeddIn(user: IUser) {
    await pool.query(`UPDATE Users SET LAST_LOGGED_IN=NOW() WHERE EMAIL=$1;`,[user.EMAIL]);
    
    await pool.query(`INSERT INTO Users (EMAIL, CREATED_AT, LAST_LOGGED_IN)
                    SELECT $1,NOW(), NOW()
                    WHERE NOT EXISTS (SELECT 1 FROM Users WHERE EMAIL=$2);`, [user.EMAIL, user.EMAIL]);
    
}

export async function deselectUsersFood(email: string) {
    await pool.query(`UPDATE Users_Food SET SELECT_ACTIVE=$1, LAST_UPDATED=NOW() WHERE EMAIL=$2 AND SELECT_ACTIVE=$3;`,[false, email, true]);    
}

export async function addUserFood(foodOption: ICheckboxFoodOption, email: string) {
    await pool.query(`UPDATE Users_Food SET SELECT_ACTIVE=$1, LAST_UPDATED=NOW() WHERE EMAIL=$2 And FOOD_ID=$3;`,[true, email, foodOption.food_id]);
    
    await pool.query(`INSERT INTO Users_Food (EMAIL, FOOD_ID, SELECT_ACTIVE, LAST_UPDATED)
                    SELECT $1, $2, $3, NOW()
                    WHERE NOT EXISTS (SELECT 1 FROM Users_Food WHERE EMAIL=$4 AND FOOD_ID=$5);`, [email, foodOption.food_id, true, email, foodOption.food_id]);
    
}