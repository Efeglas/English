export function load({ cookies }) {
	
    const username = cookies.get('username');
    
    return {
		username: username
	};
}