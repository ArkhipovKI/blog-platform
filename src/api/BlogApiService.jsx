
export default class BlogApiService {
	constructor() {
	  this.API_BASE = 'https://cirosantilli-realworld-next.herokuapp.com/api/';

	  this.getApi = async (url, methodUrl, token, bodyUrl) => {
		  return await fetch(`${this.API_BASE}${url}`,{
				method: methodUrl,
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bodyUrl)
		  })
	  }

	  this.getPosts = async (token) => {
			const body = await this.getApi('articles', 'GET', token)
			return body.json();
	  };

	  this.followArticle = async (token, slug, followed) => {
			let method = followed ? 'DELETE' : 'POST';
			const body = await this.getApi( `articles/${slug}/favorite`, method, token);
			return body.json();
		}

		this.loginUser = async (user) => {
				const body = await this.getApi('users/login', 'POST', '', {user})
				return body.json(); 
		}

		this.signUp = async (user) => {
			const body = await this.getApi('users', 'POST', '', {user})
			return body.json();
		}

		this.createPost = async (article, token) => { 
			this.getApi('articles', 'POST', token, {article})
		}

		this.editPost = async (article, token, slug) => {
			this.getApi(`articles/${slug}`, 'PUT', token, {article})
		}

		this.deleteArticle = async (token, slug) => {
			this.getApi(`articles/${slug}`, 'DELETE', token)
		}

		this.setEditUser = async (user, token) => {
			this.getApi('/user', 'PUT', token, {user})
		}
 	}
}
 