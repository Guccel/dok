# post NULL

^8aab4e

Returns list of all user ids with a given filter method
## req
```
{
	filter: 'all' | 'user' | 'admin';
}
```
## res
|status|meaning|
|-|-|
|200|success|
|400|bad filter| #needsImplementation
```
{
	length: number;
	_ids: string[];
}
```
# get :\_id

^7564db

Get more info on a user by id
## req
```
{
	filter: 'all' | 'basic';
}
```
## res
|status|meaning|
|-|-|
|200|success|
|400|bad filter|
|404|id doesnt exist|
```
{
	[key: string]: any;
}
```
# patch :\_id

^7cb60a

Edits a user by id
## req
```
{
	username?: string;
	email?: string;
	type?: 'user' | 'admin';
}
```
## res
|status|meaning|
|-|-|
|200|success|
|400|bad req| #needsImplementation 
|404|id doesnt exist| #needsImplementation 
# register

^0c2dbd

Creates a user with given data and returns a session id
## req
```
{
	username: string;
	email: string;
	password: string;
}
```
## res
|status|meaning|
|-|-|
|201|created user|
|409|username or email already used|
```
{
	_id: string;
}
```
# login

^6d7751

Logs in a user by creating a session and returning a session id
## req
```
{
	username: string;
	password: string;
}
```
## res
|status|meaning|
|-|-|
|201|logged in successfully|
|231|user exists bad password incorrect|
|404|username not found|
```
{
	_id: string;
}
```