<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// 에러 리포팅 설정 (디버깅용, 배포 시 0으로 변경 권장)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// 데이터 파일 경로
$dataFile = '../../data/devlog.json';
$uploadDir = '../../uploads/devlog/';

// 디렉토리 생성 함수
function ensureDirectoryExists($path) {
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
}

// 응답 함수
function sendResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

// OPTIONS 요청 처리 (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// GET 요청: 데이터 읽기
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        echo $content;
    } else {
        echo json_encode([]);
    }
    exit;
}

// POST 요청: 데이터 쓰기
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    ensureDirectoryExists(dirname($dataFile));
    ensureDirectoryExists($uploadDir);

    $title = $_POST['title'] ?? '';
    $content = $_POST['content'] ?? '';
    $date = $_POST['date'] ?? date('Y-m-d');
    
    if (empty($title) || empty($content)) {
        sendResponse(false, '제목과 내용은 필수입니다.');
    }

    // 이미지 처리
    $imageUrl = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $ext;
        $targetPath = $uploadDir . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            // 웹 접근 경로 (public 폴더 기준)
            $imageUrl = '/myportfolio/uploads/devlog/' . $filename;
        } else {
            sendResponse(false, '이미지 업로드 실패');
        }
    }

    // 기존 데이터 읽기
    $currentData = [];
    if (file_exists($dataFile)) {
        $jsonContent = file_get_contents($dataFile);
        $currentData = json_decode($jsonContent, true) ?? [];
    }

    // 새 데이터 추가
    $newLog = [
        'id' => uniqid(),
        'title' => $title,
        'content' => $content,
        'date' => $date,
        'image' => $imageUrl,
        'createdAt' => date('c')
    ];

    array_unshift($currentData, $newLog); // 최신 글을 맨 앞으로

    // 데이터 저장
    if (file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        sendResponse(true, '저장되었습니다.', $newLog);
    } else {
        sendResponse(false, '데이터 파일 저장 실패');
    }
}

sendResponse(false, '잘못된 요청입니다.');
?>
