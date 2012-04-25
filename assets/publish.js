jQuery(document).ready(function() {
	var $ = jQuery,
		instanceSelector = 'li.instance.content-type-image-upload';
		dropTargetSelector = 'div.drop-target',
		imagePreviewSelector = 'div.image-preview',

		root = Symphony.Context.get('root'),
		url = root + '/symphony/extension/image_upload_content/upload/';

	// Create drag and drop interface:
	var buildDropInterface = function(instance) {
		var $self = $(dropTargetSelector, instance)
			.bind('dragenter', function(e) {
				$self.addClass('ready-to-drop');

				return false;
			})

			.bind('dragexit', function(e) {
				$self.removeClass('ready-to-drop');

				return false;
			})

			.bind('dragover', function(e) {
				return false;
			})

			.bind('drop', function(e) {
				e.stopPropagation();
				e.preventDefault();

				$self.removeClass('ready-to-drop');

				var files = e.originalEvent.dataTransfer.files;

				// No files found:
				if (files.length == 0) return false;

				var reader = new FileReader(),
					file = files.item(0);

				// Update interface:
				$self
					.addClass('uploading')
					.text(file.name);

				// File is ready:
				reader.onload = function(evt) {
					var data = evt.target.result;

					$self.hide();
					buildImageInterface(instance, data);
				};

				// Start reading file:
				reader.readAsDataURL(file);

				return false;
			});

	};

	var buildImageInterface = function(instance, data) {
		var $self = $(imagePreviewSelector, instance),
			$image = $self.find('img');

		$image.attr('src', data);
		$self.show();
	};

	$('div.field-content')
		.on('constructshow.duplicator', instanceSelector, function() {
			buildDropInterface(this);
		});
});