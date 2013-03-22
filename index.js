function Menu(target) {
	if(target) this.target(target);
}

Menu.prototype.target = function(elem){
	if(typeof elem === 'string')
		this.elem = document.getElementById(elem);
	else this.elem = elem;

	return this;
};

var keymap = {
	"[CTRL]":"&#94;",	//&#8963;
	"[META]":"&#8984;",
	"[ALT]":"&#8997;",
	"[SHIFT]":"&#8679;",
	"[LEFT]":"&#8592;", 
	"[UP]":"&#8593;", 
	"[RIGHT]":"&#8594;", 
	"[DOWN]":"&#8595;",
	"[CAPSLOCK]":"&#8682;",
	"[ENTER]":"&#8617;",
	"[TAB]":"&#8677;",
	"[SPACE]":"&#9251;",
	"[BSPACE]":"&#9003;",
	"[EJECT]":"&#9167;", 
	"[ESC]":"&#9099;",
	"[SYS]":"&#63743;" //  apple or win symbol 
};

// solid right triangle
var childSym = "&#9654;";

// translates key combination to unicode 
function xlate(keycomb){
	for(var key in keymap){
		if(keycomb.indexOf(key)>=0) { 
			keycomb = keycomb.replace(key,keymap[key]);
		}	
	}

	return keycomb;
}

function render(items,isChild){
	if(!Array.isArray(items)) return '';

	var html = '<ul class="menu">\n', li, caption;

	items.forEach(function(item){
		li = '<li>\n';
		if(item.id) li = li.replace('>\n',' id="' + item.id + '">\n');
		if(isChild) li = li.replace('>\n',' class="child">\n');
		li+= '<div>';
		
		if(isChild && item.child && !item.glyph) item.glyph = childSym;
		if(item.shortcut) {
			var trailing = item.glyph ? '&nbsp;' + item.glyph : '';
			item.glyph = xlate(item.shortcut) + trailing;
		}

		if(item.glyph) li+= '<div class="right"><span class="glyph">' + item.glyph + '</span></div>';

		li+= '<div>';
		caption =  '<span class="caption">' + item.caption + '</span>';
		if(item.icon) li+= '<span class="icon">' + item.icon + '</span>'; 
		if(item.target) li+= '<a href="' + item.target + '">' + caption + '</a>';
		else li+= caption;
		li+= '</div>';	

		li+= '</div>\n';
		
		if(item.child) li+= render(item.child,true);
		
		html+= li + '</li>\n';
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