module.exports = {
	detectLabels: async function(url, callback) {
		// Imports the Google Cloud client library
		const vision = require('@google-cloud/vision')

		// Creates a client
		const client = new vision.ImageAnnotatorClient()

		// Performs label detection on the image file
		const [result] = await client.labelDetection(url)
		const labels = result.labelAnnotations
		console.log(`Labels found in ${url}:`)
		labels.forEach((label) => console.log(label.description))
		callback(labels)
	},
}
