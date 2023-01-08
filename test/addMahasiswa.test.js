const axios = require("axios")
const MockAdapter = require("axios-mock-adapter")

test("User did not fill the name field should return an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/mahasiswa/add",{
                    nim : "F1G119031",
                    prodi : "Ilmu Komputer",
                    alamat : "Jl Raya Sedati",
                    gol_darah : "O",
                    jenis_kelamin : "L"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})
test("User did not fill the nim field should return an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/mahasiswa/add",{
                    name : "F1G119031",
                    prodi : "Ilmu Komputer",
                    alamat : "Jl Raya Sedati",
                    gol_darah : "O",
                    jenis_kelamin : "L"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})
test("User did not fill the prodi field should return an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/mahasiswa/add",{
                    name : "F1G119031",
                    nim : "F1G119031",
                    alamat : "Jl Raya Sedati",
                    gol_darah : "O",
                    jenis_kelamin : "L"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})
test("User did not fill the alamat field should return an error",async () => {
    try {
        await axios.post("http://localhost:5000/api/mahasiswa/add",{
                    name : "F1G119031",
                    nim : "F1G119031",
                    prodi : "Ilmu Komputer",
                    gol_darah : "O",
                    jenis_kelamin : "L"
        })
    } catch (error) {
        expect(error.response.status).toBe(400)
        expect(error.response.data.message).toBe("The field cannot be blank")
    }
})
test("User add mahasiswa should return an object",async () => {
    const mock = new MockAdapter(axios)

    mock.onPost("http://localhost:5000/api/mahasiswa/add").reply(200)

        const response = await axios.post("http://localhost:5000/api/mahasiswa/add",{
                    name : "F1G119031",
                    nim : "F1G119031",
                    prodi : "Ilmu Komputer",
                    alamat: "Jl Raya Sedati",
                    gol_darah : "O",
                    jenis_kelamin : "L"
        })

        expect(response.status).toBe(200)
})
