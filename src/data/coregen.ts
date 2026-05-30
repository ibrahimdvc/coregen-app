export type Priority = 'high' | 'med' | 'low'
export type Status = 'todo' | 'progress' | 'review' | 'done' | 'blocked'

export type Task = {
  id: string
  title: string
  sub: string
  status: Status
  priority: Priority
  due: string
  assignees: string[]
  device: string
  tag: string
}

export type Meeting = {
  id: number
  time: string
  dur: string
  title: string
  sub: string
  rail: '' | 'g' | 'a'
  location?: string
  mode?: 'Online' | 'Yerinde' | 'Hibrit'
  participants?: { initials: string; name: string; role: string }[]
  agenda?: string[]
  aiSummary?: string
  attachments?: { type: 'pdf' | 'docx' | 'xlsx'; title: string }[]
}
export type DocFile = { type: 'pdf' | 'docx' | 'xlsx'; title: string; sub: string; updated: string }
export type Announcement = { tag: string; tagColor: 'blue' | 'green' | 'amber'; h: string; b: string; m: string }
export type KPI = { label: string; value: string; delta: string; trend: 'up' | 'down'; sub: string }

export const kpis: KPI[] = [
  { label: 'Aktif Cihaz', value: '247', delta: '+12', trend: 'up', sub: 'sahada hizmette' },
  { label: 'Açık Servis Çağrısı', value: '18', delta: '-3', trend: 'up', sub: 'bu hafta' },
  { label: 'Yaklaşan Kalibrasyon', value: '9', delta: '+2', trend: 'down', sub: '7 gün içinde' },
  { label: 'AI Sorgu / Hafta', value: '1.284', delta: '+18%', trend: 'up', sub: '23 aktif kullanıcı' },
]

export const tasks: Task[] = [
  { id: 'CG-2401', title: 'Acıbadem Bakırköy — Roche Cobas 6000 yıllık kalibrasyon', sub: 'Kimya analizör — reaktif değişimi sonrası tam profil', status: 'todo', priority: 'high', due: 'Bugün, 16:00', assignees: ['MY','AT'], device: 'Cobas 6000', tag: 'Kalibrasyon' },
  { id: 'CG-2402', title: 'Memorial Şişli — Sysmex XN-1000 hata kodu 4E-12', sub: 'Reagent transfer hattında tıkanma şüphesi', status: 'progress', priority: 'high', due: 'Bugün, 18:30', assignees: ['MY','EK'], device: 'Sysmex XN-1000', tag: 'Arıza' },
  { id: 'CG-2403', title: 'Ankara Şehir Hastanesi — Cihaz teslimat dokümantasyonu', sub: 'CE belgeleri ve kullanıcı eğitim formları', status: 'review', priority: 'med', due: 'Yarın, 12:00', assignees: ['SK'], device: '—', tag: 'İhale' },
  { id: 'CG-2404', title: 'Florence Nightingale — PCR cihazı yerinde eğitim', sub: 'Laborant ekibine 2 oturumluk uygulamalı eğitim', status: 'todo', priority: 'med', due: '31 May, 10:00', assignees: ['ND','MY'], device: 'QuantStudio 5', tag: 'Eğitim' },
  { id: 'CG-2405', title: 'SSK Bursa — Servis sözleşmesi yenileme önerisi', sub: '2026 yıllık bakım kapsamı + reaktif tedariki', status: 'progress', priority: 'low', due: '3 Haz', assignees: ['SK','HB'], device: '—', tag: 'Satış' },
  { id: 'CG-2406', title: 'Yedek parça envanteri — Q2 kapanış sayımı', sub: 'Filtre, prob, tüp seti — depo karşılaştırma', status: 'done', priority: 'low', due: '28 May', assignees: ['HB'], device: '—', tag: 'Lojistik' },
  { id: 'CG-2407', title: 'İhale teklifi — Sağlık Bakanlığı 2024/3812', sub: 'Biyokimya + Hematoloji paket teklifi', status: 'review', priority: 'high', due: '2 Haz, 17:00', assignees: ['EK','SK'], device: '—', tag: 'İhale' },
  { id: 'CG-2408', title: 'Roche servis bülteni FSN-2025-04 dağıtımı', sub: '12 müşteriye saha bildirimi gönderildi', status: 'done', priority: 'med', due: '27 May', assignees: ['ND'], device: '—', tag: 'Bildirim' },
  { id: 'CG-2409', title: 'Liv Hospital Vadistanbul — Cihaz yer hazırlık kontrolü', sub: 'Su, elektrik ve havalandırma uygunluğu', status: 'todo', priority: 'med', due: '4 Haz', assignees: ['MY'], device: 'Architect i2000', tag: 'Kurulum' },
  { id: 'CG-2410', title: 'Saha çağrısı — Medipol Pendik (UPS arızası)', sub: 'Cihaz kapanma sonrası reaktif kayıp analizi', status: 'blocked', priority: 'high', due: '—', assignees: ['MY'], device: 'Cobas e411', tag: 'Arıza' },
]

export const meetings: Meeting[] = [
  {
    id: 1, time: '09:30', dur: '30 dk', title: 'Pazartesi operasyon sync',
    sub: 'Teknik Operasyon · 6 kişi', rail: '',
    location: 'Toplantı odası 1', mode: 'Hibrit',
    participants: [
      { initials: 'MY', name: 'Mehmet Yıldırım', role: 'Saha Servis Uzmanı' },
      { initials: 'AT', name: 'Ayşe Taş', role: 'Operasyon Müdürü' },
      { initials: 'EK', name: 'Erdem Kaya', role: 'Servis Mühendisi' },
      { initials: 'SK', name: 'Selim Kara', role: 'Bölge Sorumlusu' },
      { initials: 'ND', name: 'Nazlı Demir', role: 'Eğitim Uzmanı' },
      { initials: 'HB', name: 'Hakan Bora', role: 'Lojistik' },
    ],
    agenda: [
      'Geçen haftanın açık servis çağrılarının kapanış durumu',
      'Bu haftaki yüksek öncelikli kalibrasyonlar',
      'Reaktif stoğu ve depo durumu',
      'Acıbadem sözleşme yenileme — kritik aksiyonlar',
    ],
    aiSummary: 'Geçen hafta 14 servis çağrısının 11\'i SLA içinde kapatıldı. Bu hafta 3 yüksek öncelikli kalibrasyon var. Reaktif stoğu Beylikdüzü deposunda %72 doluluk. Acıbadem yenilemesi için 14:00 toplantısı kritik.',
    attachments: [
      { type: 'xlsx', title: 'Haftalık servis çağrı raporu' },
      { type: 'pdf', title: 'Reaktif stok durumu — 29 May' },
    ],
  },
  {
    id: 2, time: '11:00', dur: '45 dk', title: 'Roche servis ortağı görüşmesi',
    sub: 'Online · 4 kişi · Ajanda ekli', rail: 'g',
    location: 'Google Meet', mode: 'Online',
    participants: [
      { initials: 'MY', name: 'Mehmet Yıldırım', role: 'Saha Servis Uzmanı' },
      { initials: 'AT', name: 'Ayşe Taş', role: 'Operasyon Müdürü' },
      { initials: 'RC', name: 'Roche — Carla M.', role: 'Partner Manager' },
      { initials: 'RT', name: 'Roche — Tomas L.', role: 'Field Service Lead' },
    ],
    agenda: [
      'FSN-2025-04 bülteni dağıtımı — ilerleme',
      'Q3 yedek parça tedarik planı',
      'Saha mühendisi sertifikasyon yenileme',
      'Q&A',
    ],
    aiSummary: 'Roche tarafıyla FSN-2025-04 dağıtım durumu paylaşılacak (12/47 müşteri tamamlandı). Q3 yedek parça siparişi 18 kalemde onay bekliyor. 3 mühendisin sertifikasyonu Ağustos\'ta yenilenecek.',
    attachments: [
      { type: 'pdf', title: 'Roche FSN-2025-04 Bülteni' },
      { type: 'docx', title: 'Sertifikasyon takvimi 2025' },
    ],
  },
  {
    id: 3, time: '14:00', dur: '60 dk', title: 'Acıbadem Yönetim — sözleşme yenileme',
    sub: 'Yerinde · 3 kişi · Hazırlık notu hazır', rail: 'a',
    location: 'Acıbadem Bakırköy', mode: 'Yerinde',
    participants: [
      { initials: 'SK', name: 'Selim Kara', role: 'Bölge Sorumlusu' },
      { initials: 'AT', name: 'Ayşe Taş', role: 'Operasyon Müdürü' },
      { initials: 'AC', name: 'Acıbadem — Dr. Cem Y.', role: 'Lab Sorumlusu' },
    ],
    agenda: [
      '2026 yıllık bakım kapsamı',
      'Reaktif tedarik şartları — 7.3 madde revizyonu',
      'SLA hedeflerinin gözden geçirilmesi',
      'Yeni cihaz teklifleri (Cobas Pro)',
    ],
    aiSummary: 'Mevcut çerçeve sözleşmenin 7.3 maddesi (24 saat raporlama) güncellenmek isteniyor. Geçen yıl 247 servis çağrısının %94\'ü SLA içinde kapatıldı. Cobas Pro teklifi için ön çalışma hazır.',
    attachments: [
      { type: 'docx', title: 'Acıbadem Çerçeve Sözleşme 2024' },
      { type: 'pdf', title: 'SLA performans raporu 2024' },
      { type: 'xlsx', title: 'Cobas Pro teklif modeli' },
    ],
  },
  {
    id: 4, time: '16:30', dur: '20 dk', title: 'İhale komite ön değerlendirme',
    sub: 'Toplantı odası 2 · 5 kişi', rail: '',
    location: 'Toplantı odası 2', mode: 'Yerinde',
    participants: [
      { initials: 'EK', name: 'Erdem Kaya', role: 'Servis Mühendisi' },
      { initials: 'SK', name: 'Selim Kara', role: 'Bölge Sorumlusu' },
      { initials: 'AT', name: 'Ayşe Taş', role: 'Operasyon Müdürü' },
      { initials: 'MY', name: 'Mehmet Yıldırım', role: 'Saha Servis Uzmanı' },
      { initials: 'NB', name: 'Nazım Berk', role: 'Finans' },
    ],
    agenda: [
      'Sağlık Bakanlığı 2024/3812 teknik şartname özeti',
      'Fiyat stratejisi',
      'Risk değerlendirmesi',
    ],
    aiSummary: 'Teklif kapsamı: Biyokimya + Hematoloji paketi, 14 kalem. Teknik şartnamede 2 kritik kalemde özel gereksinim var. Önerilen fiyat aralığı: 4.2M - 4.6M TL.',
    attachments: [
      { type: 'pdf', title: '2024/3812 Teknik Şartname' },
      { type: 'xlsx', title: 'Maliyet analizi' },
    ],
  },
]

export const documents: DocFile[] = [
  { type: 'pdf', title: 'Cobas 6000 — Servis El Kitabı v4.2', sub: 'Drive · Servis Dokümanları · 12 MB', updated: '2 saat önce' },
  { type: 'docx', title: 'Acıbadem Sağlık Grubu — Çerçeve Sözleşme', sub: 'Drive · Sözleşmeler · 184 KB', updated: 'Dün' },
  { type: 'xlsx', title: '2025 Kalibrasyon Takvimi — Q2', sub: 'Drive · Operasyon · 96 KB', updated: '3 gün önce' },
  { type: 'pdf', title: 'Sysmex XN serisi — Hata Kodları Kataloğu', sub: 'Drive · Teknik Referans · 8 MB', updated: '1 hafta önce' },
]

export const announcements: Announcement[] = [
  { tag: 'KALITE', tagColor: 'blue', h: 'ISO 13485:2016 dış denetim takvimi açıklandı', b: 'Dış denetim 17–19 Haziran tarihlerinde Beylikdüzü merkezde yapılacak. Tüm operasyonel kayıtların güncel olduğundan emin olun.', m: 'Kalite Yönetimi · 2 saat önce' },
  { tag: 'SAHA', tagColor: 'green', h: 'Yeni reaktif stoğu Beylikdüzü deposuna ulaştı', b: 'Roche Cobas reaktif kalemleri için yeni sevkiyat envantere eklendi. Saha taleplerinizi panel üzerinden iletebilirsiniz.', m: 'Lojistik · 6 saat önce' },
  { tag: 'İK', tagColor: 'amber', h: 'Haziran ayı vardiya planı yayında', b: 'Anadolu yakası saha ekibi için yeni nöbet planı paylaşıldı. İtirazlar için Çarşamba mesai sonuna kadar süre var.', m: 'İnsan Kaynakları · Dün' },
]

export const regions = [
  { r: 'İstanbul Anadolu', d: 42, p: 96 },
  { r: 'İstanbul Avrupa', d: 38, p: 92 },
  { r: 'Ankara', d: 31, p: 88 },
  { r: 'İzmir', d: 22, p: 94 },
  { r: 'Bursa', d: 18, p: 91 },
  { r: 'Antalya', d: 14, p: 86 },
]

export type ChatItem = { id: string; t: string; m: string; active?: boolean }
export const chats: { today: ChatItem[]; week: ChatItem[]; older: ChatItem[] } = {
  today: [
    { id: 'c1', t: 'Cobas 6000 kalibrasyon prosedürü', m: 'Kalibrasyon adımları, reaktif değişimi sonrası…', active: true },
    { id: 'c2', t: 'Acıbadem çerçeve sözleşme şartları', m: '12. madde ödeme koşullarına göre…' },
  ],
  week: [
    { id: 'c3', t: 'Sysmex 4E-12 hata kodu', m: 'Reagent transfer modülünde tıkanma…' },
    { id: 'c4', t: 'İhale 2024/3812 teknik şartname', m: 'İstenen ölçüm aralıkları aşağıda…' },
    { id: 'c5', t: 'Yıllık bakım kapsamı — özet', m: 'Sözleşme kapsamındaki kalemler:…' },
  ],
  older: [
    { id: 'c6', t: 'CE belgesi sürüm güncellemesi', m: 'EU 2017/746 IVDR geçişi için…' },
    { id: 'c7', t: 'Yeni kullanıcı eğitim akışı', m: 'Standart oturum süresi 90 dakikadır…' },
  ],
}

export type Source = { n: number; t: string; path: string; snip: string; page: string }
export type UserMsg = { who: 'you'; text: string; time: string }
export type AIMsg = { who: 'ai'; scope: string; time: string; text: string; sources: Source[] }
export type Message = UserMsg | AIMsg

export const initialConversation: Message[] = [
  {
    who: 'you',
    text: "Acıbadem Bakırköy'deki Cobas 6000 için reaktif değişimi sonrası tam kalibrasyon prosedürünü kısaca özetler misin? Saha ziyaretine bugün öğleden sonra çıkıyorum.",
    time: '14:02',
  },
  {
    who: 'ai',
    scope: 'Drive (4 kaynak)',
    time: '14:02',
    text: `**Roche Cobas 6000 — Reaktif Değişimi Sonrası Kalibrasyon Özeti**

Servis El Kitabı v4.2 ve Roche FSN-2025-04 bültenine göre prosedür beş ana adımdan oluşur §1§ §2§ :

1. **Ön kontrol (10 dk).** Reaktif kasetlerinin lot numaralarını cihaz envanteri ile karşılaştırın. Lot eşleşmiyorsa "Reagent Master Data" güncellemesi zorunlu §1§ .
2. **Stand-by'a alma.** Cihaz minimum 5 dk stand-by konumunda olmalı, ardından "Calibration → Full Profile" menüsünden tüm test panelleri seçilir.
3. **Kalibratör + kontrol koşumu.** PreciControl ClinChem Multi 1/2 ile birlikte üretici tarafından önerilen kalibratör seti yüklenir §3§ .
4. **Sonuç doğrulama.** CV % değerleri Tablo 3-A sınırları içinde olmalı (genel hedef CV < %2.5). Sapma durumunda re-run gerekir.
5. **Servis kaydı.** Form SF-117 doldurulur ve müşteri imzasıyla panele yüklenir §4§ .

**Acıbadem özelinde dikkat:** Çerçeve sözleşmenin 7.3 maddesi gereği kalibrasyon raporu en geç 24 saat içinde laboratuvar sorumlusuna iletilmelidir §2§ .

Hazır olduğunuzda servis formunu sizin adınıza ön doldurmamı ister misiniz?`,
    sources: [
      { n: 1, t: 'Cobas 6000 — Servis El Kitabı v4.2.pdf', path: 'Drive › Servis Dokümanları › Roche', snip: 'Bölüm 3.4 — Reaktif değişimi sonrası tam profil kalibrasyon. Stand-by süresi minimum 5 dk olmalıdır…', page: 'Sayfa 47' },
      { n: 2, t: 'Acıbadem Sağlık Grubu Çerçeve Sözleşme 2024.docx', path: 'Drive › Sözleşmeler › Müşteri', snip: '7.3 Kalibrasyon raporları en geç 24 saat içerisinde laboratuvar sorumlusuna iletilecektir…', page: 'Madde 7.3' },
      { n: 3, t: 'PreciControl ClinChem Multi — Ürün Bilgi Notu.pdf', path: 'Drive › Servis Dokümanları › Roche', snip: 'Kontrol setinin önerilen kullanım sıklığı her reaktif değişimi sonrası ve haftada bir tam profilde…', page: 'Sayfa 2' },
      { n: 4, t: 'Servis Formu SF-117 (boş şablon).docx', path: 'Drive › Formlar', snip: 'Saha kalibrasyon servis formu — versiyon 2025.1', page: '1 sayfa' },
    ],
  },
]

export const suggested = [
  'Acıbadem için ön doldurulmuş servis formu üret',
  'Toplam kalibrasyon süresi tahmini ver',
  'Son 6 ay Cobas çağrılarını listele',
  'FSN-2025-04 bültenini özetle',
]
