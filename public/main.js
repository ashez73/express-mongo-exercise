let update = document.getElementById('update')
update.addEventListener('click',	event	=>	{
	let source = document.getElementsByTagName('input')[0].value
	let message = document.getElementsByTagName('input')[1].value
	fetch('message', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': source,
    'message': message
  })
}).then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
})
})
