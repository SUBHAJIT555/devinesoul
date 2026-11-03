<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . "/lib/PHPMailer/Exception.php";
require __DIR__ . "/lib/PHPMailer/PHPMailer.php";
require __DIR__ . "/lib/PHPMailer/SMTP.php";

$cli = PHP_SAPI === "cli";

if (!$cli) {
    header("Content-Type: application/json; charset=utf-8");
}

function respond(int $status, array $body): void
{
    if (PHP_SAPI !== "cli") {
        http_response_code($status);
    }
    $body["status"] = $status;
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit(0);
}

function clean($value): string
{
    return trim(preg_replace("/\s+/u", " ", (string) $value) ?? "");
}

function field(array $data, string $key): string
{
    return clean($data[$key] ?? "");
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

$configFile = is_file(__DIR__ . "/config.php") ? __DIR__ . "/config.php" : __DIR__ . "/config.example.php";
$config = require $configFile;

if (!$cli) {
    $site = rtrim((string) ($config["site_url"] ?? ""), "/");
    $origin = (string) ($_SERVER["HTTP_ORIGIN"] ?? "");
    $referer = (string) ($_SERVER["HTTP_REFERER"] ?? "");
    $allowed = array_filter([$site, "http://localhost:3000", "http://127.0.0.1:3000"]);
    $host = parse_url($site, PHP_URL_HOST);
    if (is_string($host) && $host !== "") {
        $alt = mailer_starts_with($host, "www.") ? substr($host, 4) : "www." . $host;
        $allowed[] = "https://" . $alt;
        $allowed[] = "http://" . $alt;
    }
    $ok = false;
    foreach ($allowed as $base) {
        if (($origin !== "" && mailer_starts_with($origin, $base)) || ($referer !== "" && mailer_starts_with($referer, $base))) {
            $ok = true;
            break;
        }
    }
    if (!$ok) {
        respond(403, ["ok" => false, "error" => "Could not send the request. Try again, or write on WhatsApp."]);
    }
    if ($origin !== "" && (mailer_starts_with($origin, "http://localhost:3000") || mailer_starts_with($origin, "http://127.0.0.1:3000"))) {
        header("Access-Control-Allow-Origin: " . $origin);
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Vary: Origin");
    }
    if (($_SERVER["REQUEST_METHOD"] ?? "") === "OPTIONS") {
        http_response_code(204);
        exit;
    }
}

$raw = $cli ? (string) stream_get_contents(STDIN) : (string) file_get_contents("php://input");
$data = json_decode($raw, true);
if (!is_array($data) || $data === []) {
    $data = $_POST;
}

if (field($data, "website") !== "") {
    respond(200, ["ok" => true]);
}

$name = field($data, "name");
$email = field($data, "email");
$phone = field($data, "phone");
$whatsapp = field($data, "whatsapp");
$message = trim((string) ($data["message"] ?? ""));
$kind = strtolower(field($data, "kind"));
if (!in_array($kind, ["service", "course", "product", "contact"], true)) {
    $kind = "contact";
}

$topic = field($data, "topic");
if ($topic === "") {
    $topic = field($data, $kind === "contact" ? "service" : $kind);
}
$service = field($data, "service");
$course = field($data, "course");
$product = field($data, "product");
if ($topic === "") {
    $named = array_values(array_filter([$service, $course, $product]));
    $topic = $named[0] ?? "";
}

if ($name === "" || ($email === "" && $phone === "")) {
    respond(400, ["ok" => false, "error" => "Add your name and a way to reach you."]);
}

if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ["ok" => false, "error" => "That email does not look right."]);
}

$smtpUser = (string) ($config["smtp_user"] ?? "");
$smtpPass = (string) ($config["smtp_pass"] ?? "");
$fromEmail = (string) ($config["from_email"] ?? $smtpUser);
$adminEmail = (string) ($config["admin_email"] ?? $fromEmail);
$fromName = (string) ($config["from_name"] ?? "Divine Souls By Priya");
$siteUrl = rtrim((string) ($config["site_url"] ?? "https://divinesoulsbypriya.in"), "/");

if ($smtpUser === "" || $smtpPass === "" || $fromEmail === "" || $adminEmail === "") {
    respond(503, ["ok" => false, "error" => "Could not send the request. Try again, or write on WhatsApp."]);
}

$country = preg_replace("/\D/", "", (string) ($config["country_code"] ?? "91")) ?: "91";
$sitePhone = preg_replace("/\D/", "", (string) ($config["phone"] ?? "")) ?: "";
$phoneDisplay = $sitePhone !== "" ? "+{$country} {$sitePhone}" : "";

$labels = [
    "service" => "sitting",
    "course" => "course",
    "product" => "product",
    "contact" => "note",
];
$label = $labels[$kind];
$topicLine = $topic !== "" ? $topic : "your {$label}";
$kindTitle = [
    "service" => "Sitting request",
    "course" => "Course request",
    "product" => "Product request",
    "contact" => "Website note",
][$kind];

$reply = replyCopy($kind, $name, $topicLine, $phoneDisplay, $fromEmail);
$adminSubject = $topic !== "" ? "New {$label}: {$topic}" : "New {$label} from {$name}";

$adminRows = array_filter([
    "Request type" => ucfirst($label),
    "Topic" => $topic !== "" ? $topic : null,
    "Name" => $name,
    "Email" => $email !== "" ? $email : null,
    "Phone" => $phone !== "" ? $phone : null,
    "WhatsApp" => $whatsapp !== "" ? $whatsapp : null,
    "Service" => $service !== "" ? $service : null,
    "Course" => $course !== "" ? $course : null,
    "Product" => $product !== "" ? $product : null,
    "Message" => $message !== "" ? $message : null,
], static fn ($value) => $value !== null && $value !== "");

$logoPath = "";
foreach ([
    dirname(__DIR__) . DIRECTORY_SEPARATOR . "public" . DIRECTORY_SEPARATOR . "brand" . DIRECTORY_SEPARATOR . "logo.png",
    dirname(__DIR__) . DIRECTORY_SEPARATOR . "brand" . DIRECTORY_SEPARATOR . "logo.png",
] as $logoCandidate) {
    if (is_file($logoCandidate)) {
        $logoPath = $logoCandidate;
        break;
    }
}
$logoSrc = $logoPath !== "" ? "cid:brand-logo" : rtrim($siteUrl, "/") . "/brand/logo.png";

try {
    $mail = smtpMailer($config, $fromEmail, $fromName);
    attachBrandLogo($mail, $logoPath);
    $mail->addAddress($adminEmail, (string) ($config["admin_name"] ?? "Priya"));
    if ($email !== "") {
        $mail->addReplyTo($email, $name);
    }
    $mail->Subject = $adminSubject;
    $mail->Body = adminTemplate($kindTitle, $topicLine, $name, $adminRows, $phoneDisplay, $fromEmail, $siteUrl, $logoSrc);
    $mail->AltBody = plainRows($adminRows);
    $mail->send();

    if ($email !== "") {
        $replyMail = smtpMailer($config, $fromEmail, $fromName);
        attachBrandLogo($replyMail, $logoPath);
        $replyMail->addAddress($email, $name);
        $replyMail->addReplyTo($fromEmail, $fromName);
        $replyMail->Subject = $reply["subject"];
        $replyMail->Body = visitorTemplate(
            $reply["eyebrow"],
            $reply["heading"],
            $reply["body"],
            $topicLine,
            $kindTitle,
            $phoneDisplay,
            $fromEmail,
            $siteUrl,
            $logoSrc
        );
        $replyMail->AltBody = $reply["heading"] . "\n\n" . $reply["body"] . "\n\n" . $fromEmail . ($phoneDisplay !== "" ? " · " . $phoneDisplay : "");
        $replyMail->send();
    }
} catch (Exception $error) {
    respond(502, ["ok" => false, "error" => "Could not send the request. Try again, or write on WhatsApp."]);
}

respond(200, ["ok" => true]);

function smtpMailer(array $config, string $fromEmail, string $fromName): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) $config["smtp_host"];
    $mail->Port = (int) $config["smtp_port"];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config["smtp_user"];
    $mail->Password = (string) $config["smtp_pass"];
    $secure = strtolower((string) $config["smtp_secure"]);
    $mail->SMTPSecure = $secure === "ssl" ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->isHTML(true);
    $mail->setFrom($fromEmail, $fromName);
    return $mail;
}

function attachBrandLogo(PHPMailer $mail, string $logoPath): void
{
    if (!is_file($logoPath)) {
        return;
    }
    $mail->addEmbeddedImage($logoPath, "brand-logo", "logo.png");
}

function replyCopy(string $kind, string $name, string $topic, string $phone, string $email): array
{
    $first = $name !== "" ? $name : "there";
    $call = $phone !== "" ? " If you would rather speak, call {$phone}." : "";

    if ($kind === "service") {
        return [
            "subject" => "We have your request for {$topic}",
            "eyebrow" => "Sitting request received",
            "heading" => "Priya has your sitting request.",
            "body" => "Hello {$first}. Your request for {$topic} has reached Divine Souls. She will write back on this email, or on WhatsApp, with how to begin.{$call}",
        ];
    }
    if ($kind === "course") {
        return [
            "subject" => "We have your request for the {$topic} course",
            "eyebrow" => "Course request received",
            "heading" => "Priya has your course request.",
            "body" => "Hello {$first}. Your request for the {$topic} course has reached Divine Souls. She will write back on this email, or on WhatsApp, with how to enroll and what to prepare.{$call}",
        ];
    }
    if ($kind === "product") {
        return [
            "subject" => "We have your request for {$topic}",
            "eyebrow" => "Product request received",
            "heading" => "Priya has your product request.",
            "body" => "Hello {$first}. Your request for {$topic} has reached Divine Souls. She will write back on this email, or on WhatsApp, with how to get it and what she needs from you.{$call}",
        ];
    }
    return [
        "subject" => "We have your note",
        "eyebrow" => "Note received",
        "heading" => "Priya has your note.",
        "body" => "Hello {$first}. Your note" . ($topic !== "your note" ? " about {$topic}" : "") . " has reached Divine Souls. She will write back on this email, or on WhatsApp.{$call}",
    ];
}

function shellOpen(): string
{
    return '<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="x-apple-disable-message-reformatting">
  <title>Divine Souls</title>
</head>
<body style="margin:0;padding:0;background:#ececf0;color:#18181b;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Divine Souls By Priya · a note from the practice</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ececf0;">
    <tr>
      <td align="center" style="padding:36px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;border-radius:28px;overflow:hidden;background:#ffffff;box-shadow:0 24px 60px rgba(24,24,27,0.12);">';
}

function shellClose(string $phone, string $email, string $siteUrl, string $logoSrc): string
{
    $host = preg_replace("#^https?://#", "", $siteUrl) ?: $siteUrl;
    $phoneLine = $phone !== "" ? '<a href="tel:' . e(preg_replace("/\s+/", "", $phone) ?: $phone) . '" style="color:#71717a;text-decoration:none;">' . e($phone) . '</a>' : "";
    $mailLine = $email !== "" ? '<a href="mailto:' . e($email) . '" style="color:#71717a;text-decoration:none;">' . e($email) . '</a>' : "";
    $bits = array_values(array_filter([$phoneLine, $mailLine]));

    return '
          <tr>
            <td style="background:#f4f4f5;padding:28px 32px 32px;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" style="width:48px;">
                    <img src="' . e($logoSrc) . '" width="40" height="40" alt="" style="display:block;width:40px;height:40px;border:0;border-radius:999px;" />
                  </td>
                  <td valign="middle" style="padding-left:14px;">
                    <p style="margin:0;font-size:15px;font-weight:600;letter-spacing:-0.02em;color:#18181b;">Divine Souls By Priya</p>
                    <p style="margin:4px 0 0;font-size:13px;line-height:1.5;color:#71717a;">Dehradun' . ($bits ? " · " . implode(" · ", $bits) : "") . '</p>
                    <p style="margin:6px 0 0;font-size:13px;line-height:1.5;">
                      <a href="' . e($siteUrl) . '" style="color:#0084d1;text-decoration:none;font-weight:600;">' . e($host) . '</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#a1a1aa;">Sent for Divine Souls · sittings, courses, and pieces from Dehradun</p>
      </td>
    </tr>
  </table>
</body>
</html>';
}

function brandHeader(string $eyebrow, string $logoSrc): string
{
    return '
          <tr>
            <td style="background:#1e1e1f;padding:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:26px 32px 22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="middle" style="width:52px;">
                          <img src="' . e($logoSrc) . '" width="48" height="48" alt="Divine Souls" style="display:block;width:48px;height:48px;border:0;border-radius:999px;background:#ffffff;box-shadow:0 0 0 3px rgba(255,255,255,0.12);" />
                        </td>
                        <td valign="middle" style="padding-left:14px;font-family:Arial,Helvetica,sans-serif;">
                          <p style="margin:0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Divine Souls</p>
                          <p style="margin:6px 0 0;font-size:22px;line-height:1.2;font-weight:600;letter-spacing:-0.03em;color:#ffffff;">' . e($eyebrow) . '</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="height:4px;line-height:4px;font-size:0;background:#00a7f5;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>';
}

function detailCards(array $rows): string
{
    $html = "";
    foreach ($rows as $label => $value) {
        $html .= '
              <tr>
                <td style="padding:0 0 10px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa;border:1px solid #ececec;border-radius:16px;">
                    <tr>
                      <td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;">
                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">' . e((string) $label) . '</p>
                        <p style="margin:0;font-size:15px;line-height:1.55;color:#18181b;font-weight:500;">' . nl2br(e((string) $value)) . '</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>';
    }
    return $html;
}

function primaryButton(string $href, string $label): string
{
    return '
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:16px;background:#00a7f5;box-shadow:inset 0 3px 0 0 rgba(255,255,255,0.22),0 2px 4px 0 rgba(6,147,255,0.25);">
                    <a href="' . e($href) . '" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;letter-spacing:-0.02em;color:#ffffff;text-decoration:none;">' . e($label) . '</a>
                  </td>
                </tr>
              </table>';
}

function adminTemplate(
    string $kindTitle,
    string $topic,
    string $name,
    array $rows,
    string $phone,
    string $email,
    string $siteUrl,
    string $logoSrc
): string {
    $replyHint = isset($rows["Email"])
        ? "Reply to this email to reach " . e($name) . " directly."
        : "Use the phone or WhatsApp number below to reach " . e($name) . ".";

    $message = $rows["Message"] ?? null;
    $summary = $rows;
    unset($summary["Message"], $summary["Topic"], $summary["Request type"]);

    return shellOpen() . brandHeader($kindTitle, $logoSrc) . '
          <tr>
            <td style="padding:32px 32px 8px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#dff2fe;border-radius:22px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 10px;display:inline-block;padding:6px 11px;border-radius:999px;background:#ffffff;color:#0084d1;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">New website request</p>
                    <h1 style="margin:0 0 8px;font-size:30px;line-height:1.15;font-weight:600;letter-spacing:-0.04em;color:#18181b;">' . e($topic) . '</h1>
                    <p style="margin:0;font-size:15px;line-height:1.55;color:#3f3f46;">' . e($kindTitle) . ' · from ' . e($name) . '</p>
                  </td>
                </tr>
              </table>
              <p style="margin:22px 0 0;font-size:16px;line-height:1.65;color:#52525b;">' . $replyHint . '</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 8px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-weight:600;">Details</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ' . detailCards($summary) . '
              </table>
            </td>
          </tr>
          ' . ($message ? '
          <tr>
            <td style="padding:10px 32px 28px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa;border:1px solid #ececec;border-radius:20px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;font-weight:600;">Message</p>
                    <p style="margin:0;font-size:16px;line-height:1.7;color:#18181b;">' . nl2br(e((string) $message)) . '</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>' : '
          <tr><td style="padding-bottom:24px;background:#ffffff;font-size:0;line-height:0;">&nbsp;</td></tr>') . '
    ' . shellClose($phone, $email, $siteUrl, $logoSrc);
}

function visitorTemplate(
    string $eyebrow,
    string $heading,
    string $body,
    string $topic,
    string $kindTitle,
    string $phone,
    string $email,
    string $siteUrl,
    string $logoSrc
): string {
    $whatsappHref = $phone !== "" ? "https://wa.me/" . preg_replace("/\D/", "", $phone) : $siteUrl;

    return shellOpen() . brandHeader($eyebrow, $logoSrc) . '
          <tr>
            <td style="padding:32px 32px 12px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:4px;background:#00a7f5;border-radius:999px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding-left:16px;">
                    <h1 style="margin:0 0 12px;font-size:30px;line-height:1.18;font-weight:600;letter-spacing:-0.04em;color:#18181b;">' . e($heading) . '</h1>
                    <p style="margin:0;font-size:16px;line-height:1.7;color:#52525b;">' . e($body) . '</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px 8px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#dff2fe;border-radius:22px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#0084d1;font-weight:700;">Your request</p>
                    <p style="margin:0 0 6px;font-size:24px;line-height:1.25;font-weight:600;letter-spacing:-0.03em;color:#18181b;">' . e($topic) . '</p>
                    <p style="margin:0;font-size:14px;line-height:1.5;color:#3f3f46;">' . e($kindTitle) . '</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 32px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;">' . primaryButton($siteUrl, "Visit Divine Souls") . '</td>
                  <td>' . primaryButton($whatsappHref, "WhatsApp Priya") . '</td>
                </tr>
              </table>
              <p style="margin:18px 0 0;font-size:13px;line-height:1.55;color:#a1a1aa;">Keep this note. Priya will write back on this email, or on WhatsApp.</p>
            </td>
          </tr>
    ' . shellClose($phone, $email, $siteUrl, $logoSrc);
}

function plainRows(array $rows): string
{
    $lines = [];
    foreach ($rows as $label => $value) {
        $lines[] = $label . ": " . $value;
    }
    return implode("\n", $lines);
}
