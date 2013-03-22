Menu
====

Nested menu

<p align="center">
  <img src="https://raw.github.com/kaerus-component/menu/master/screenshot.png"/>
</p>

```html
<!doctype html>
<head>
	<title>Top header menu</title>
	<link rel="stylesheet" href="../build/build.css" />
	<link rel="stylesheet" href="./stylesheet.css" />
</head>
<body>
	<header>
		<div id="menu"></div>
	</header>
	<script src="../build/build.js"></script>
	<script>
		var Menu = require('menu');

		var items = [
			{caption:"Test",child:[
				{caption:"Something",id:"something",target:"something.html",shortcut:"[META]S"},
				{caption:"Open File",id:"fileopen",shortcut:"[CTRL]O"},
				{caption:"Third",child:[
					{caption:"Fourth",target:"fourth.html",shortcut:"[ALT]F"},
					{caption:"Fifth",target:"fifth.html",shortcut:"[SHIFT]F"}
				]}
			]}
		];	

		var header_menu = new Menu('menu'); 
		header_menu.show(items);
	</script>
</body>
</html>
```