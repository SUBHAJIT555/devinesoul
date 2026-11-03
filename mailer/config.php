<?php

declare(strict_types=1);

function mailer_starts_with(string $value, string $prefix): bool
{
    if ($prefix === "") {
        return true;
    }
    return strncmp($value, $prefix, strlen($prefix)) === 0;
}

function load_env_file(string $path): void
{
    if (!is_file($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === "" || mailer_starts_with($line, "#") || strpos($line, "=") === false) {
            continue;
        }
        [$key, $value] = explode("=", $line, 2);
        $key = trim($key);
        $value = trim($value, " \t\"'");
        if ($key !== "" && getenv($key) === false) {
            putenv("{$key}={$value}");
            $_ENV[$key] = $value;
        }
    }
}

load_env_file(__DIR__ . DIRECTORY_SEPARATOR . ".env");
load_env_file(dirname(__DIR__) . DIRECTORY_SEPARATOR . ".env");

function env_value(string $key, string $fallback = ""): string
{
    $value = getenv($key);
    if ($value === false || trim((string) $value) === "") {
        return $fallback;
    }
    return trim((string) $value);
}

$contactFile = dirname(__DIR__) . DIRECTORY_SEPARATOR . "src" . DIRECTORY_SEPARATOR . "data" . DIRECTORY_SEPARATOR . "contact.json";
$contact = is_file($contactFile) ? json_decode((string) file_get_contents($contactFile), true) : [];
$fallbackEmail = is_array($contact) && isset($contact["email"]) ? (string) $contact["email"] : "hello@divinesoulsbypriya.in";
$fallbackPhone = is_array($contact) && isset($contact["phone"]) ? (string) $contact["phone"] : "";
$fallbackCountry = is_array($contact) && isset($contact["countryCode"]) ? (string) $contact["countryCode"] : "91";

$email = env_value("NEXT_PUBLIC_CONTACT_EMAIL", env_value("MAILER_FROM_EMAIL", $fallbackEmail));
$phone = env_value("NEXT_PUBLIC_CONTACT_PHONE", $fallbackPhone);
$countryCode = env_value("NEXT_PUBLIC_CONTACT_COUNTRY_CODE", $fallbackCountry);

return [
    "smtp_host" => env_value("MAILER_SMTP_HOST", "mail.divinesoulsbypriya.in"),
    "smtp_port" => (int) env_value("MAILER_SMTP_PORT", "465"),
    "smtp_secure" => env_value("MAILER_SMTP_SECURE", "ssl"),
    "smtp_user" => env_value("MAILER_SMTP_USER", $email),
    "smtp_pass" => env_value("MAILER_SMTP_PASS"),
    "from_email" => env_value("MAILER_FROM_EMAIL", $email),
    "from_name" => env_value("MAILER_FROM_NAME", "Divine Souls By Priya"),
    "admin_email" => env_value("MAILER_ADMIN_EMAIL", $email),
    "admin_name" => env_value("MAILER_ADMIN_NAME", "Priya"),
    "phone" => $phone,
    "country_code" => $countryCode,
    "site_url" => env_value("MAILER_SITE_URL", "https://divinesoulsbypriya.in"),
    "mailer_secret" => env_value("MAILER_SECRET"),
];
