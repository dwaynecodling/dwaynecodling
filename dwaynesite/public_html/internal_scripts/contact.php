<?php

// TODO change this
define("RECAPTCHA_V3_SECRET_KEY", '6Lf5DgEVAAAAABvIlQM1XngklKvnoclH76bgNhS5');

function outputResult(bool $isSuccessful, string $message){
    header("Content-Type: application/json");
    echo json_encode([
        "Success" => $isSuccessful,
        "Message" => $message
    ]);
}

function getPost($key, $fallback=""){
    return isset($_POST[$key]) ? $_POST[$key] : $fallback;
}

if (isset($_POST["email"])) {
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
} else {
    outputResult(false, "Email address is not valid");
    exit;
}

$token = getPost("token");
$action = getPost("action");
$name = getPost("name");
$message = getPost("message");

// Verify captcha
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL,"https://www.google.com/recaptcha/api/siteverify");
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query([
    "secret" => RECAPTCHA_V3_SECRET_KEY,
    "response" => $token
]));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($curl);
curl_close($curl);

$response = json_decode($result, true);

// Check reCaptcha response
if($response["success"] == '1' && $response["action"] == $action && $response["score"] >= 0.5) {

    $h = "From: $email";
    mail("hello@dwaynecodling.com", "Message from $name", $message, $h);

    outputResult(true, "Message sent");
} else {
    // Possible spam, ignore email;
    outputResult(false, "Message not sent (Possible spam)");
}