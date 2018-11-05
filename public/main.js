let method
document.addEventListener('click',	event	=>	{
	let name = document.getElementsByTagName('input')[0].value
	let message = document.getElementsByTagName('input')[1].value
	if (event.target.id === 'update'||event.target.id === 'delete'){
		method = event.target.id ==='update'? 'put' : 'delete'
		fetch('message', {
	  	method,
	  	headers: {'Content-Type': 'application/json'},
	  	body: JSON.stringify({
	    name,
	    message
	  	})
		}).then(res => {
	  	if (res.ok) return res.json()
		})
		.then(data => {
	  console.log(data)
	  window.location.reload(true)
		})
	}
})
