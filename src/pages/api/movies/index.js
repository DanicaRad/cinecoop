// show details about a single movie

import fetch from 'node-fetch';

const BASE_URL = 'https://api.themoviedb.org/3';
const settings = `language=en-US&pages=1`;
const options = {
	method: 'GET',
	headers: {
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmE5NzUzNjFkZjI4YTU4Yjc5MjY2NjFjNGQ4NWJiNyIsInN1YiI6IjYzZmZlYTc0Njk5ZmI3MDA4Nzc0YjA1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M0J3cxmab34KgPpdft4ZBf3bQ13wFkb_M-6Y2d0-MBc'
	}
};

export default async function handler (req, res) {
	if (req.query) return searchHandler(req, res);
	if (req.method === 'GET') {
		getHandler(req, res);
	} else {
		return res.status(400).send({ message: 'forbidden method' });
	}
}

async function getHandler (req, res) {
	try {
		const results = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, options);
		const data = await results.json();
		return res.send({ data });
	} catch (err) {
		console.error('API Error:', err);
		return res.status(500).send({ err });
	}
}

async function searchHandler (req, res) {
	try {
		const { title } = req.query;
		console.log('title', title);
		const result = await fetch(
			`${BASE_URL}/search/movie?query=${title}&include_adult=false&language=en-US&page=1`,
			options
		);
		const data = await result.json();
		return res.send({ data });
	} catch (err) {
		console.error('Api error', err);
		return res.status(500).send({ err });
	}
}
