<?php

	require_once TOOLKIT . '/class.page.php';

	class ContentExtensionImage_ContentUpload extends Page {
		public function build() {
			$result = array();

			$result = $_FILES;

			if (headers_sent()) exit;

			header('content-type: text/json');
			echo json_encode($result); exit;
		}
	}