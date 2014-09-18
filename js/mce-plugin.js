/**
 * WP Editor Buttons Addon
 * 
 * @author    David Chandra Purnama <david@shellcreeper.com>
 * @copyright Copyright (c) 2013, David Chandra Purnama
 * @link      http://my.wp-editor.com
 * @link      http://shellcreeper.com
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

(function(){

	/**
	 * ================================================
	 * Clean Up Buttons
	 * ================================================
	 */
	function wpe_buttons_cleanup( ed, url ){
		/* Editor var */
		var editor_id = tinyMCE.activeEditor.editorId;
		var editor_content = jQuery( '#' + tinyMCE.activeEditor.editorId + '_ifr' ).contents();

		/* Clean Span Wrap */
		var get_content = editor_content.find('span.wpe-button').html();
		editor_content.find('span.wpe-button').after( get_content );
		editor_content.find('span.wpe-button').remove();
	};

	/**
	 * ================================================
	 * Create TinyMCE Plugin for Boxes
	 * Modified from Crazy Pills Plugins
	 * http://wordpress.org/extend/plugins/crazy-pills/
	 * ================================================
	 */
	tinymce.create( 'tinymce.plugins.wpe_addon_buttons', {

		/* Load inline setting on editor click */
		init : function( ed, url ) {
			/* Clean Up  */
			ed.onInit.add( function( ed, e ) {
				wpe_buttons_cleanup( ed, url );
			});
			ed.onEvent.add( function( ed, e ) {
				wpe_buttons_cleanup( ed, url );
			});
		},

		/**
		 * Creates control instances based in the incomming name.
		 */
		createControl: function (n, cm) {
			switch(n) {
			case 'wpe_addon_buttons':
				var wpe_buttons_option = cm.createListBox( 'wpe_addon_buttons', {
					title: 'Buttons',
					onselect: function (v) {
						tinyMCE.activeEditor.focus();
						var sel_txt = tinyMCE.activeEditor.selection.getContent();
						if( '' == sel_txt ) sel_txt = "Link";
						tinyMCE.activeEditor.execCommand( 'mceInsertContent', false, '<a href="#" class="wpe-button wpe-button-' + v + '">' + sel_txt + '</a>');
					}
				});
				wpe_buttons_option.add( 'White Button', 'white' );
				wpe_buttons_option.add( 'Black Button', 'black' );
				wpe_buttons_option.add( 'Red Button', 'red' );
				wpe_buttons_option.add( 'Green Button', 'green' );
				wpe_buttons_option.add( 'Blue Button', 'blue' );
				return wpe_buttons_option;
			}
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 */
		getInfo : function() {
			return {
				longname : "WP Editor Buttons",
				author : "David Chandra Purnama",
				authorurl : 'http://shellcreeper.com',
				infourl : 'http://wp-editor.com',
				version : "0.1.0"
			};
		}
	});

	tinymce.PluginManager.add( 'wpe_addon_buttons', tinymce.plugins.wpe_addon_buttons );
})();