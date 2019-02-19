<?php
/*
 * StoryBox Template Plugin
 */  
get_header();

$image_path = plugin_dir_url( __FILE__ ) . "public/img/";
?>

<div class="content">
  	<div class="left">

		<?php
		if ( has_post_thumbnail() ){
			echo '<div class="featuredimage">';
			the_post_thumbnail('full');
			echo '</div>';
		}
		echo "<h1 style='padding-top:30px'>".get_the_title()."</h1>";
		?>

		<!-- ##MAINFILE## -->

  	</div><!--end .left-->
  
	<div class="right">
		<?php include 'tenacitysidebar.php'; ?>
	</div>

</div><!--end .content-->

<?php get_footer(); ?>