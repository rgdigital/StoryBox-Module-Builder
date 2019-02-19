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

		<!-- Dependancies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/easing/EasePack.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/ScrollToPlugin.min.js"></script>
<link href="style.min.css" rel="stylesheet" />

<!-- StoryBox Core -->
<script src="https://res.cloudinary.com/rgdigital/raw/upload/v1549037754/StoryBox/core/storybox.min.js"></script>

<!-- Content -->
<p>Lorem ipsum dolor sit amet</p>

<!-- Scripts -->
<script type="text/javascript" src="app.min.js"></script>

<script type="text/javascript">
	var StoryBox = new StoryBox();
</script>

  	</div><!--end .left-->
  
	<div class="right">
		<?php include 'tenacitysidebar.php'; ?>
	</div>

</div><!--end .content-->

<?php get_footer(); ?>