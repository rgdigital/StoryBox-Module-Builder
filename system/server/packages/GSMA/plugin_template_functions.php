<?php
/*
 * Plugin Name: <!--##TEMPLATENAME##-->
 * Description: <!--##TEMPLATEDESC##-->
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
function inline_script_<!--##TEMPLATESHORTNAME##-->() {
	echo '<script type="text/javascript">';
	echo "var imagePath = \"<!--##BASEURL##-->\";\n";
	echo '</script>';
}
add_action( 'wp_head', 'inline_script_<!--##TEMPLATESHORTNAME##-->', 0 );

function template_script_<!--##TEMPLATESHORTNAME##-->(){
	
	wp_register_style( 'storybox-css',  plugin_dir_url( __FILE__ ) . 'public/css/style.min.css' );
	wp_enqueue_style( 'storybox-css' );
	
	wp_register_script( 'storybox-jslibs',  plugin_dir_url(__FILE__) . 'public/js/lib.min.js' );
	wp_enqueue_script( 'storybox-jslibs' );
	
	wp_register_script( 'storybox-jsapp',  plugin_dir_url(__FILE__) . 'public/js/app.min.js' );
	wp_enqueue_script( 'storybox-jsapp' );
}
add_action( 'wp_enqueue_scripts', 'template_scripts_<!--##TEMPLATESHORTNAME##-->' );

?>
