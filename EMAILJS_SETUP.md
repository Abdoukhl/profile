# EmailJS Setup Instructions

## 📧 خطوات إعداد EmailJS للإرسال التلقائي

### 1. إنشاء حساب EmailJS
1. اذهب إلى [https://www.emailjs.com/](https://www.emailjs.com/)
2. اضغط على "Sign Up Free"
3. سجل باستخدام إيميلك (مثلاً: abderrahmanekhial05@gmail.com)

### 2. إعداد خدمة الإيميل (Email Service)
1. بعد تسجيل الدخول، اذهب إلى "Email Services"
2. اضغط "Add New Service"
3. اختر "Gmail" (أو أي خدمة إيميل أخرى)
4. اتبع التعليمات لربط حساب Gmail

### 3. إنشاء قالب إيميل (Email Template)
1. اذهب إلى "Email Templates"
2. اضغط "Create New Template"
3. **استبدل القالب الافتراضي** بالكود التالي:

**القالب المخصص لموقعك:**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div style="background: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 8px;">
    <h2 style="color: #58a6ff; margin: 0 0 20px 0;">📧 New Message from Portfolio</h2>
    
    <div style="background: #161b22; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <table role="presentation" style="width: 100%;">
        <tr>
          <td style="vertical-align: top; padding-right: 15px;">
            <div style="font-size: 24px;">👤</div>
          </td>
          <td style="vertical-align: top;">
            <div style="color: #f0f6fc; font-size: 16px; font-weight: bold;">{{from_name}}</div>
            <div style="color: #8b949e; font-size: 13px;">{{from_email}}</div>
          </td>
        </tr>
      </table>
    </div>

    <div style="background: #161b22; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #58a6ff; margin: 0 0 10px 0; font-size: 14px;">📝 Subject</h3>
      <div style="color: #c9d1d9; font-size: 15px;">{{subject}}</div>
    </div>

    <div style="background: #161b22; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <h3 style="color: #58a6ff; margin: 0 0 10px 0; font-size: 14px;">💬 Message</h3>
      <div style="color: #c9d1d9; line-height: 1.6; white-space: pre-wrap;">{{message}}</div>
    </div>

    <div style="text-align: center; padding: 15px; background: #0d1117; border-radius: 6px;">
      <div style="color: #8b949e; font-size: 12px;">
        Sent from Abderrahmane Khial's Portfolio Website
      </div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 5px;">
        🌐 https://Abdoukhl.github.io/profile
      </div>
    </div>
  </div>
</div>
```

**ملاحظة هامة:** تأكد من أن أسماء المتغيرات في القالب هي:
- `{{from_name}}` للاسم
- `{{from_email}}` للإيميل  
- `{{subject}}` للموضوع
- `{{message}}` للرسالة

### 4. الحصول على المفاتيح
1. **Public Key**: اذهب إلى "Account" → "API Keys"
2. **Service ID**: من صفحة خدمة الإيميل
3. **Template ID**: من صفحة القالب

### 5. تحديث الكود
استبدل القيم في الملفات التالية:

**في `index.html` (سطر 16-17):**
```javascript
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // ضع هنا الـ Public Key
})();
```

**في `script.js` (سطر 130):**
```javascript
emailjs.send("service_your_service_id", "template_your_template_id", {
    // ... بيانات النموذج
});
```

### 6. اختبار
- املأ النموذج في موقعك
- اضغط "Send Message"
- ستصلك الرسالة تلقائياً إلى إيميلك

## 🔧 ملاحظات هامة
- **EmailJS مجاني**: 200 رسالة شهرياً
- **Gmail**: قد تحتاج إلى تفعيل "Less secure apps"
- **Template**: يمكنك تخصيصص تصميم الإيميل

## 📞 الدعم
إذا واجهت أي مشاكل:
1. تحقق من المفاتيح المدخلة
2. تأكد من إعدادات Gmail
3. راجع وثائق EmailJS
