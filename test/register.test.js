const axios = require("axios");
const MockAdapter = require("axios-mock-adapter")


test("Register user function that user did not fill username field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            name: "Muhammad Firmansyah",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function that user did not fill name field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            username: "firman1212",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function that user did not fill email field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            name: "Muhammad Firmansyah",
            username: "Firman1212",
            password: "firman123"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function that user did not fill password field should throw an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/register",{
            name: "Muhammad Firmansyah",
            email: "Firman1212@gmail.com",
            username: "firman1212"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})

test("Register user function should return an object",async () => {
        const mock = new MockAdapter(axios)

        mock.onPost("http://localhost:5000/api/users/register").reply(201,{
            data: {
                id: "0x19283197218",
                token: "ey82391hjda9381.oasidn1u19328hjk21.j2i31903120j123"
            }
        })

        const response = await axios.post('http://localhost:5000/api/users/register',{
            name : "Muhamad Firmansyah",
            username : "Firman1212",
            email: "Firman1212@gmail.com",
            password: "firman123"
        })


        expect(response.status).toBe(201);
        expect(response.data.data).toHaveProperty("id");
        expect(response.data.data).toHaveProperty("token")
    })

test("Register user function return an error because user enter the user that already exist",async () => {
    try {
        await axios.post('http://localhost:5000/api/users/register',{
            name : "Super admin",
            username : "admin",
            email: "admin1212@gmail.com",
            password: "admin123"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("Username has been already exist")
    }
})