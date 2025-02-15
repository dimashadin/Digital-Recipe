const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models/");
const { hashPass } = require("../helper/bcrypt");
const { queryInterface } = sequelize

beforeAll(async () => {
  await queryInterface.bulkInsert("Users", [
    {
      username: "User 1",
      email: "user1@mail.com",
      password: hashPass("user1"),
      createdAt : new Date(),
      updatedAt: new Date()
    },
    {
        username: "User 1",
        email: "user2@mail.com",
        password: hashPass("user2"),
        createdAt : new Date(),
        updatedAt: new Date()
      }
  ]);
});


afterAll(async ()=>{
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      })
})


describe("Test Login",()=>{

    describe("Test login success", ()=>{
        
        test("Login success and get acces_token", async ()=>{
            const res = await request(app).post('/login').send({
                email: "user1@mail.com",
                password: "user1"
            })
  
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("access_token", expect.any(String))
        })

    })

    describe("Test login failed", ()=>{

       test("without email, status 400", async()=>{
        const res = await request(app).post('/login').send({
            password: "user1"
        })

        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message", "Email is Required")
       })

       test("without password, status 400", async()=>{
        const res = await request(app).post('/login').send({
             email: "user1@mail.com"
        })

        
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message", "Password is Required")
       })

       test("wrong password, status 401", async()=>{
        const res = await request(app).post('/login').send({
             email: "user1@mail.com",
             password: "wrongPassword"
        })

        
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Email or Password is wrong")
       })

       test("Invalid email, status 401", async()=>{
        const res = await request(app).post('/login').send({
             email: "wrongEmail",
             password: "user1@mail.com"
        })

        
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Email or Password is wrong")
       })

    })




})



