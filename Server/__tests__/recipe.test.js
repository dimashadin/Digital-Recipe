const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models/");
const { hashPass } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { queryInterface } = sequelize;

let token;

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", [
    {
      username: "User 1",
      email: "user1@mail.com",
      password: hashPass("user1"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "User 1",
      email: "user2@mail.com",
      password: hashPass("user2"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  let data = require("../data/recipe.json").map((el) => {
    delete el.id;
    el.createdAt = el.updatedAt = new Date();

    return el;
  });

  await queryInterface.bulkInsert("Recipes", data, {});

  token = signToken({ id: 1 });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Recipes", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("add new recipe", () => {
  test("Add new recipe succes, 201", async () => {
    const res = await request(app)
      .post("/recipe")
      .send({
        name: "Chicken Alfredo Pasta",
        ingredients:
          "1. Fettuccine pasta\n2. Chicken breast, sliced\n3. Heavy cream\n4. Parmesan cheese, grated\n5. Garlic, minced\n6. Butter\n7. Salt and pepper to taste\n8. Fresh parsley for garnish",
        instructions:
          "1. Cook fettuccine pasta according to package instructions.\n2. In a pan, sauté sliced chicken in butter until fully cooked.\n3. Add minced garlic and cook until fragrant.\n4. Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.\n5. Season with salt and pepper to taste.\n6. Combine the Alfredo sauce with cooked pasta.\n7. Garnish with fresh parsley before serving.",
        prepTimeMinutes: 15,
        difficulty: "Medium",
        cuisine: "Italian",
        caloriesPerServing: 500,
        UserId: 1,
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        rating: 5,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);

    expect(res.body).toHaveProperty("id", expect.any(Number));
    expect(res.body).toHaveProperty("name", "Chicken Alfredo Pasta");
    expect(res.body).toHaveProperty(
      "ingredients",
      "1. Fettuccine pasta\n2. Chicken breast, sliced\n3. Heavy cream\n4. Parmesan cheese, grated\n5. Garlic, minced\n6. Butter\n7. Salt and pepper to taste\n8. Fresh parsley for garnish"
    );
    expect(res.body).toHaveProperty(
      "instructions",
      "1. Cook fettuccine pasta according to package instructions.\n2. In a pan, sauté sliced chicken in butter until fully cooked.\n3. Add minced garlic and cook until fragrant.\n4. Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.\n5. Season with salt and pepper to taste.\n6. Combine the Alfredo sauce with cooked pasta.\n7. Garnish with fresh parsley before serving."
    );
    expect(res.body).toHaveProperty("prepTimeMinutes", 15);
    expect(res.body).toHaveProperty("difficulty", "Medium");
    expect(res.body).toHaveProperty("cuisine", "Italian");
    expect(res.body).toHaveProperty("caloriesPerServing", 500);
    expect(res.body).toHaveProperty("UserId", 1);
    expect(res.body).toHaveProperty(
      "image",
      "https://cdn.dummyjson.com/recipe-images/4.webp"
    );
    expect(res.body).toHaveProperty("rating", 5);
  });

  test("belum login, 401", async () => {
    const res = await request(app).post("/recipe").send({
      name: "Chicken Alfredo Pasta",
      ingredients:
        "1. Fettuccine pasta\n2. Chicken breast, sliced\n3. Heavy cream\n4. Parmesan cheese, grated\n5. Garlic, minced\n6. Butter\n7. Salt and pepper to taste\n8. Fresh parsley for garnish",
      instructions:
        "1. Cook fettuccine pasta according to package instructions.\n2. In a pan, sauté sliced chicken in butter until fully cooked.\n3. Add minced garlic and cook until fragrant.\n4. Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.\n5. Season with salt and pepper to taste.\n6. Combine the Alfredo sauce with cooked pasta.\n7. Garnish with fresh parsley before serving.",
      prepTimeMinutes: 15,
      difficulty: "Medium",
      cuisine: "Italian",
      caloriesPerServing: 500,
      UserId: 1,
      image: "https://cdn.dummyjson.com/recipe-images/4.webp",
      rating: 5,
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid Token");
  });

  test("token salah, 401", async () => {
    const res = await request(app)
      .post("/recipe")
      .send({
        name: "Chicken Alfredo Pasta",
        ingredients:
          "1. Fettuccine pasta\n2. Chicken breast, sliced\n3. Heavy cream\n4. Parmesan cheese, grated\n5. Garlic, minced\n6. Butter\n7. Salt and pepper to taste\n8. Fresh parsley for garnish",
        instructions:
          "1. Cook fettuccine pasta according to package instructions.\n2. In a pan, sauté sliced chicken in butter until fully cooked.\n3. Add minced garlic and cook until fragrant.\n4. Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.\n5. Season with salt and pepper to taste.\n6. Combine the Alfredo sauce with cooked pasta.\n7. Garnish with fresh parsley before serving.",
        prepTimeMinutes: 15,
        difficulty: "Medium",
        cuisine: "Italian",
        caloriesPerServing: 500,
        UserId: 1,
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        rating: 5,
      })
      .set("Authorization", `Bearer (wrong Token)`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid Token");
  });

  test("Nama dari res.body tidak ada , 400", async () => {
    const res = await request(app)
      .post("/recipe")
      .send({
        ingredients:
          "1. Fettuccine pasta\n2. Chicken breast, sliced\n3. Heavy cream\n4. Parmesan cheese, grated\n5. Garlic, minced\n6. Butter\n7. Salt and pepper to taste\n8. Fresh parsley for garnish",
        instructions:
          "1. Cook fettuccine pasta according to package instructions.\n2. In a pan, sauté sliced chicken in butter until fully cooked.\n3. Add minced garlic and cook until fragrant.\n4. Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted.\n5. Season with salt and pepper to taste.\n6. Combine the Alfredo sauce with cooked pasta.\n7. Garnish with fresh parsley before serving.",
        prepTimeMinutes: 15,
        difficulty: "Medium",
        cuisine: "Italian",
        caloriesPerServing: 500,
        UserId: 1,
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        rating: 5,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Name is required");
  });

  
});
