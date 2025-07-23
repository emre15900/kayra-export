# Kayra Export - Mikro-Frontend Ürün & Sepet Uygulaması

Bu proje, Next.js ve Module Federation kullanarak geliştirilmiş mikro-frontend mimarisine sahip bir e-ticaret uygulamasıdır.

## 🏗️ Proje Yapısı

```
kayra-export/
├── home/             # Ürün listeleme uygulaması (Port: 3000)
├── cart/             # Sepet uygulaması (Port: 3001)
├── shared/           # Ortak tipler ve bileşenler
├── docker-compose.yml
└── README.md
```

## 🚀 Özellikler

### Home Uygulaması (localhost:3000)
- ✅ Ürün listeleme ve detayları
- ✅ Modern, responsive tasarım
- ✅ Redux Toolkit ile state yönetimi
- ✅ Toast bildirimleri
- ✅ Sepete ekleme işlevi

### Cart Uygulaması (localhost:3001)
- ✅ Sepet ürünlerini listeleme
- ✅ Miktar güncelleme
- ✅ Ürün silme
- ✅ Sipariş özeti
- ✅ Boş sepet durumu

## 🛠️ Teknolojiler

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit**
- **Module Federation**
- **Docker & Docker Compose**
- **React Hot Toast**
- **Lucide React Icons**

## 📦 Kurulum

### 1. Bağımlılıkları Yükle
```bash
npm run install:all
```

### 2. Geliştirme Ortamında Çalıştır
```bash
npm run dev
```

Bu komut her iki uygulamayı da aynı anda başlatır:
- Home: http://localhost:3000
- Cart: http://localhost:3001

### 3. Docker ile Çalıştır
```bash
docker-compose up --build
```

## 🎯 Kullanım

1. **Ürün Listeleme**: Ana sayfada ürünleri görüntüleyin
2. **Sepete Ekleme**: "Sepete Ekle" butonuna tıklayın
3. **Sepeti Görüntüleme**: Header'daki sepet butonuna tıklayın
4. **Miktar Güncelleme**: Sepette + ve - butonlarını kullanın
5. **Ürün Silme**: Çöp kutusu ikonuna tıklayın

## 🏗️ Mimari

### Module Federation
- Her uygulama bağımsız olarak çalışır
- Bileşenler arası paylaşım
- Runtime'da dinamik yükleme

### State Yönetimi
- Redux Toolkit kullanımı
- Her uygulama kendi store'una sahip
- Cross-app iletişim için postMessage API

### Styling
- Tailwind CSS ile utility-first yaklaşım
- Responsive tasarım
- Tutarlı design system

## 🔧 Geliştirme

### Yeni Özellik Ekleme
1. İlgili uygulamada component oluştur
2. Store'a gerekli reducer'ları ekle
3. Type tanımlarını shared/ klasörüne ekle

### Build ve Deploy
```bash
npm run build
```

## 📱 Responsive Tasarım

- **Mobile First** yaklaşım
- Breakpoint'ler: sm, md, lg, xl
- Flexbox ve Grid kullanımı
- Touch-friendly interface

## 🎨 UI/UX Özellikleri

- **Animasyonlar**: Fade-in, slide-up, bounce-in
- **Hover Efektleri**: Smooth transitions
- **Loading States**: Skeleton screens
- **Toast Notifications**: Kullanıcı geri bildirimleri
- **Empty States**: Boş sepet durumu

## 🔒 Güvenlik

- CORS politikaları
- Environment variables
- Secure communication between apps

## 📊 Performans

- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

## 🧪 Test

```bash
npm run test
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun
3. Commit edin
4. Push edin
5. Pull Request açın

## 📞 İletişim

Sorularınız için issue açabilir veya iletişime geçebilirsiniz.