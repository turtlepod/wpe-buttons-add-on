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
	 * Create TinyMCE Plugin for Boxes
	 * Modified from Crazy Pills Plugins
	 * http://wordpress.org/extend/plugins/crazy-pills/
	 * ================================================
	 */
	tinymce.create( 'tinymce.plugins.wpe_addon_buttons', {

		/* Load inline setting on editor click */
		init : function( ed, url ) {

			ed.addButton( 'wpe_addon_buttons', {
				type: 'listbox',
				text: 'Buttons',
				classes: 'btn widget fixed-width',
				icon: false,
				onselect: function(e) {}, 
				values: [
					{text: 'White', onclick : function() {
						var sel_txt = false;
						var sel_content = sel_txt = tinyMCE.activeEditor.selection.getContent();
						if ( sel_txt !== '' ) {
							sel_content = '<a href="#" class="wpe-button wpe-button-white">' + sel_txt + '</a>';
						} else {
							sel_content = '<a href="#" class="wpe-button wpe-button-white">Link</a>';
						}
						tinymce.execCommand('mceInsertContent', false, sel_content);
					}},
					{text: 'Black', onclick : function() {
						var sel_txt = false;
						var sel_content = sel_txt = tinyMCE.activeEditor.selection.getContent();
						if ( sel_txt !== '' ) {
							sel_content = '<a href="#" class="wpe-button wpe-button-black">' + sel_txt + '</a>';
						} else {
							sel_content = '<a href="#" class="wpe-button wpe-button-black">Link</a>';
						}
						tinymce.execCommand('mceInsertContent', false, sel_content);
					}},
					{text: 'Red', onclick : function() {
						var sel_txt = false;
						var sel_content = sel_txt = tinyMCE.activeEditor.selection.getContent();
						if ( sel_txt !== '' ) {
							sel_content = '<a href="#" class="wpe-button wpe-button-red">' + sel_txt + '</a>';
						} else {
							sel_content = '<a href="#" class="wpe-button wpe-button-red">Link</a>';
						}
						tinymce.execCommand('mceInsertContent', false, sel_content);
					}},
					{text: 'Green', onclick : function() {
						var sel_txt = false;
						var sel_content = sel_txt = tinyMCE.activeEditor.selection.getContent();
						if ( sel_txt !== '' ) {
							sel_content = '<a href="#" class="wpe-button wpe-button-green">' + sel_txt + '</a>';
						} else {
							sel_content = '<a href="#" class="wpe-button wpe-button-green">Link</a>';
						}
						tinymce.execCommand('mceInsertContent', false, sel_content);
					}},
					{text: 'Blue', onclick : function() {
						var sel_txt = false;
						var sel_content = sel_txt = tinyMCE.activeEditor.selection.getContent();
						if ( sel_txt !== '' ) {
							sel_content = '<a href="#" class="wpe-button wpe-button-blue">' + sel_txt + '</a>';
						} else {
							sel_content = '<a href="#" class="wpe-button wpe-button-blue">Link</a>';
						}
						tinymce.execCommand('mceInsertContent', false, sel_content);
					}},
				]
			});
		},

		/**
		 * Creates control instances based in the incomming name.
		 */
		createControl: function (n, cm) {
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
				version : "0.1.1"
			};
		}
	});

	tinymce.PluginManager.add( 'wpe_addon_buttons', tinymce.plugins.wpe_addon_buttons );
})();