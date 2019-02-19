<?php
/*
 * Plugin Name: StoryBox Template Plugin
 * Description: Template for StoryBox Template Plugin.
 * Version: 0.1
 * License:
 */

/*
 * Page templater allows us to add page templates if needed.   
 * Add templates to array on line 75 of page_templater.php
 * template paths should be relative to page_templater.php 
 */
include 'page_templater.php'; 

/* 
 * Load CSS and JS for this plugin
 */
function add_inline_script() {
	echo '<script type="text/javascript">';
	echo "var imagePath = \"http://localhost/\";\n";
	echo '</script>';
}
add_action( 'wp_head', 'add_inline_script', 0 );

function storybox_template_scripts(){
	
	wp_register_style( 'storybox-css',  plugin_dir_url( __FILE__ ) . 'public/css/style.min.css' );
	wp_enqueue_style( 'storybox-css' );
	
	wp_register_script( 'storybox-jslibs',  plugin_dir_url(__FILE__) . 'public/js/lib.min.js' );
	wp_enqueue_script( 'storybox-jslibs' );
	
	wp_register_script( 'storybox-jsapp',  plugin_dir_url(__FILE__) . 'public/js/app.min.js' );
	wp_enqueue_script( 'storybox-jsapp' );
}
add_action( 'wp_enqueue_scripts', 'storybox_template_scripts' );

?>
