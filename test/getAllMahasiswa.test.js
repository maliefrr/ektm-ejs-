const axios = require("axios")

test("The user that isn't admin try to get mahasiswas data should return error",async () => {
    try {
        const loginResponse = await axios.post("http://localhost:5000/api/users/login",{
            username: "F1G119031",
            password: "F1G119031"
        })

        const token = loginResponse.data.data.token

        // send a request to protected route
        await axios.get("http://localhost:5000/api/mahasiswa/all",{
            headers: {
                Authorization: `Bearer ${token}`
            } 
        })
    } catch (error) {
        expect(error.response.status).toBe(401)
        expect(error.response.data.message).toBe("User not authorized")
    }
})
test("The user is admin should return array of object",async () => {
    const loginResponse = await axios.post("http://localhost:5000/api/users/login",{
        username: "admin",
        password: "admin123"
    })

    const token = loginResponse.data.data.token

    const response = await axios.get("http://localhost:5000/api/mahasiswa/all",{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    expect(response.status).toBe(200)
    expect(response.data.data[0]).toHaveProperty("name")
    expect(response.data.data[0]).toHaveProperty("nim")
    expect(response.data.data[0]).toHaveProperty("prodi")
    expect(response.data.data[0]).toHaveProperty("alamat")
    expect(response.data.data[0]).toHaveProperty("gol_darah")
    expect(response.data.data[0]).toHaveProperty("pas_foto")
    expect(response.data.data[0]).toHaveProperty("jenis_kelamin")
})