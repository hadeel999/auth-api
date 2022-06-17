'use strict';

process.env.SECRET = "TEST_SECRET";
const { app } = require('../../auth/server'); 
const supertest = require('supertest');
const { sequelize } = require('../../auth/models/index');

const request = supertest(app);
let id=0;
let userData = {
  testData: { name: 'banana', calories: 'calo' , type:'fruit'},
}; 

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('testing food model for v1 route',()=>{
 
    it ('post new food', async () => {
        const response = await request.post('/food').send(userData.testData);
        expect(response.status).toEqual(201);
         id = response.body.id;
    });

    it('testing get all food',async()=>{
        const response = await request.get('/food')
        expect(response.status).toEqual(200)
    })
        
    it ('testing get by id method',async()=>{
       const response = await request.get(`/food/${id}`)
       expect(response.status).toEqual(200);
   })
  

   it ('update food', async () => {
    const response = await request.put(`/food/${id}`).send({
        name: "test",
        calories : "test",
        type: "vegetable"
    })
    expect(response.status).toEqual(201);
});

it ('deleting by id',async()=>{
    const response = await request.delete(`/food/${id}`)
    expect(response.status).toEqual(204);
})

})