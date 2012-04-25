<?php

	/**
	 * @package image_upload_content
	 */

	class Extension_Image_Upload_Content extends Extension {
		public function getSubscribedDelegates() {
			return array(
				array(
					'page'		=> '*',
					'delegate'	=> 'AppendContentType',
					'callback'	=> 'appendContentType'
				)
			);
		}

		public function appendContentType(&$context) {
			require_once __DIR__ . '/libs/image-upload-content.php';

			$context['items']->{'image'} = new ImageUploadContentType();
		}
	}