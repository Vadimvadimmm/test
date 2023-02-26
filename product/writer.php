<?php
file_put_contents('data.json', htmlspecialchars_decode(file_get_contents('php://input')));