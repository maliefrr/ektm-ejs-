const axios = require("axios")


test("Get all users while user role is mahasiswa should return error",async () => {
    try {
        const loginResponse = await axios.post("http://localhost:5000/api/users/login",{
            username : "F1G119031",
            password : "F1G119031"
        })

        const token = loginResponse.data.data.token

        // send a request to protected route
        await axios.get("http://localhost:5000/api/users/all",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        expect(error.response.status).toBe(401)
        expect(error.response.data.message).toBe("User not authorized")
    }
})
test("Get all user while user while user role is admin should return an array of object",async () => {
    const loginResponse = await axios.post("http://localhost:5000/api/users/login",{
        username : "admin",
        password : "admin123"
    })

    const token = loginResponse.data.data.token;

    // send a request to protected route
    const response = await axios.get("http://localhost:5000/api/users/all",{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    expect(response.status).toBe(200)
    expect(response.data.data[0]).toHaveProperty("username")
    expect(response.data.data[0]).toHaveProperty("email")
    expect(response.data.data[0]).toHaveProperty("role")
})