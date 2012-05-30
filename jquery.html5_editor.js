﻿/*
  HTML5 Editor
  
  Author: Nuno Baldaia
  Copyright: Copyright (c) 2012 Nuno Baldaia
  License: MIT License (http://www.opensource.org/licenses/mit-license.php)
  */
 

/*
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);


/*
 * Add a change event on contenteditable elements
 * From http://stackoverflow.com/a/6263537/270433
 */
$('[contenteditable]').live('focus', function() {
    var $this = $(this);
    $this.data('before', $this.html());
    return $this;
}).live('blur keyup paste', function() {
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
    }
    return $this;
});

	
(function($) {

	var methods = {
		init: function(options) {
			// Create some defaults, extending them with any options that were provided
    		var settings = $.extend({
    			'toolbar-items': [
    				[
    					['h1', 'H1', 'Heading 1'],
    					['h2', 'H2', 'Heading 2'],
    					['h3', 'H3', 'Heading 3'],
    					['h4', 'H4', 'Heading 4'],
    					['h5', 'H5', 'Heading 5'],
    					['p', '¶', 'Paragraph'],
    					['blockquote', '❝', 'Blockquote'],
    					['code', 'Code', 'Code']
    				],
   				  [
    					['ul', '• list', 'Unordered list'],
    					['ol', '1. list', 'Ordered list']
    				],
    				[
    					['link', 'Link', 'Insert Link'],
    					['image', 'Image', 'Insert Image'],
    					['video', 'Video', 'Insert Video']
    				],
    				[
    					['bold', 'B', 'Bold'],
    					['italic', 'I', 'Italicize'],
    					['underline', 'U', 'Underline'],
    					['strike', 'Abc', 'Strikethrough'],
    					['sup', 'X<sup>2</sup>', 'Superscript'],
    					['sub', 'X<sub>2</sub>', 'Subscript'],
    					['remove', '⌫', 'Remove Formating']
    				]
    			],
      		'fix-toolbar-on-top': true,
      		'left-toolbar': false,
      		'auto-hide-toolbar': false
    		}, options);

			return this.each(function() {
				var $this = $(this);
				var $editorContainer = $('<div class="html5-editor-container"></div>').insertAfter($this);
				var $toolbar = $('<div class="toolbar"></div>').appendTo($editorContainer);
				
				if(settings['fix-toolbar-on-top']) {
          $toolbar.fixOnTop(settings);
        }
        
				$.each(settings['toolbar-items'], function(index1, items) {
					var $toolbarItems = $('<ul></ul>').appendTo($toolbar);
					$.each(items, function(index2, item) {
						$('<li><a href="#" class="'+item[0]+'" title="'+(item[2] || item[1])+'">'+item[1]+'</a></li>').
						click(function() {
							switch(item[0]) {
							case 'p':
								methods.formatBlock.apply(this, ["<p>"]);
								break;
							case 'h1':
								methods.formatBlock.apply(this, ["<h1>"]);
								break;
							case 'h2':
								methods.formatBlock.apply(this, ["<h2>"]);
								break;
							case 'h3':
								methods.formatBlock.apply(this, ["<h3>"]);
								break;
							case 'h4':
								methods.formatBlock.apply(this, ["<h4>"]);
								break;
							case 'h5':
								methods.formatBlock.apply(this, ["<h5>"]);
								break;
							case 'blockquote':
								methods.formatBlock.apply(this, ["<blockquote>"]);
								break;
							case 'code':
								methods.formatBlock.apply(this, ["<pre>"]);
								break;
							case 'ul':
								methods.unorderedList.apply(this);
								break;
							case 'ol':
								methods.orderedList.apply(this);
								break;
							case 'sup':
								methods.superscript.apply(this);
								break;
							case 'sub':
								methods.subscript.apply(this);
								break;
							case 'bold':
								methods.bold.apply(this);
								break;
							case 'italic':
								methods.italic.apply(this);
								break;
							case 'underline':
								methods.underline.apply(this);
								break;
							case 'strike':
								methods.strike.apply(this);
								break;
							case 'remove':
								methods.removeFormat.apply(this);
								break;
							case 'link':
								methods.createLink.apply(this);
								break;
							case 'image':
								methods.insertImage.apply(this);
								break;
							case 'video':
								methods.insertVideo.apply(this);
								break;
							}
							return false;
						}).appendTo($toolbarItems);
					});
				});

				var $contenteditable = $('<div class="html5-editor" contenteditable="true"></div>').appendTo($editorContainer);
				
				$toolbar.data('auto-hide-toolbar', settings['auto-hide-toolbar']);
				$toolbar.data('clicked', false);
				
				if (settings['auto-hide-toolbar']) {
					$toolbar.hide();
					
					$contenteditable.focus(function () {
						// ensure that all toolbars with auto-hide-toolbar at true are hidden
						$('.html5-editor-container .toolbar').each(function () {
							if ($(this).data('auto-hide-toolbar') && ! $(this).is($toolbar)) $(this).fadeOut();
						});
						// show toolbar on focus
						$toolbar.fadeIn();
					});
				}
				
				$contenteditable.change(function() {
					$this.val($(this).html());
				});
				
				$contenteditable.blur(function() {
					if (settings['auto-hide-toolbar']) {
						/*
						 * if ather 250ms the toolbar was not clicked, hide it
						 * TODO: find a better way do to this, didn't hide toolbar when editor lose focus for the toolbar 
						 */
						$.doTimeout(250, function() {
							if (! $toolbar.data('clicked')) $toolbar.fadeOut();
							$toolbar.data('clicked', false);
						});
					}
				});
				
				$toolbar.find('ul li a').click(function () {
					// save the clicked status of the toolbar				
					$toolbar.data('clicked', true);
				});
				
				$contenteditable.html($this.val());
				$this.hide();
				
				if(settings['left-toolbar']) {
					$toolbar.addClass('left');
					$contenteditable.addClass('left-toolbar');
				}
			});
		},
		bold: function() {
			document.execCommand("bold", false, null);
		},
		italic: function() {
			document.execCommand("italic", false, null);
		},
		underline: function() {
			document.execCommand("underline", false, null);
		},
		strike: function() {
			document.execCommand("StrikeThrough", false, null);
		},
		orderedList: function() {
			document.execCommand("InsertOrderedList", false, null);
		},
		unorderedList: function() {
			document.execCommand("InsertUnorderedList", false, null);
		},
		indent: function() {
			document.execCommand("indent", false, null);
		},
		outdent: function() {
			document.execCommand("outdent", false, null);
		},
		superscript: function() {
			document.execCommand("superscript", false, null);
		},
		subscript: function() {
			document.execCommand("subscript", false, null);
		},
		createLink: function() {
			var urlPrompt = prompt("Enter the link URL:", "http://");
			document.execCommand("createLink", false, urlPrompt);
		},
		insertImage: function() {
			var urlPrompt = prompt("Enter the image URL:", "http://");
			document.execCommand("InsertImage", false, urlPrompt);
		},
		insertVideo: function() {
			var videoEmbedCode = prompt("Enter the video embed code:", "");
			console.log(videoEmbedCode);
			document.execCommand('insertHTML', false, videoEmbedCode);
		},
		formatBlock: function(block) {
			document.execCommand("FormatBlock", null, block);
		},
		removeFormat: function() {
			document.execCommand("removeFormat", false, null);
		}
	};

	$.fn.html5_editor = function( method ) {
    	// Method calling logic
    	if ( methods[method] ) {
     		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
     		return methods.init.apply( this, arguments );
    	} else {
      		$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    	}
  };
  
  
	$.fn.fixOnTop = function(settings) {
		return this.each(function() {
      var $this = $(this);
      var origPosition = $this.css('position');
      $(window).scroll(function() {
      	if ($this.is(':visible')) {
	        if ($(window).scrollTop() > $this.parent().offset().top && ($(window).scrollTop() < $this.parent().offset().top + $this.parent().height())) {
	          if (!$this.hasClass('fixed')) {
	            $this.addClass('fixed');
	            if (settings['left-toolbar']) {
		            // translate container local left coordinate to global (browser) coordinate for fixed position
		            var newLeft = $this.offset().left + $this.parent().offset().left;
		      			$this.css('left', newLeft);
		      		}
	          }
	        } else {
	          if ($this.hasClass('fixed')) {
	          	if (settings['left-toolbar']) {
		          	// translate container global left coordinate to local coordinate
		          	var newLeft = $this.offset().left - $this.parent().offset().left;
		      			$this.css('left', newLeft);
	      			}
	            $this.removeClass('fixed');
	          }
	        }
	      }
      });
		});
	};

})(jQuery);
