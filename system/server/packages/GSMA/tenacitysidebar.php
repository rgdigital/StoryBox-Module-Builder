<?php
/*
 * Tenacity Built gsma.com sidebar
 */
?>
          <div id="cl_desk">
          <div class="box">
            <?php if(is_front) { ?>
                <style>
                  .side_menu{margin: 0 0 30px 0;}
                </style>
              <?php } ?>
        <?php



        $defaults = array(
          'theme_location'  => '',
          'menu'            => '',
          'container'       => 'div',
          'container_class' => 'side_menu',
          'container_id'    => '',
          'menu_class'      => 'top_one',
          'menu_id'         => '',
          'echo'            => true,
          'fallback_cb'     => false,
          'before'          => '',
          'after'           => '',
          'link_before'     => '',
          'link_after'      => '',
          'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
          'depth'           => 0,
          'walker'          => ''



        );

        wp_nav_menu( $defaults );
        ?>

                <!-- <hr class="separation" /> -->

                <?php  /*

                $defaults = array(
                  'theme_location'  => '',
                  'menu'            => 'Search Internet of Things',
                  'container'       => 'div',
                  'container_class' => 'select_search',
                  'container_id'    => '',
                  'menu_class'      => 'searchmenu',
                  'menu_id'         => '',
                  'echo'            => true,
                  'fallback_cb'     => false,
                  'before'          => '',
                  'after'           => '',
                  'link_before'     => '',
                  'link_after'      => '',
                  'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                  'depth'           => 0,
                  'walker'          => ''



                );

                wp_nav_menu( $defaults );  */

                ?>
            </div>
          </div>




<?php
if(is_page('mobile-iot-initiative')){ ?>
     
            <div class="box">
              <div class="half">
                  <a href="<?php bloginfo('template_directory'); ?>/video-accelerating-the-iot-with-low-power-wide-area-networks/" class="box_child MIoT_video">
                      <div class="cover_bg"></div>
                      <h2>Video: Accelerating the IoT through LPWA networks</h2>
                      <img class="box_arow" src="<?php bloginfo('template_directory'); ?>/images/box_arrow_red.png"  />
                    </a>
                </div> 

               <div class="half">
                  <a href="<?php bloginfo('template_directory'); ?>/mobile-internet-of-things-industry-paper/" class="box_child Mobile_IoT_paper">
                      <div class="cover_bg"></div>
                      <h2>Mobile IoT Industry paper</h2>
                        <img class="box_arow" src="<?php bloginfo('template_directory'); ?>/images/box_arrow_red.png"  />
                    </a>
                </div>
            </div>
            
<?php } ?>


<?php
// private resources logout
if(is_page('private-resources')){
  if (is_user_logged_in())
  {
  $avatar = get_avatar( get_current_user_id(), 16 );

  echo '<div class="box side_login"> <div class="child">
  <h2 style="color:#C52135;">Howdy <span style="color:#000;font-family: proxima_nova_condensedlight,Arial,Helvetica,sans-serif;font-size: 30px; font-weight: normal; float:none; position:relative;">'.wp_get_current_user()->display_name .'<div style="width:auto; margin-left:5px;position: absolute; right: -25px;top: 8px;border-color: #FFFFFF; border-style: solid; border-width: 2px 2px 3.2px;box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);  margin: -2px 0 0 -2px;padding: 0;">'. $avatar.'</div></span></h2>';

?>

     <a class="logout" href="<?php echo wp_logout_url( get_permalink() ); ?>">Logout</a>

    </div>
    </div>

<?php
  }
  else
  {
    echo '<div class="box side_login" style="padding-bottom:0 !important;margin-bottom:-100% !important;;margin-top:0 !important;"></div>';
  }

}
?>

  
    
      <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('box-overview-widget') ) : ?>
    <?php endif; ?>

    <?php
            if(is_page('resources')) { ?>
              
                <div class="box homeres_box"> 
              <div class="box_child">   
                      
                        <div class="widget_header">
                            <a href="<?php echo get_option('home'); ?>/news"><span class="widget_name"><img class="widget_icon" src="<?php bloginfo('template_directory'); ?>/images/Blog_News_icon_small.png" />Industry News</span></a> 
                            
                            <a class="widget_prev" href="#"></a>
                          <a class="widget_next" href="#"></a>              
                        </div>
                        
                     
                         <?php
             
             $args_blog = array(
                'post_type' => array( 'post', 'page', 'news', ),
                'posts_per_page' =>6,
              'tag__in' => '54',
              'post_status' => 'publish',             
              'orderby' => 'date',  
                'order' => 'desc',
             );
             $loop_blog=new WP_Query($args_blog);
             $x = 0 ;
             while( $loop_blog->have_posts() ) : $loop_blog->the_post();
             $x++;
             ?>
                         
                         <div class="widget_inner <?php if ($x=="1"){echo "active_widget test_harshanie"; } ?>">               
                                <p class="widget_cont">  
                            
                                <span class="widget_title">
                                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                                        <?php $the_tit = get_the_title(); echo substr($the_tit, 0, 75);?>
                                    </a>
                                </span>
                                                         
                                 <?php 
                                    $the_ex = get_the_excerpt(); 
                                    $the_ex = substr($the_ex, 0, 178)."...";               
                                        
                                    echo "<span>".wordwrap($the_ex,100)."</span>";
                                  ?>
                                 
                                </p>
                                <p style="margin-left: 2%;" class="widget_more"><a href="<?php the_permalink();?>">Read more</a> <span class="pipe">|</span> <a href="<?php echo get_option('home'); ?>/news">See all Industry News</a></p>
                                    
                        </div> 
                                       
                        <?php
            endwhile;
            wp_reset_query(); 
            wp_reset_postdata();
                         
             ?>
   
                </div>
             </div>
             
             <div class="box event_box">   
              <div class="box_child">   
                     
                     <div class="widget_header">
                      <a href="<?php echo get_option('home'); ?>/events">
                        <span class="widget_name"><img class="widget_icon" src="<?php bloginfo('template_directory'); ?>/images/Calendar_icon_small.png" />Latest Events</span></a>
                            
                        <a class="widget_prev" href="#"></a>
                        <a class="widget_next" href="#"></a>
                     </div>  
                         <?php
             
             $args_events = array(
                'post_type' => 'tribe_events',
                'posts_per_page' => 6,
              'post_status' => 'publish',             
              'orderby' => 'date',  
                'order' => 'asc',
             );
             $loop_events=new WP_Query($args_events);
             $x = 0 ;
             while( $loop_events->have_posts() ) : $loop_events->the_post();
             $x++;
             ?>
                         
                         <div class="widget_inner <?php if ($x=="1"){echo "active_widget test_harshanie"; } ?>">              
                <p class="widget_cont">  
                            
                            <span class="widget_title">
                              <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                                  <?php $the_tit = get_the_title(); echo substr($the_tit, 0, 60);?>
                                </a>
                            </span>
                            
                            <span class="blog_date"><?php echo tribe_get_start_date( null, false, 'F d, Y'); ?></span>
                                               
                             <?php 
                $the_ex = get_the_excerpt(); 
                $the_ex = substr($the_ex, 0, 168)."...";               
                  
                echo "<span>".wordwrap($the_ex,100)."</span>";
                ?>
                             
                          </p>
                
                            <p style="margin-left: 2%;" class="widget_more"><a href="<?php the_permalink();?>">Read more</a> <span class="pipe">|</span> <a href="<?php echo get_option('home'); ?>/events">See all Internet of Things Events</a></p> 
                        </div> 
                                       
                        <?php
            endwhile;
            wp_reset_query(); 
            wp_reset_postdata();
                         
             ?>
   
                </div>   
            </div>
            
            
            <?php     
      }
      else {
      ?>
            <div class="box homeres_box"> 
              <div class="box_child">   
                      
                        <div class="widget_header">
                            <a href="<?php echo get_option('home'); ?>/resources"<span class="widget_name"><img class="widget_icon" src="<?php bloginfo('template_directory'); ?>/images/Resources_Icon_small.png" />Latest Resources</span> </a>
                            
                            <a class="widget_prev" href="#"></a>
                          <a class="widget_next" href="#"></a>              
                        </div>
                        
                     
                         <?php
             
             $args_blog = array(
                'post_type' => 'post',
                'posts_per_page' =>6,
              'cat' =>131,
              'post_status' => 'publish',             
              'orderby' => 'date',  
                'order' => 'desc',
             );
             $loop_blog=new WP_Query($args_blog);
             $x = 0 ;
             while( $loop_blog->have_posts() ) : $loop_blog->the_post();
             $x++;
             ?>
                         
                         <div class="widget_inner <?php if ($x=="1"){echo "active_widget test_harshanie"; } ?>">               
                                <p class="widget_cont">  
                            
                                <span class="widget_title">
                                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                                        <?php $the_tit = get_the_title(); echo substr($the_tit, 0, 75);?>
                                    </a>
                                </span>
                                                         
                                 <?php 
                                    $the_ex = get_the_excerpt(); 
                                    $the_ex = substr($the_ex, 0, 178)."...";               
                                        
                                    echo "<span>".wordwrap($the_ex,100)."</span>";
                                  ?>
                                 
                                </p>
                                <p style="margin-left: 2%;" class="widget_more"><a href="<?php the_permalink();?>">Read more</a> <span class="pipe">|</span> <a href="<?php echo get_option('home'); ?>/resources">See all Resources</a></p>
                                    
                        </div> 
                                       
                        <?php
            endwhile;
            wp_reset_query(); 
            wp_reset_postdata();
                         
             ?>
   
                </div>
             </div>
             
             <div class="box homeres_box"> 
              <div class="box_child">   
                      
                        <div class="widget_header">
                            <a href="<?php echo get_option('home'); ?>/news"><span class="widget_name"><img class="widget_icon" src="<?php bloginfo('template_directory'); ?>/images/Blog_News_icon_small.png" />Industry News</span> </a>
                            
                            <a class="widget_prev" href="#"></a>
                          <a class="widget_next" href="#"></a>              
                        </div>
                        
                     
                         <?php
             
             $args_blog = array(
                'post_type' => array( 'post', 'page', 'news', ),
                'posts_per_page' =>6,
              'tag__in' => '54',
              'post_status' => 'publish',             
              'orderby' => 'date',  
                'order' => 'desc',
             );
             $loop_blog=new WP_Query($args_blog);
             $x = 0 ;
             while( $loop_blog->have_posts() ) : $loop_blog->the_post();
             $x++;
             ?>
                         
                         <div class="widget_inner <?php if ($x=="1"){echo "active_widget test_harshanie"; } ?>">               
                                <p class="widget_cont">  
                            
                                <span class="widget_title">
                                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                                        <?php $the_tit = get_the_title(); echo substr($the_tit, 0, 75);?>
                                    </a>
                                </span>
                                                         
                                 <?php 
                                    $the_ex = get_the_excerpt(); 
                                    $the_ex = substr($the_ex, 0, 178)."...";               
                                        
                                    echo "<span>".wordwrap($the_ex,100)."</span>";
                                  ?>
                                 
                                </p>
                                <p style="margin-left: 2%;" class="widget_more"><a href="<?php the_permalink();?>">Read more</a> <span class="pipe">|</span> <a href="<?php echo get_option('home'); ?>/news">See all Industry News</a></p>
                                    
                        </div> 
                                       
                        <?php
            endwhile;
            wp_reset_query(); 
            wp_reset_postdata();
                         
             ?>
   
                </div>
             </div>
             
             <div class="box event_box">   
              <div class="box_child">   
                     
                     <div class="widget_header">
                      <a href="<?php echo get_option('home'); ?>/events">
                        <span class="widget_name"><img class="widget_icon" src="<?php bloginfo('template_directory'); ?>/images/Calendar_icon_small.png"  />Upcoming Events</span></a>
                            
                        <a class="widget_prev" href="#"></a>
                        <a class="widget_next" href="#"></a>
                     </div>  
                         <?php
             
             $args_events = array(
                'post_type' => 'tribe_events',
                'posts_per_page' => 6,
              'post_status' => 'publish',             
              'orderby' => 'date',  
                'order' => 'asc',
             );
             $loop_events=new WP_Query($args_events);
             $x = 0 ;
             while( $loop_events->have_posts() ) : $loop_events->the_post();
             $x++;
             ?>
                         
                         <div class="widget_inner <?php if ($x=="1"){echo "active_widget test_harshanie"; } ?>">              
                <p class="widget_cont">  
                            
                            <span class="widget_title">
                              <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                                  <?php $the_tit = get_the_title(); echo substr($the_tit, 0, 60);?>
                                </a>
                            </span>
                            
                            <span class="blog_date"><?php echo tribe_get_start_date( null, false, 'F d, Y'); ?></span>
                                               
                             <?php 
                $the_ex = get_the_excerpt(); 
                $the_ex = substr($the_ex, 0, 168)."...";               
                  
                echo "<span>".wordwrap($the_ex,100)."</span>";
                ?>
                             
                          </p>
                
                            <p style="margin-left: 2%;" class="widget_more"><a href="<?php the_permalink();?>">Read more</a> <span class="pipe">|</span> <a href="<?php echo get_option('home'); ?>/events">See all Internet of Things Events</a></p> 
                        </div> 
                                       
                        <?php
            endwhile;
            wp_reset_query(); 
            wp_reset_postdata();
                         
             ?>
   
                </div>   
            </div>
            
            <?php     
      }
      ?>
            
            
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('box-default-widget') ) : ?>
      <?php endif; ?>
            
            
            <div class="box social_icons">
           
             <div class="half"> 
             	<div class="icons" style="width:26%;"> 
            		<a  href="<?php echo get_option('home'); ?>/sign-up-for-newsletter" class="box_child">      
                      <img style="width:100%;" class="active_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_Newsletter_active.png"  /> 
                      <img style="width:100%; position:relative;" class="hover_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_Newsletter_hover.png"  /> 
                  	</a>   
            	 </div>
                 <div class="icons" style="width:26%;"> 
            		<a  href="mailto:iot@gsma.com" class="box_child">  
                      <img style="width:100%;" class="active_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_Contact_us_active.png"  />
                      <img style="width:100%; position:relative;" class="hover_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_Contact_us_hover.png"  />  
                  	</a>
				  </div>
                  <div class="icons" style="width:23%;"> 	            	
            		<a  href="https://www.linkedin.com/company/gsma---connected-living?trk=other_brands_logo" target="_blank" class="box_child">      
                      <img style="width:100%;" class="active_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_LinkedIn_active.png"  /> 
                      <img style="width:100%; position:relative;" class="hover_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_LinkedIn_hover.png"  /> 
                    </a>   
            	  </div>
                  <div class="icons" style="width:23%;"> 
            		<a  href="https://twitter.com/GSMA" target="_blank" class="box_child">  
                      <img style="width:100%;" class="active_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_Twitter_active.png"  />
                      <img style="width:100%; position:relative;" class="hover_state" src="<?php bloginfo('template_directory'); ?>/images/155x155_Twitter_hover.png"  />   
                    </a>
                   </div>    	   
              		 
             </div> <!-- end of half -->
    
			</div> <!-- end of box.social_icons -->

