<?php

/**
 * Defaults live in config.php and read from .env.
 *
 * Contact (site + mailer footers):
 *   NEXT_PUBLIC_CONTACT_EMAIL
 *   NEXT_PUBLIC_CONTACT_PHONE
 *   NEXT_PUBLIC_CONTACT_COUNTRY_CODE
 *
 * SMTP:
 *   MAILER_SMTP_HOST / MAILER_SMTP_PORT / MAILER_SMTP_SECURE
 *   MAILER_SMTP_USER / MAILER_SMTP_PASS
 *   MAILER_FROM_EMAIL / MAILER_ADMIN_EMAIL
 *   MAILER_SECRET / MAILER_URL
 *
 * On the host, upload .env into this mailer folder.
 * Apache is blocked from reading it by .htaccess.
 */
return require __DIR__ . "/config.php";
