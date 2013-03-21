function Menu(target) {
	if(target) this.target(target);
}

Menu.prototype.target = function(elem){
	if(typeof elem === 'string')
		this.elem = document.getElementById(elem);
	else this.elem = elem;

	return this;
};

function compare(a,b){
    return a > b ? 1 : a < b ? -1 : 0;
}

function render(items,isChild){
	if(typeof items !== 'object') return '';

	/* order items by position */
	var keys = Object.keys(items).map(function(pos){
		return parseInt(pos,10);
	}).sort(compare);

	var html = '<ul class="menu">\n', row;

	keys.forEach(function(item){
		item = items[item];
		html+= (isChild ? '<li class="child">\n' : '<li>\n');
		html+= '<span>';
		
		row = '';

		if(item.glyph) row+= '<span class="glyph">' + item.glyph + '</span>';
		if(item.caption) row+= '<span class="caption">' + item.caption + '</span>';
		if(item.shortcut) row+= '<span class="shortcut">' + item.shortcut + '</span>';	
		if(item.target) html+= '<a href="' + item.target + '">' + row +'</a>';
		else html+= row;

		html+= '</span>\n';
		
		if(item.child) html+= render(item.child,true);
		
		html+= '</li>\n';
	});

	html+= '</ul>\n';

	return html;
}

Menu.prototype.show = function(items){
	/* default target container is #menu */
	if(!this.elem) {
		this.target('menu');
	};

	var html = render(items);

	this.elem.innerHTML = html;

	return this;
};


module.exports = Menu;