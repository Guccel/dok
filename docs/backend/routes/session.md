# verify :\_id

^22b42b

Checks if session currently exists
## res
|status|meaning|
|-|-|
|200|session exists|
|400|bad slug|
|404|session does not exist|
# get-data :\_id

^39d9fc

Gets data for a specific session id
## res
|status|meaning|
|-|-|
|200|session exists|
|400|bad slug|
|404|session does not exist|
```
{
	[key: string]: any;
}
```