/*  --------------------------------------------  *\
	PROPIETARIO SCRIPT'S
	-------------------------------------------- 	
	Actualización	: 2015-07-16
	Autor			: Jonathan Ramirez
	Agencia			: Medialab CR
\*  --------------------------------------------  */

/*//////////////////////////////////////////*/
/*                                          */
/*               INICIALIZAR                */
/*                                          */
/*//////////////////////////////////////////*/

/* base */
var $body 		= $('body');

/* id's */
var $top		= $('#top'),
	$header		= $('#header'),
	$content_principal	= $('#content-principal'),
	$search		= $('#search'),
	$content		= $('#content'),
	$introduction		= $('#introduction'),
	$banners		= $('#banners'),
	$servicios		= $('#servicios'),
	$testimonios		= $('#testimonios'),
	$footer		= $('#footer'),
	$footer_logos		= $('#footer-logos'),
	$servicios		= $('#servicios'),
	$empresas		= $('#empresas');
	

/* others */
var $menu		= $('#menu'),
	$toggle		= $('.toggle'),
	$goTo 		= $('.goto');
	$section 	= $('.section');

/* peticiones ajax */
var dataAjax	= null;

/*  ======================================= */
/*  document.ready
/*  ======================================= */
	$(document).ready(function(){
		//PARALLAX
		skrollr.init({
			smoothScrolling: false,
			mobileDeceleration: 0.004
		});
 
		// carousel '#header'
		fn_carousel($header.find('.carousel'));
   
		//validacion del formlario
		if ($("#form-XXX").length){
			$("#form-XXX").validate({
				/*ignore: "",
				rules: {
					name 	: 	{required: true},
					phone 	: 	{required: true},
					email 	: 	{required: true, email: true},
					comment : 	{required: true},
				},
				messages: {
					name 	: 	{required: "Ingrese su nombre"},
					email 	: 	{required: "Ingrese un email válido", email:  "Ingrese un email válido"},
					phone 	: 	{required: "Ingrese un teléfono", number: "Solo se admiten números"},
					comment : 	{required: "¿Cúal es su pregunta?"}
				},*/
				 submitHandler: function(form) {
					datax = 'name='+$('#name').val()+'&phone='+$('#phone').val()+'&mail='+$('#email').val()+'&country='+$('#country').val()+'&comment='+$('#comment').val();
					$.ajax({
						url: '<?php echo site_url("send-contacto-corredor")?>',
						timeout: 5000,
						data:datax,
						type: "post",
						success: function(data){
							//alert('Su mensaje ha sido enviado. En breve nos pondremos en contacto con usted.');	
							/*$('#name').val('');
							$('#phone').val('');
							$('#mail').val('');
							$('#c_comment').val('');*/
							$('#form .ok').fadeIn('fast').delay(2000).fadeOut();
							$('#form input, #form textarea').val('');
							//$('#form option[value="PE"]').attr("selected").siblings().removeAttr("selected");	
							$('#form option').removeAttr("selected");
							$('#form option[value="PE"]').prop("selected","true");

							// conectado a Google Tag Manager
							window.dataLayer = window.dataLayer || [];
							dataLayer.push({
							  'event':'gaTriggerEvent',
							  'gaEventCategory':'form',
							  'gaEventAction':'submit',
							  'gaEventLabel':'contact' 
							});
						},
						error: function(XHR, textStatus, errorThrown){
							alert('Hemos tenido algún problema. Por favor vuelva a intentarlo en unos minutos');
						}
					});
				}
	        });
		}
	});


/*//////////////////////////////////////////*/
/*                                          */
/*                FUNCIONES                 */
/*                                          */
/*//////////////////////////////////////////*/
  
/*  ======================================= */
/*  CARRUSEL (usar extensión)
/*  ======================================= */
	function fn_carousel($selector){
		// verificar existencia
		if ($selector.length){
			var $carousel = $selector.find('.carousel-content');
			var $next = $selector.find('.next');
			var $prev = $selector.find('.prev');

			$carousel.owlCarousel({
			    loop:true,
			    margin:0,
			    items:1,
			    autoplay:true,
			    autoplaySpeed: 4000,
			    dotsSpeed: 4000, 
			    autoplayTimeout: 4000,
			    dots:false,
			    //lazyLoad: true,
			    autoWidth:false
			})
			// Navegación Personalizada Eventos (OWL)
			$next.click(function(e){ e.preventDefault(); $carousel.trigger('next.owl.carousel') });
			$prev.click(function(e){ e.preventDefault(); $carousel.trigger('prev.owl.carousel') });
		}
	} 
   
