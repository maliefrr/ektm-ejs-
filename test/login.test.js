const axios = require("axios")

test("Try login with wrong username should return an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/login",{
            username: "admin213",
            password: "admin123"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The user or password you input are invalid")
    }
})
test("Try login with wrong password should return an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/login",{
            username: "admin",
            password: "admin123adasdwq"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The user or password you input are invalid")
    }
})
test("User did not fill the username field",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/login",{
            username: "admin"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})
test("User did not fill the password field",async () => {
    try {
        await axios.post("http://localhost:5000/api/users/login",{
            password: "admin123"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})
test("Login user must return an object",async () => {
    const response = await axios.post("http://localhost:5000/api/users/login",{
        username: "admin",
        password: "admin123"
    })

    expect(response.status).toBe(200);
    expect(response.data.data).toHaveProperty("token")
})
