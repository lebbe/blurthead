$.fn.blurthead = function() {
	var img		=	this.get(0)
	,	src		= this.attr('src')
	,	options	= this.data('blurthead')
	,	$canvas	= $('<canvas>')
	,	ctx		= $canvas.get(0).getContext('2d')
	,	height	= this.height()
	,	width	= this.width()
	,	mouthPlacement = 100
	,	aboutToOpen = true
	,	angle 	= 0
	,	ms	= 10;

	// Setup and insert canvas
	$canvas
		.attr('height', height)
		.attr('width', width)
		.insertAfter(this);

	// Remove image from DOM
	this.remove();

	// Find options
	if(options && options.indexOf(';') !== -1) {
		options = options.split(';');
		for(var i = 0; i < options.length; i++) {
			var pair = options[i].split(':')
			,	option = pair[0].trim()
			,	value = pair[1];
			switch(option) {
				case 'mouthPlacement':
					mouthPlacement = parseInt(value);
				break;
				case 'ms':
					ms = parseInt(value);
				break;
			}
		}
	}

	// Animate blurting
	window.setInterval(function() {
		if(aboutToOpen) {
			if(angle === 9) {
				aboutToOpen = false;
			}
			angle++;
		} else {
			if(angle === 1) {
				aboutToOpen = true;
			}
			angle--;
		}
		ctx.save();
		ctx.clearRect(0, 0, width, height);
		// Rotate for top of head
		ctx.translate(0, mouthPlacement);
		ctx.rotate(-angle*Math.PI/180);
		ctx.translate(0, -mouthPlacement);

		// draw top of head into canvas
		ctx.drawImage(img, 0, 0, width, mouthPlacement, 0, 0, width, mouthPlacement);
		ctx.restore();


		ctx.save();
		// Rotate for bottom of head

		ctx.translate(0, mouthPlacement);
		ctx.rotate(angle*Math.PI/180);
		ctx.translate(0, -mouthPlacement);
		// draw bottom of head into canvas
		ctx.drawImage(img, 0, mouthPlacement, width, height - mouthPlacement, 0, mouthPlacement, width, height - mouthPlacement);
		ctx.restore();
	}, ms);
};
