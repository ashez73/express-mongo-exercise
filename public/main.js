let update = document.getElementById('update')
update.addEventListener('mousedown',	event	=>	{
	let res = event.target
	console.log(res.parentElement.dataset.name)
	fetch('message', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': res.parentElement.dataset.name,
    'message': 'I find your lack of faith disturbing.'
  })
})
})
