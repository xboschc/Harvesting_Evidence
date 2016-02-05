
/**
 *
 * cookijar -> http://www.lalit.org/lab/jsoncookies
 * prototype api -> http://www.prototypejs.org/api
 */


function tx_caglonglists_init(event) {
	tx_caglonglists_jar = new CookieJar({
		expires:3600,
		path: '/'
	});
	
	// get stored states
	$$('th.groupLinkColumn').each(
		function(item) {
			Event.observe(item, 'click', tx_caglonglists_switchGroup);
			var state = tx_caglonglists_jar.get(item.id);
			if(state == 'closed') {
				tx_caglonglists_closeGroup(item);
			}
		}
	);
}

function tx_caglonglists_switchGroup(event) {
	if(this.colSpan == this.getAttribute('origcolspan')){
		tx_caglonglists_closeGroup(this);
	} else {
		tx_caglonglists_openGroup(this);
	}
}

function tx_caglonglists_closeGroup(groupHeader) {
	// reduce the header of the group
	groupHeader.colSpan = 1;
	
	// close tds in the columsn of the group
	for(var col = parseInt(groupHeader.getAttribute('origstartcol')) + 1; col <= parseInt(groupHeader.getAttribute('origstopcol')); col ++) {
		$$('.Col' + col).each(
			function(item) {
				Element.hide(item)
			}
		);
	}
	
	// save to cookie
	tx_caglonglists_jar.put(groupHeader.id, 'closed');
}

function tx_caglonglists_openGroup(groupHeader) {
	// expand the header of the group
	groupHeader.colSpan = parseInt(groupHeader.getAttribute('origcolspan'));
	
	// open tds in the columsn of the group
	for(var col = parseInt(groupHeader.getAttribute('origstartcol')) + 1; col <= parseInt(groupHeader.getAttribute('origstopcol')); col ++) {
		$$('.Col' + col).each(
			function(item) {
				Element.show(item)
			}
		);
	}
	
	// save to cookie
	tx_caglonglists_jar.put(groupHeader.id, 'open');
}


Event.observe(window, 'load', tx_caglonglists_init);
