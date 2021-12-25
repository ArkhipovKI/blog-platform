
export default class BlogApiService {
	constructor() {
	  this.API_BASE = 'https://cirosantilli-realworld-next.herokuapp.com/api/';
	  this.getPosts = async (token) => {
		const response = await fetch(`${this.API_BASE}articles`,{
			method: 'GET',
			headers: {
				Authorization: `Token ${token}`,
				'Content-Type': 'application/json',
		}});
		const body = await response.json();
 
		return body;
	  };


	  this.followArticle = async (token, slug, followed) => {
			const response = await fetch(`${this.API_BASE}articles/${slug}/favorite`, {
				method: followed ? 'DELETE' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Token ${token}`
				}
			})
			const body = await response.json();
			
			return body;
		}
		this.loginUser = async (user) => {
				const response = await fetch(`${this.API_BASE}users/login`, {
				method: 'POST',
				body: JSON.stringify({
					user,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				})
				return response.json();
		}
		this.signUp = async (user) => {
			const response = await fetch(`${this.API_BASE}users`, {
				method: 'POST',
				body: JSON.stringify({
					user,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			return response.json();
		}
	}
 }
 