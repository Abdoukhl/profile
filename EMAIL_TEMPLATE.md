# 📧 قالب EmailJS الجاهز

## 🎨 قالب إيميل احترافي لموقعك

انسخ هذا الكود بالكامل والصقه في EmailJS Template:

```html
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #161b22 0%, #0d1117 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: #58a6ff; margin: 0; font-size: 28px; font-weight: 600;">
      📧 رسالة جديدة من بروفايلك
    </h1>
    <p style="color: #8b949e; margin: 10px 0 0 0; font-size: 14px;">
      من موقع Abderrahmane Khial Portfolio
    </p>
  </div>

  <!-- Sender Info -->
  <div style="background: #161b22; padding: 25px; border-left: 4px solid #58a6ff;">
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <div style="background: #58a6ff; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-left: 15px;">
        👤
      </div>
      <div style="flex: 1;">
        <h2 style="color: #f0f6fc; margin: 0; font-size: 20px; font-weight: 600;">
          {{from_name}}
        </h2>
        <p style="color: #8b949e; margin: 5px 0 0 0; font-size: 14px;">
          📧 {{from_email}}
        </p>
      </div>
    </div>
  </div>

  <!-- Subject -->
  <div style="background: #161b22; padding: 20px 25px; border-top: 1px solid #30363d;">
    <h3 style="color: #58a6ff; margin: 0 0 10px 0; font-size: 16px; display: flex; align-items: center;">
      📝 الموضوع
    </h3>
    <div style="color: #c9d1d9; font-size: 16px; background: #0d1117; padding: 12px; border-radius: 6px; border: 1px solid #30363d;">
      {{subject}}
    </div>
  </div>

  <!-- Message -->
  <div style="background: #161b22; padding: 20px 25px; border-top: 1px solid #30363d;">
    <h3 style="color: #58a6ff; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center;">
      💬 الرسالة
    </h3>
    <div style="color: #c9d1d9; font-size: 15px; line-height: 1.6; background: #0d1117; padding: 15px; border-radius: 6px; border: 1px solid #30363d; white-space: pre-wrap;">
      {{message}}
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #0d1117; padding: 25px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #30363d;">
    <div style="color: #8b949e; font-size: 13px; margin-bottom: 10px;">
      تم الإرسال من موقع Abderrahmane Khial Portfolio
    </div>
    <div style="color: #58a6ff; font-size: 12px; margin-bottom: 15px;">
      🌐 https://Abdoukhl.github.io/profile
    </div>
    <div style="display: flex; justify-content: center; gap: 15px;">
      <a href="https://github.com/Abdoukhl" style="color: #8b949e; text-decoration: none; font-size: 20px;">📁</a>
      <a href="https://www.linkedin.com/in/abderrahmane-khial" style="color: #8b949e; text-decoration: none; font-size: 20px;">💼</a>
      <a href="mailto:abderrahmanekhial05@gmail.com" style="color: #8b949e; text-decoration: none; font-size: 20px;">📧</a>
    </div>
  </div>

  <!-- Time Stamp -->
  <div style="background: #010409; padding: 15px; text-align: center; border-radius: 0 0 12px 12px;">
    <div style="color: #8b949e; font-size: 11px;">
      ⏰ تم الاستلام: {{time}}
    </div>
  </div>
</div>
```

## 🔧 أسماء المتغيرات المطلوبة:

تأكد من أن القالب يستخدم هذه المتغيرات بالضبط:
- `{{from_name}}` - اسم المرسل
- `{{from_email}}` - إيميل المرسل
- `{{subject}}` - الموضوع
- `{{message}}` - الرسالة
- `{{time}}` - الوقت (اختياري)

## 📋 خطوات الإضافة:

1. **اذهب إلى EmailJS Dashboard**
2. **اختر "Email Templates"**
3. **اضغط "Create New Template"**
4. **امسح القالب الافتراضي**
5. **انسخ والصق الكود أعلاه**
6. **احفظ القالب**
7. **انسخ Template ID**
8. **ضعه في script.js**

## ✨ المميزات:

- 🎨 تصميم GitHub-style احترافي
- 📱 متجاوب على جميع الأجهزة
- 🔤 دعم العربية والإنجليزية
- 🌐 روابط سوشيال ميديا
- ⏰ طابع زمني
- 📧 معلومات المرسل الواضحة
