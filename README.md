blurthead
=========

Create a blurty head out of an img-tag with html5 canvas and jquery

It is very easy to use blurthead. It converts your favorite portret of yourself into a blurty head. All you need is to insert your picture into any web-page with the html <img> tag, add the attribute 'data-blurthead' and initialize the blurty behaviour by running some javascript initalization code.


HTML:

```HTML
<img src="head.gif" data-blurthead="mouthPlacement: 100; ms: 40;">
```

JavaScript initialization:

```JavaScript
// Initialize the blurters like this.
$(function() {
	$('img[data-blurthead]').blurthead();
});
```

Options:

You may provide options within the data-blurthead html property in the <img>-tag. Currently available options are 'ms' which says how slow/fast the animation is running (higher number = slower animation), and 'mouthPlacement' denoting where the mouth is placed in pixels counting from the top.
