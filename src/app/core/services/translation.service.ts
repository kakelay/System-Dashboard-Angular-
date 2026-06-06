import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Translations {
  [key: string]: string;
}

interface LanguageTranslations {
  [key: string]: Translations;
}

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<string>(
    this.getDefaultLanguage(),
  );
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: LanguageTranslations = {
    en: {
      // Button Labels
      "btn.addCustomer": "Add Customer",
      "btn.submit": "Submit",
      "btn.cancel": "Cancel",
      "btn.save": "Save",
      "btn.close": "Close",

      // Modal Titles
      "modal.addCustomer": "Add New Customer",
      "modal.title": "Add New Customer",

      // Form Labels
      "form.username": "Username",
      "form.password": "Password",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.firstName": "First Name",
      "form.lastName": "Last Name",
      "form.addressLine1": "Address",
      "form.city": "City",
      "form.state": "State/Province",
      "form.country": "Country",
      "form.zipCode": "Zip Code",
      "form.bio": "Bio",
      "form.website": "Website",
      "form.theme": "Theme",
      "form.language": "Language",
      "form.timezone": "Timezone",

      // Validation Messages
      "validation.required": "This field is required",
      "validation.email": "Please enter a valid email",
      "validation.phone": "Please enter a valid phone number",
      "validation.password": "Password must be at least 8 characters",

      // Success/Error Messages
      "message.success": "Customer created successfully",
      "message.error": "Failed to create customer",
      "message.usernameExists": "Username already exists",
      "message.emailExists": "Email already exists",
      "message.serverError": "Server error occurred",
      "message.loading": "Creating customer...",
      "message.unknown": "Unknown error occurred",
    },
    kh: {
      // Button Labels
      "btn.addCustomer": "បន្ថែមលูកค្នុងថ្មី",
      "btn.submit": "ដាក់ស្នើ",
      "btn.cancel": "បោះបង់",
      "btn.save": "រក្សាទុក",
      "btn.close": "បិទ",

      // Modal Titles
      "modal.addCustomer": "បន្ថែមលូកក្នុងថ្មី",
      "modal.title": "បន្ថែមលូកក្នុងថ្មី",

      // Form Labels
      "form.username": "ឈ្មោះអ្នកប្រើប្រាស់",
      "form.password": "ពាក្យសម្ងាត់",
      "form.email": "ឈ្មោះអ្នកប្រើប្រាស់ (Email)",
      "form.phone": "លេខទូរស័ព្ទ",
      "form.firstName": "នាម",
      "form.lastName": "គោត្តនាម",
      "form.addressLine1": "អាសយដ្ឋាន",
      "form.city": "ក្រុង",
      "form.state": "រដ្ឋ/ខេត្ត",
      "form.country": "ប្រទេស",
      "form.zipCode": "លេខស្តីលេខ",
      "form.bio": "ព័ត៌មានលម្អិត",
      "form.website": "គេហទំព័ર",
      "form.theme": "រម្នាក់ប្រាក់",
      "form.language": "ភាសា",
      "form.timezone": "តំបន់ពេលវេលា",

      // Validation Messages
      "validation.required":
        "ឥលუគឹរ្កេលលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខល�ខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខលេខល�ខលេខលេខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខល�ខលដូច្នេះ",
      "validation.email": "សូមបញ្ចូលលិខិតឯកសារដែលត្រឹមត្រូវ",
      "validation.phone": "សូមបញ្ចូលលេខទូរស័ព្ទដែលត្រឹមត្រូវ",
      "validation.password": "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៨ ឡើង",

      // Success/Error Messages
      "message.success": "ប្រតិបត្តិការបានជោគជ័យ",
      "message.error": "បរាជ័យក្នុងការបង្កើតលូកក្នុង",
      "message.usernameExists": "ឈ្មោះអ្នកប្រើមានរួចហើយ",
      "message.emailExists": "អ្នកប្រើប្រាស់ (Email) មានរួចហើយ",
      "message.serverError": "កំហុសម៉ាស៊ីនបម្រើ",
      "message.loading": "កំពុងបង្កើតលូកក្នុង...",
      "message.unknown": "មានបញ្ហាមិនស្គាល់ដែលបានកើតឡើង",
    },
    cn: {
      // Button Labels
      "btn.addCustomer": "添加客户",
      "btn.submit": "提交",
      "btn.cancel": "取消",
      "btn.save": "保存",
      "btn.close": "关闭",

      // Modal Titles
      "modal.addCustomer": "添加新客户",
      "modal.title": "添加新客户",

      // Form Labels
      "form.username": "用户名",
      "form.password": "密码",
      "form.email": "邮箱",
      "form.phone": "电话",
      "form.firstName": "名字",
      "form.lastName": "姓氏",
      "form.addressLine1": "地址",
      "form.city": "城市",
      "form.state": "州/省",
      "form.country": "国家",
      "form.zipCode": "邮编",
      "form.bio": "介绍",
      "form.website": "网站",
      "form.theme": "主题",
      "form.language": "语言",
      "form.timezone": "时区",

      // Validation Messages
      "validation.required": "此字段为必填项",
      "validation.email": "请输入有效的电子邮件",
      "validation.phone": "请输入有效的电话号码",
      "validation.password": "密码必须至少为8个字符",

      // Success/Error Messages
      "message.success": "客户创建成功",
      "message.error": "创建客户失败",
      "message.usernameExists": "用户名已存在",
      "message.emailExists": "邮箱已存在",
      "message.serverError": "服务器错误",
      "message.loading": "正在创建客户...",
      "message.unknown": "发生未知错误",
    },
  };

  constructor() {
    const savedLanguage = localStorage.getItem("app_language");
    if (
      savedLanguage &&
      Object.keys(this.translations).includes(savedLanguage)
    ) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  private getDefaultLanguage(): string {
    const saved = localStorage.getItem("app_language");
    if (saved && Object.keys(this.translations).includes(saved)) {
      return saved;
    }
    return "en";
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  setLanguage(lang: string): void {
    if (Object.keys(this.translations).includes(lang)) {
      this.currentLanguageSubject.next(lang);
      localStorage.setItem("app_language", lang);
    }
  }

  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  translate(key: string, lang?: string): string {
    const language = lang || this.getCurrentLanguage();
    return (
      this.translations[language]?.[key] || this.translations["en"][key] || key
    );
  }

  translateInstant(key: string, lang?: string): Observable<string> {
    return new Promise((resolve) => {
      const language = lang || this.getCurrentLanguage();
      const translation =
        this.translations[language]?.[key] ||
        this.translations["en"][key] ||
        key;
      resolve(translation);
    }) as any;
  }
}
