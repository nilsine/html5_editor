HTML5 Editor
============

Fork of the HTML5 Editor made by Nuno Baldaia to add an option to put the toolbar on the left.

HTML5 Editor is a [jQuery](http://jquery.com/) plugin that transforms any `textarea` into a WYSIWYG editor. It is simply based on the HTML5's [`contenteditable`](http://html5demos.com/contenteditable) attribute, a tiny layer of JavaScript and CSS. As such, it is NOT COMPATIBLE WITH OLDER BROWSERS!!

Usage
-----

Include the plugin JavaScript and CSS files and add the plugin to any `textarea` element(s) on the DOM:

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="jquery.html5_editor.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
    $(function(){
      $('textarea').html5_editor();
    });
    </script>

The plugin will replace each textarea by a `contenteditable` based editor counterpart. The textareas will just be hidden and the plugin will read/write the contents from/to them so, you don't need to change anything on your original forms.

You may choose which toolbar items to include:

    $('textarea').html5_editor({
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
			]
    });
    
Settings
--------

**Auto fix toolbar**

The toolbar will be fixed on the top of the bowser window when the editor scrolls out by default.
To disable this behavior set the `fix-toolbar-on-top` option to `false`:

    $('textarea').html5_editor({
      'fix-toolbar-on-top': false
    });
    
**Left toolbar**

The toolbar is on top by default, to put it on the left set the `left-toolbar` option to `true`:

    $('textarea').html5_editor({
      'left-toolbar': true
    });
    
**Auto-hide toolbar**

To make the toolbar hidden by default and show it when user click the editor, set the `auto-hide-toolbar` option to `true`:

    $('textarea').html5_editor({
      'auto-hide-toolbar': true
    });


Active Admin
------------

This editor was originally developed as an editor to the [Active Admin](http://activeadmin.info/) Rails plugin. As such, its integration on Active Admin is seamless:

On `active_admin.js`:

    //= require jquery
    //= require jquery.html5_editor
    
    $(function() {  
      $(".html5-editor").html5_editor();
    });
    

On `active_admin.css.scss`:

    @import "jquery.html5_editor";
    @import "jquery.html5_editor.activeadmin"; /* Active Admin dedicated styles */

On `app/admin/posts.rb`

    ActiveAdmin.register Post do
      form do |f|
        f.inputs do
          f.input :body, :as => :text, :input_html => { :class => 'html5-editor' }
        end
      end
    end


Improvements
------------

This editor is on its most raw state, and needs to be improved.


License
-------

HTML5 Editor is Copyright © 2012 Nuno Baldaia. It is free software, and may be redistributed under the terms specified in the LICENSE file.
