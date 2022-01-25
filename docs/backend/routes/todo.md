# post NULL
Grabs all todo ids
## req
```
{
	filter: ?type<String>;
}
```
## res
|status|meaning|
|-|-|
|200|success|
|400|bad filter|
```
{
	length: number;
	_ids: string[];
}
```