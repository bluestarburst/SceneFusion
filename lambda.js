import * as https from 'https';
import * as fs from 'fs';

export const handler = async (event) => {
	const URL = "https://18.116.150.166:443/scene";
    
    // get key.pem from local directory
    const key = fs.readFileSync('./key.pem');
    const cert = fs.readFileSync('./cert.pem');

    const agent = new https.Agent({
        rejectUnauthorized: false,
        key: key,
        cert: cert,
    });

    // run fetch post request to flask server
    const flask = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
        agent: agent,
    });

	// TODO implement
	const response = {
		statusCode: 200,
		body: JSON.stringify("Hello from Lambda!"),
	};
	return response;
};
