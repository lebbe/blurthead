
$.fn.blurthead = function(optionsOrCommand) {
	if(this.length === 0) return;

	var command = typeof optionsOrCommand === 'string' ? optionsOrCommand : undefined
	,	options = typeof optionsOrCommand === 'object' ? optionsOrCommand : {};

	// Set default options
	options.ms = options.ms || 10;
	options.mouthPlacement = options.mouthPlacement || 100

	// If command is issued, execute command.
	if(command) {
		this.each(function() {
			var blurthead = $(this).data('blurthead');
			switch(command) {
				case 'start':
					if (blurthead.refreshIntervalId) return;
					blurthead.refreshIntervalId = window.setInterval(blurthead.animate, options.ms);
				break;
				case 'stop':
					if (!blurthead.refreshIntervalId) return;
					window.clearInterval(blurthead.refreshIntervalId);
					delete blurthead.refreshIntervalId;
				break;
				/**
				 * Completely remove the widget from DOM and
				 * inserts original image again.
				 */
				case 'destroy':
					if (blurthead.refreshIntervalId)
						window.clearInterval(blurthead.refreshIntervalId);
					blurthead.$canvas.remove();
					$(this).show();
					$(this).data('blurthead', undefined);
				break;
			}
			return;	
		});
		return this;
	}

	// Instantiate the widget on each selected DOM element
	// if no command is given
	this.each(function() {

		var img		= this
		,	$this	= $(this)
		,	src		= this.src
		,	$canvas	= $('<canvas>')
		,	ctx		= $canvas.get(0).getContext('2d')
		,	height	= $this.height()
		,	width	= $this.width()
		,	aboutToOpen = true
		,	angle 	= 0
		,	blurthead = {}
		,	mouthPlacement = options.mouthPlacement;

		// Set up blurthead helper object
		blurthead.$canvas = $canvas;
		$this.data('blurthead', blurthead);

		// Setup and insert canvas
		$canvas
			.attr('height', height)
			.attr('width', width)
			.insertAfter($this)
			// Copy style and style classes from image to canvas.
			// Canvas should behave stylistically like the image.
			// Use 'img.class' if you specificall want to target image.
			.attr('class', $(img).attr('class'))
			.attr('style', $(img).attr('style'))

		// Hide image
		$this.hide();

		/**
		 * This is the animation.
		 */
		blurthead.animate = function animate() {
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
		}

		// Animate blurting
		blurthead.refreshIntervalId = window.setInterval(blurthead.animate, options.ms);
	});
	return this;
};
