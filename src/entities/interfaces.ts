export interface ICheckboxFoodOption {
    food_id: number,
    food_name: string,
    food_category: string,
    isSelected: boolean
}

export interface IUser {
	EMAIL: string
	FIRST_NAME: string
	LAST_NAME: string
	BIRTH_DATE: Date
	ID_NUMBER: string
	PHONE_NAMBER: string
}