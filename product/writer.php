<?php
file_put_contents('cart.json', htmlspecialchars_decode(file_get_contents('php://input')));