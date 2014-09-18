<?php
/**
 * Plugin Name: WP Editor Buttons Add-on
 * Plugin URI: https://wp-editor.com
 * Description: Power Up WordPress Visual Editor With Buttons
 * Version: 0.1.1
 * Author: David Chandra Purnama
 * Author URI: http://shellcreeper.com/
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU 
 * General Public License version 2, as published by the Free Software Foundation.  You may NOT assume 
 * that you can use any other version of the GPL.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without 
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * @package WPE_Addon_Buttons
 * @version 0.1.1
 * @author David Chandra Purnama <david@shellcreeper.com>
 * @copyright Copyright (c) 2013, David Chandra Purnama
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */
class WPE_Addon_Buttons{

	/**
	 * Class Constructor.
	 * @since  0.1.0
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'setup' ), 1 );
		add_action( 'plugins_loaded', array( $this, 'wpe_addon_setup' ), 10 );
		add_action( 'init', array( $this, 'updater_setup' ), 10 );
	}

	/**
	 * Setup ID, Version, Directory path, and URI
	 * @since  0.1.0
	 */
	public function setup() {
		$this->id = 'wpe_addon_buttons';
		$this->version = '0.1.1';
		$this->directory_path = trailingslashit( plugin_dir_path( __FILE__ ) );
		$this->directory_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );
	}

	/**
	 * Setup plugins functions
	 * @since  0.1.0
	 */
	public function wpe_addon_setup() {

		/* Language */
		load_plugin_textdomain( $this->id, false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

		/* Register TinyMCE External Plugins */
		add_filter( 'mce_external_plugins', array( $this, 'register_mce_external_plugins' ) );

		/* Add button to TinyMCE button 4th Row */
		add_filter( 'mce_buttons_4', array( $this, 'mce_add_buttons' ), 1, 2 );

		/* Add CSS to TinyMCE Editor */
		add_filter( 'mce_css', array( $this, 'editor_css' ) );

		/* Enqueue stylesheets on front end. */
		add_action( 'wp_enqueue_scripts', array( $this, 'front_css' ), 1 );
	}

	/**
	 * Register MCE External Plugins
	 * @since 0.1.0
	 */
	public function register_mce_external_plugins( $plugins ){

		/* tinyMCE version */
		global $tinymce_version;

		/* WP 3.8 with tinyMCE 3 */
		if ( version_compare( $tinymce_version, '400', '<' ) ) {
			$plugins[$this->id] = $this->directory_uri . "js/mce-plugin.js";
		}

		/* WP 3.9 with tinyMCE 4 */
		else{
			$plugins[$this->id] = $this->directory_uri . "js/mce-plugin-4.js";
		}

		return $plugins;
	}

	/**
	 * Add button to 4th row in editor
	 * @since 0.1.0
	 */
	public function mce_add_buttons( $buttons, $editor_id ){

		/* Filterable editor ids */
		$editor_ids = apply_filters( $this->id . '_editor_ids', array( 'content' ) );

		/* if editor do not have this feature, return */
		if ( !is_array( $editor_ids ) ){
			return $buttons;
		}
		if ( !in_array( $editor_id, $editor_ids ) ){
			return $buttons;
		}

		/* Add button */
		array_push( $buttons, $this->id );
		return $buttons;
	}

	/**
	 * MCE/Editor CSS
	 * @since 0.1.0
	 */
	public function editor_css( $mce_css ){

		/* CSS File */
		$file = $this->directory_uri . "css/editor.css";

		/* Use theme stylesheet if available  */
		if ( file_exists( trailingslashit( get_stylesheet_directory() ) . $this->id . "-editor.css" ) ){
			$file = trailingslashit( get_stylesheet_directory_uri() ) . $this->id . "-editor.css";
		}

		/* Add Editor Style If needed */
		if ( apply_filters( $this->id . '_load_editor_css', true ) ){
			$mce_css .= ', ' . $file;
		}
		return $mce_css;
	}

	/**
	 * Front-end CSS
	 * @since 0.1.0
	 */
	public function front_css(){

		/* CSS File */
		$file = $this->directory_uri . "css/front.css";

		/* Use theme stylesheet if available  */
		if ( file_exists( trailingslashit( get_stylesheet_directory() ) . $this->id . "-front.css" ) ){
			$file = trailingslashit( get_stylesheet_directory_uri() ) . $this->id . "-front.css";
		}

		/* Enqueue stylesheet if needed */
		if ( apply_filters( $this->id . '_load_front_css', true ) ){
			wp_enqueue_style( $this->id, $file, null, $this->version );
		}
	}

	/**
	 * Load Updater Class
	 * @since 0.1.0
	 */
	public function updater_setup(){

		/* Load Plugin Updater */
		require_once( $this->directory_path . 'includes/plugin-updater.php' );

		/* Updater Config */
		$config = array(
			'base'      => plugin_basename( __FILE__ ), //required
			'repo_uri'  => 'http://repo.shellcreeper.com/',  //required
			'repo_slug' => 'wpe-buttons-add-on',  //required
		);

		/* Load Updater Class */
		new WPE_Buttons_Plugin_Updater( $config );
	}
}

new WPE_Addon_Buttons();
