<?php

declare(strict_types=1);

$config = require __DIR__ . "/config.php";

$payload = json_encode([
    "name" => "Mailer Test",
    "email" => (string) $config["admin_email"],
    "phone" => (string) $config["phone"],
    "kind" => "service",
    "topic" => "Lama Fera Healing",
    "message" => "Manual mailer test from yarn mailer:test.",
], JSON_UNESCAPED_UNICODE);

$descriptor = [
    0 => ["pipe", "r"],
    1 => ["pipe", "w"],
    2 => ["pipe", "w"],
];

$command = [
    PHP_BINARY,
    "-c",
    __DIR__ . DIRECTORY_SEPARATOR . "php.ini",
    __DIR__ . DIRECTORY_SEPARATOR . "send.php",
];

$process = proc_open($command, $descriptor, $pipes, __DIR__);
if (!is_resource($process)) {
    fwrite(STDERR, "Could not start the mailer.\n");
    exit(1);
}

fwrite($pipes[0], (string) $payload);
fclose($pipes[0]);

$stdout = stream_get_contents($pipes[1]) ?: "";
$stderr = stream_get_contents($pipes[2]) ?: "";
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

echo $stdout, PHP_EOL;
if ($stderr !== "") {
    fwrite(STDERR, $stderr);
}

$result = json_decode($stdout, true);
exit(is_array($result) && ($result["ok"] ?? false) ? 0 : 1);
