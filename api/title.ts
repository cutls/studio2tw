import axios from 'axios'
import cheerio from 'cheerio'
import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

export const handler: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
	const params = event.queryStringParameters
	const url = params.url
	try {
		const { data } = await axios.get(url)

		const $ = cheerio.load(data)
		const title = $('title').text()
		return {
			headers: {
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'OPTIONS,POST',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			statusCode: 200,
			body: JSON.stringify({ success: true, title })
		}
	} catch (e) {
		return {
			headers: {
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Methods': 'OPTIONS,POST',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			statusCode: 500,
			body: JSON.stringify({ success: false })
		}
	}

}