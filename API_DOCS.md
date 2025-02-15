# MyRecipe IP-Hck78 API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /recipe`
- `POST /recipe/`

Routes below need authentication & authorization:

- `PUT /usercoins/:id`
- `DELETE /usercoins/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "fullName": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Full Name is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "<token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /recipe

Description:

- Fetch all recipe in database.

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Chicken Alfredo Pasta",
    "ingredients": "1. Fettuccine pasta\n2. Chicken breast, sliced\n3. Heavy cream\n4. Parmesan cheese, grated\n5. Garlic, minced\n6. Butter\n7. Salt and pepper to taste\n8. Fresh parsley for garnish",
    "instructions": "1. Cook fettuccine pasta according to package instructions.\n2. In a pan, sauté sliced chicken in butter until fully cooked.\n3. Add minced garlic and cook until fragrant.\n4. Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.\n5. Season with salt and pepper to taste.\n6. Combine the Alfredo sauce with cooked pasta.\n7. Garnish with fresh parsley before serving.",
    "prepTimeMinutes": 15,
    "difficulty": "Medium",
    "cuisine": "Italian",
    "caloriesPerServing": 500,
    "UserId": 2,
    "image": "https://cdn.dummyjson.com/recipe-images/4.webp",
    "rating": 5,
    "createdAt": "2025-01-02T10:45:42.534Z",
    "updatedAt": "2025-01-02T10:45:42.534Z"
  },
  {
    "id": 2,
    "name": "Mango Salsa Chicken",
    "ingredients": "1. Chicken thighs\n2. Mango, diced\n3. Red onion, finely chopped\n4. Cilantro, chopped\n5. Lime juice\n6. Jalapeño, minced\n7. Salt and pepper to taste\n8. Cooked rice for serving",
    "instructions": "1. Season chicken thighs with salt and pepper.\n2. Grill or bake chicken until fully cooked.\n3. In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.\n4. Dice the cooked chicken and mix it with the mango salsa.\n5. Serve over cooked rice.",
    "prepTimeMinutes": 15,
    "difficulty": "Easy",
    "cuisine": "Mexican",
    "caloriesPerServing": 380,
    "UserId": 1,
    "image": "https://cdn.dummyjson.com/recipe-images/5.webp",
    "rating": 5,
    "createdAt": "2025-01-02T10:45:42.534Z",
    "updatedAt": "2025-01-02T10:45:42.534Z"
  },
  ...,
]
```

&nbsp;

## 6. POST /products

Request:

- headers:

```json
{
  "access_token": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "Mango Salsa Chicken",
  "ingredients": "1. Chicken thighs\n2. Mango, diced\n3. Red onion, finely chopped\n4. Cilantro, chopped\n5. Lime juice\n6. Jalapeño, minced\n7. Salt and pepper to taste\n8. Cooked rice for serving",
  "instructions": "1. Season chicken thighs with salt and pepper.\n2. Grill or bake chicken until fully cooked.\n3. In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.\n4. Dice the cooked chicken and mix it with the mango salsa.\n5. Serve over cooked rice.",
  "prepTimeMinutes": 15,
  "difficulty": "Easy",
  "cuisine": "Mexican",
  "caloriesPerServing": 380,
  "UserId": 1,
  "image": "https://cdn.dummyjson.com/recipe-images/5.webp",
  "rating": 5
}
```

_Response (201 - Created)_

```json
{
  "name": "Mango Salsa Chicken",
  "ingredients": "1. Chicken thighs\n2. Mango, diced\n3. Red onion, finely chopped\n4. Cilantro, chopped\n5. Lime juice\n6. Jalapeño, minced\n7. Salt and pepper to taste\n8. Cooked rice for serving",
  "instructions": "1. Season chicken thighs with salt and pepper.\n2. Grill or bake chicken until fully cooked.\n3. In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.\n4. Dice the cooked chicken and mix it with the mango salsa.\n5. Serve over cooked rice.",
  "prepTimeMinutes": 15,
  "difficulty": "Easy",
  "cuisine": "Mexican",
  "caloriesPerServing": 380,
  "UserId": 1,
  "image": "https://cdn.dummyjson.com/recipe-images/5.webp",
  "rating": 5
}
```

&nbsp;

## 4. PUT /recipe/:id

Description:

- Update recipe by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "integer",
  "ingredients": "text",
  "instructions": "text.",
  "prepTimeMinutes": "integer",
  "difficulty": "string",
  "cuisine": "string",
  "caloriesPerServing": "integer",
  "UserId": "integer",
  "image": "string",
  "rating": "integer"
}
```

_Response (200 - OK)_

```json
{
  "name": "Mango Salsa Chicken",
  "ingredients": "1. Chicken thighs\n2. Mango, diced\n3. Red onion, finely chopped\n4. Cilantro, chopped\n5. Lime juice\n6. Jalapeño, minced\n7. Salt and pepper to taste\n8. Cooked rice for serving",
  "instructions": "1. Season chicken thighs with salt and pepper.\n2. Grill or bake chicken until fully cooked.\n3. In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice.\n4. Dice the cooked chicken and mix it with the mango salsa.\n5. Serve over cooked rice.",
  "prepTimeMinutes": 15,
  "difficulty": "Easy",
  "cuisine": "Mexican",
  "caloriesPerServing": 380,
  "UserId": 1,
  "image": "https://cdn.dummyjson.com/recipe-images/5.webp",
  "rating": 5
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## 8. DELETE /recipe/:id

Description:

- Delete recipe by id

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Recipe successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Recipe not found"
}
```

&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
