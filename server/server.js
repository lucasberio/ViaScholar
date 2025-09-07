import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { startRecsJob } from './cron_jobs/updateScholarships.js'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 5000;

app.get(`/api/get_feedback`, async (req, res) => {

});

app.listen(PORT, () => {
	console.log("Started on Port: 5000")
    startRecsJob()
})