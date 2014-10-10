blurthead
=========

Create a blurty head out of an img-tag with html5 canvas and jquery

It is very easy to use blurthead. It converts your favorite portret of yourself into a blurty head. All you need is to insert your picture into any web-page with the html <img> tag, add the attribute 'data-blurthead' and initialize the blurty behaviour by running some javascript initalization code.


HTML:

```HTML
<img src="head.gif" data-blurthead>
```

JavaScript initialization:

```JavaScript
// Initialize the blurters like this.
$(function() {
	$('img[data-blurthead]').blurthead({
		mouthPlacement: 100,
		ms: 40
	});
});
```

Options:

You may provide options as a JS object to the .blurthead jQuery function. Currently available options are 'ms' which says how slow/fast the animation is running (higher number = slower animation), and 'mouthPlacement' denoting where the mouth is placed in pixels counting from the top.


Methods:

You can start and stop the animation, and destroy the blurthead widget, like this:

```JavaScript
// Initialize the blurters like this.
$('img[data-blurthead]').blurthead(methodname);
```

Where methodname is 'start', 'stop' or 'destroy'.
