$(document).ready(function() {
	console.log('ok');
	const Url = 'http://localhost:3000/wow';
	$('.btn').click(function() {
		console.log('lol');
		$.ajax({
			url: Url,
			type: "GET",
			success: function(result) {
				result = JSON.parse(result);
				for(var i = 0;i < result.length;i++) {
					 var txt3 = document.createElement("input");
					 var label = document.createElement('label');
					 txt3.type = 'checkbox';
					 label.id = 'lbl' + i;
					 $('#lbl' + i).append(txt3);
					 $('#lbl' + i).append(result[i].subjectCode);
					$('.form1').after(label);
				}
			},
			error: function(error) {
				console.log(`Error ${error}`)
			}
		})
	})
})