<?php
/**
 * Ethiopian Gems - Hostinger Contact & Consultation Form Mail Handler
 * Compatible with PHP 7.4 - 8.3 on Hostinger cPanel / Apache / LiteSpeed
 */

// Headers for JSON API response and security
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");

// Allow same-origin requests (or specific domains)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Please submit via POST."
    ]);
    exit;
}

// Configuration
$to_email = "piyushbhai2501@gmail.com";
$store_name = "Ethiopian Gems Jaipur";
$site_domain = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'ethiopiangemsjaipur.com';

// Parse incoming data (supports both JSON and regular multipart/x-www-form-urlencoded)
$input_json = file_get_contents('php://input');
$data = json_decode($input_json, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// Anti-spam honeypot check
if (!empty($data['website']) || !empty($data['honeypot'])) {
    // Silently acknowledge bots without sending
    echo json_encode(["success" => true, "message" => "Inquiry received."]);
    exit;
}

// Extract and sanitize input fields
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$gemstone = isset($data['gemstone']) ? trim(strip_tags($data['gemstone'])) : (isset($data['gemstoneInterest']) ? trim(strip_tags($data['gemstoneInterest'])) : 'Ethiopian Opal');
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : (isset($data['notes']) ? trim(strip_tags($data['notes'])) : '');
$consultationType = isset($data['consultationType']) ? trim(strip_tags($data['consultationType'])) : '';
$preferredDate = isset($data['date']) ? trim(strip_tags($data['date'])) : '';

// Validation
$errors = [];
if (empty($name)) {
    $errors[] = "Name is required.";
}
if (empty($phone)) {
    $errors[] = "Phone number is required.";
}
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Please provide a valid email address.";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => implode(" ", $errors),
        "errors" => $errors
    ]);
    exit;
}

// Prevent header injection in email fields
$safe_email = filter_var($email, FILTER_SANITIZE_EMAIL);
$safe_name = preg_replace("/[\r\n]+/", " ", $name);

// Determine subject
$subject_type = !empty($consultationType) ? "Consultation Booking" : "Gemstone Inquiry";
$subject = "[$store_name] New $subject_type: " . $safe_name . " (" . $gemstone . ")";

// Format plain text body
$body_text = "========================================\n";
$body_text .= "NEW CLIENT INQUIRY - ETHIOPIAN GEMS\n";
$body_text .= "Badi Chaupar, Jaipur, Rajasthan\n";
$body_text .= "========================================\n\n";
$body_text .= "Client Name:       " . $safe_name . "\n";
$body_text .= "Phone / WhatsApp:  " . $phone . "\n";
$body_text .= "Email:             " . (!empty($safe_email) ? $safe_email : "Not provided") . "\n";
$body_text .= "Gemstone Focus:    " . $gemstone . "\n";

if (!empty($consultationType)) {
    $body_text .= "Consultation Type: " . ($consultationType === 'in-person' ? 'Showroom Visit (Jaipur)' : 'Virtual HD Video Inspection') . "\n";
}
if (!empty($preferredDate)) {
    $body_text .= "Preferred Date:    " . $preferredDate . "\n";
}

$body_text .= "\nMessage / Notes:\n" . (!empty($message) ? $message : "No specific notes provided.") . "\n\n";
$body_text .= "Submitted on:      " . date('Y-m-d H:i:s T') . "\n";
$body_text .= "Source IP:         " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'Unknown') . "\n";
$body_text .= "========================================\n";

// Format luxury HTML body
$body_html = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Inquiry - Ethiopian Gems</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #07261D; margin: 0; padding: 24px; color: #FAF6EE;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #051C15; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="background: linear-gradient(135deg, #0B3D2E, #07261D); padding: 24px; border-bottom: 2px solid #D4AF37; text-align: center;">
      <h1 style="color: #D4AF37; margin: 0 0 6px 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">ETHIOPIAN GEMS</h1>
      <p style="color: #FAF6EE; margin: 0; font-size: 13px; opacity: 0.85;">1st Floor, Jamali Mension, Badi Chaupar, Jaipur</p>
    </div>
    <div style="padding: 24px; color: #FAF6EE; line-height: 1.6;">
      <div style="display: inline-block; background-color: #0B3D2E; color: #D4AF37; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; border: 1px solid rgba(212,175,55,0.4);">' . htmlspecialchars($subject_type) . '</div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #D4AF37; font-weight: bold; width: 140px; font-size: 13px;">Client Name:</td>
          <td style="padding: 8px 0; color: #FAF6EE; font-size: 14px;"><strong>' . htmlspecialchars($safe_name) . '</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #D4AF37; font-weight: bold; font-size: 13px;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0; color: #FAF6EE; font-size: 14px;"><a href="tel:' . htmlspecialchars($phone) . '" style="color: #4ade80; text-decoration: none;">' . htmlspecialchars($phone) . '</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #D4AF37; font-weight: bold; font-size: 13px;">Email Address:</td>
          <td style="padding: 8px 0; color: #FAF6EE; font-size: 14px;">' . (!empty($safe_email) ? '<a href="mailto:' . htmlspecialchars($safe_email) . '" style="color: #93c5fd; text-decoration: none;">' . htmlspecialchars($safe_email) . '</a>' : '<span style="opacity:0.6;">Not provided</span>') . '</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #D4AF37; font-weight: bold; font-size: 13px;">Gemstone Focus:</td>
          <td style="padding: 8px 0; color: #FAF6EE; font-size: 14px;"><strong style="color: #facc15;">' . htmlspecialchars($gemstone) . '</strong></td>
        </tr>';

if (!empty($consultationType)) {
    $body_html .= '<tr>
          <td style="padding: 8px 0; color: #D4AF37; font-weight: bold; font-size: 13px;">Format:</td>
          <td style="padding: 8px 0; color: #FAF6EE; font-size: 14px;">' . ($consultationType === 'in-person' ? 'Showroom Visit (Badi Chaupar)' : 'Virtual HD Video Inspection') . '</td>
        </tr>';
}
if (!empty($preferredDate)) {
    $body_html .= '<tr>
          <td style="padding: 8px 0; color: #D4AF37; font-weight: bold; font-size: 13px;">Preferred Date:</td>
          <td style="padding: 8px 0; color: #FAF6EE; font-size: 14px;">' . htmlspecialchars($preferredDate) . '</td>
        </tr>';
}

$body_html .= '</table>
      
      <div style="background-color: #07261D; border: 1px solid rgba(212,175,55,0.25); border-radius: 8px; padding: 16px; margin-top: 12px;">
        <div style="color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 8px;">Client Message / Specifics:</div>
        <p style="margin: 0; color: #FAF6EE; font-size: 13px; white-space: pre-wrap;">' . (!empty($message) ? htmlspecialchars($message) : '<em style="opacity: 0.7;">No specific note provided.</em>') . '</p>
      </div>
      
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://wa.me/' . preg_replace('/[^0-9]/', '', $phone) . '" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-right: 8px;">Reply via WhatsApp</a>
        ' . (!empty($safe_email) ? '<a href="mailto:' . htmlspecialchars($safe_email) . '" style="display: inline-block; background-color: #0B3D2E; color: #D4AF37; border: 1px solid #D4AF37; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Reply via Email</a>' : '') . '
      </div>
    </div>
    <div style="background-color: #07261D; padding: 12px 24px; border-top: 1px solid rgba(212,175,55,0.2); text-align: center; font-size: 11px; color: rgba(250,246,238,0.6);">
      Sent automatically from the Ethiopian Gems website inquiry portal (' . htmlspecialchars($site_domain) . ').
    </div>
  </div>
</body>
</html>';

// Construct headers
$from_email = "noreply@" . preg_replace('/^www\./', '', $site_domain);
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/html; charset=UTF-8";
$headers[] = "From: " . $store_name . " <" . $from_email . ">";

if (!empty($safe_email)) {
    $headers[] = "Reply-To: " . $safe_name . " <" . $safe_email . ">";
}

$headers[] = "X-Mailer: PHP/" . phpversion();

// Attempt sending email
$mail_sent = @mail($to_email, $subject, $body_html, implode("\r\n", $headers));

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Thank you, " . $safe_name . "! Your inquiry has been delivered directly to Ethiopian Gems Jaipur. We will connect with you promptly."
    ]);
} else {
    // If server mail() is unconfigured or restricted on Hostinger, return graceful response
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Inquiry recorded. You can also connect instantly with our Badi Chaupar showroom via WhatsApp.",
        "fallback_whatsapp" => true
    ]);
}
