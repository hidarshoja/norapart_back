export const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Tahoma, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">بازرگانی نوراپارت</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>با سلام,</p>
    <p>در پاسخ به پیام شما در فرم ارتباط با ما:</p>
    
    <p>{reply}</p>
    <div style="text-align: center; margin: 30px 0;">
    </div>

    <p>با تشکر از شما بخاطر ارسال پیام.</p>
    <p>بازرگانی نوراپارت</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>این یک ایمیل ارسالی است و نمیتوانید به آن پاسخ بدهید.</p>
  </div>
</body>
</html>
`;