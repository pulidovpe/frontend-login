export interface JwtResponse {
	dataUser: {
		id: number,
		name: string,
		email: string,
		accessToken: string,
		expiresIn: string
	}
}