import type { Dict, ExamCopy } from './types';
import { timeline } from '../data/exams';

const min = (n: number, approx?: boolean) => `${approx ? 'yaklaşık ' : ''}${n} dk`;

const SD1_MODULES: ExamCopy['modules'] = {
  hoeren: {
    summary: 'Kısa günlük konuşmalar, anonslar ve telefon mesajları.',
    teile: [
      'Kısa günlük konuşmalar. Her biri için a, b veya c’yi seçersiniz.',
      'İstasyon ya da mağaza gibi yerlerde yapılan anonslar. Richtig ya da falsch olarak işaretlersiniz.',
      'Telefon mesajları ve kısa anonslar. a, b veya c’yi seçersiniz.',
    ],
  },
  lesen: {
    summary: 'Kısa e-postalar ve mektuplar, ilanlar ve tabelalar.',
    teile: [
      'E-posta ya da mektup gibi iki kısa metin. İfadelerin richtig mi falsch mı olduğuna karar verirsiniz.',
      'İlanlar ve kısa internet sayfaları. Her durum için doğru metni seçersiniz: a ya da b.',
      'Örneğin bir muayenehanede ya da mağazada asılı tabelalar ve duyurular. Richtig ya da falsch olarak işaretlersiniz.',
    ],
  },
  schreiben: {
    summary: 'Bir form doldurun, ardından kısa bir kişisel mesaj yazın.',
    teile: [
      'Eksik beş bilgiyi tamamlayarak bir form doldurun, örneğin bir kurs kaydı.',
      'Üç noktaya değinen, yaklaşık 30 kelimelik kısa bir mesaj yazın, örneğin bir e-posta ya da not.',
    ],
  },
  sprechen: {
    summary: 'Küçük bir grupla yapılan konuşma sınavı: kendinizi tanıtın, soru sorun ve cevaplayın, ricada bulunun.',
    teile: [
      'Anahtar kelimelerle kendinizi tanıtın: ad, yaş, ülke, yaşadığınız yer, diller, meslek ve hobiler. Bir kelimeyi harf harf söylemeniz ya da bir sayı söylemeniz istenebilir.',
      'Kelime kartlarıyla günlük bir konu hakkında soru sorun ve cevaplayın.',
      'Resim kartlarıyla ricada bulunun ve ricalara karşılık verin.',
    ],
  },
};

const SD1_TIPS: ExamCopy['tips'] = [
  { t: 'Kendinizi tanıtmayı ezberleyin', d: 'Sprechen Teil 1 hep aynı bilgileri sorar: ad, yaş, ülke, yaşadığınız yer, diller, meslek ve hobiler. Her biri için net bir cümle hazırlayın ve adınızı harf harf söylemeyi çalışın.' },
  { t: 'Dinlemeden önce soruları okuyun', d: 'Her kayıttan önce soruları okumak için zamanınız olur. Günleri, saatleri ve fiyatları işaretleyin; kayıtlarda tam olarak bunlar sorulur.' },
  { t: 'Mesajda her noktaya değinin', d: 'Schreiben Teil 2’de üç noktanın her biri puan getirir. Her nokta için basit bir cümle, bir noktayı unutan uzun bir metinden daha çok puan kazandırır.' },
  { t: 'Sayılarda hızlanın', d: 'Fiyatlar, telefon numaraları, tarihler ve saatler her bölümde karşınıza çıkar. Normal hızda anlayana kadar yüksek sesle tekrar edin.' },
];

export const tr: Dict = {
  lang: 'tr',
  meta: {
    homeTitle: 'German Exam Simulator | telc, Goethe ve DTZ Deneme Sınavları, Yapay Zekâ ile Konuşma',
    homeDescription: 'telc A1, A2, B1, Goethe-Zertifikat A1, A2, B1 ve DTZ için tam deneme sınavları. Gerçek sınav gibi süreli, sertifika gibi puanlanır, yapay zekâ konuşma partneriyle. Sınav 1 ücretsiz.',
  },

  fx: {
    min,
    parts: (n) => `${n} bölüm`,
    tasks: (n) => `${n} görev`,
    items: (n) => `${n} soru`,
    points: (n) => `${n} puan`,
    unit: (m) => m.unit === 'parts' ? `${m.count} bölüm` : m.unit === 'tasks' ? `${m.count} görev` : m.unit === 'letter' ? '1 mektup' : '1 görev (A veya B)',
    prep: (n) => `+ ${n} dk hazırlık`,
    shared: (n, other) => `${n} dk, ${other} ile ortak`,
    group: 'küçük grup',
    pair: 'partnerle',
    playedOnce: 'her kayıt bir kez',
    chip: (c) => {
      switch (c.t) {
        case 'total': return `toplam ${c.n} puan`;
        case 'passFrom': return `geçme notu ${c.n}`;
        case 'writtenOral': return `${c.w} yazılı + ${c.o} sözlü`;
        case 'sixtyEach': return 'her bölümde %60';
        case 'perSkill': return `4 × ${c.n} puan`;
        case 'minWrittenOral': return `en az ${c.w} yazılı + ${c.o} sözlü`;
        case 'modules': return `${c.n} modül × ${c.max}`;
        case 'passEach': return `her modülde geçme notu ${c.n}`;
        case 'dtzResult': return 'sonuç A2 veya B1';
        case 'dtzSprechen': return 'Sprechen B1 olmalı';
      }
    },
    passShort: (e) => {
      switch (e.id) {
        case 'telc-b1': return '135/225 yazılı · 45/75 sözlü';
        case 'goethe-a2': return '60/100 (en az 45 yazılı + 15 sözlü)';
        case 'goethe-b1': return 'her modülde 60/100';
        case 'dtz': return 'Sprechen’de B1 + bir bölüm daha';
        default: { const r = e.scoring.rows[0]; return `${r.max} puandan ${r.pass}`; }
      }
    },
    list: (items) => items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} ve ${items[items.length - 1]}`,
  },

  moduleName: { hoeren: 'Dinleme', lesen: 'Okuma', sprachbausteine: 'Dil bilgisi ve kelime', schreiben: 'Yazma', sprechen: 'Konuşma' },
  rowLabel: { total: 'Toplam', written: 'Yazılı sınav', oral: 'Sözlü sınav', hl: 'Hören + Lesen', mustB1: 'B1 olmalı' },
  family: {
    telc: { tag: 'telc Deutsch', desc: 'Vize, aile birleşimi, süresiz oturum izni ve vatandaşlık için.' },
    dtz: { tag: 'Deutsch-Test für Zuwanderer', desc: 'Uyum kursunun (Integrationskurs) bitirme sınavı. Tek sınav, sonuç A2 veya B1.' },
    goethe: { tag: 'Goethe-Zertifikat', desc: 'Dünya çapında tanınır. B1 modüllerine ayrı ayrı girilebilir.' },
  },
  levels: { B2: 'Orta üstü', C1: 'İleri', integration: 'Uyum kursu' },

  nav: { how: 'Nasıl çalışır', exams: 'Sınavlar', pricing: 'Fiyatlar', download: 'İndir', language: 'Dil', home: 'Ana sayfa', skip: 'İçeriğe geç' },
  store: { play: 'Google Play', apple: 'App Store', playLong: 'Google Play’den indirin', appleLong: 'App Store’dan indirin' },

  hero: {
    eyebrow: 'telc · Goethe · DTZ | A1 – B1',
    h1a: 'Asıl sınavdan önce',
    h1em: 'sınava girin.',
    lede: 'telc, Goethe ve DTZ standartlarına uygun tam deneme sınavları. Lesen, Hören, Schreiben ve yapay zekâ partnerle sözlü sınav; süresi ve puanlaması gerçek sertifikadaki gibi.',
    rating: 'App Store ve Google Play’de 5,0',
    free: 'Sınav 1 ücretsiz',
  },
  story: {
    eyebrow: 'Baştan sona bir sınav',
    h2: 'Her modül. Her bölüm. Saat işliyor.',
    p: 'Sınavınızı seçin ve aşağı kaydırın. Bölümler, süreler ve puanlama seçtiğiniz sınava göre değişir.',
    note: 'Telefonda uygulamadan örnek görevler görünür. Bölümler, süreler ve puanlama seçtiğiniz sınavın resmî formatına göredir.',
    heads: {
      lesen: 'Saate karşı okuyun.',
      hoeren: 'Sınav hızında dinleyin.',
      schreiben: 'İstenen mektubu yazın.',
      sprechen: 'Size cevap veren bir partnerle konuşun.',
      result: 'Sertifika gibi puanlanır.',
    },
    sprechenLead: 'Çoğu uygulama sözlü sınavı atlar. Burada diğer adayın yerini yapay zekâ partner alır.',
  },
  picker: { exam: 'Sınav', level: 'Seviye', soon: 'yakında' },
  formats: {
    eyebrow: 'Formatınızı seçin',
    h2: 'Üç sınav formatı. Tek simülatör.',
    p: 'Kayıt olduğunuz sınavı seçin. Her seviyede tam deneme sınavları var ve her formatın 1. sınavı ücretsiz.',
    guide: 'Rehber',
    soon: 'YAKINDA',
    dtzScale: 'Hören + Lesen, 45 puan',
    below: 'A2 altı',
    dtzFoot: 'Sprechen belirler: sözlü sınavda B1 yoksa sertifikada A2 yazar.',
  },
  scoring: {
    eyebrow: 'Dürüst puanlama',
    h2: 'Puanların nereye gittiğini bilin.',
    colModule: 'Modül · Bölüm',
    colMax: 'Maks. puan',
    colPass: 'Geçme notu',
    source: 'telc, Goethe-Institut ve g.a.s.t. tarafından yayımlanan sınav yönetmeliklerine dayanır; Eylül 2026’da kontrol edildi.',
  },
  pricing: {
    eyebrow: 'Fiyatlar',
    h2: 'Ücretsiz başlayın. Sınav ayında yükseltin.',
    free: 'Ücretsiz', freePer: 'hesap gerekmez', freeList: ['Her formatın 1. sınavı', 'Süre sınırı yok', 'Günde 1 kez Sprechen'], freeBtn: 'İndir',
    week: 'Haftalık Paket', weekPer: '7 gün tam erişim', weekList: ['Tüm sınavlar açık', 'Günde 2 kez Sprechen', 'Uzun süreli taahhüt yok'], weekBtn: 'Haftalığı al',
    month: 'Aylık Premium', monthPer: 'aylık · istediğiniz zaman iptal', monthList: ['Tüm sınavlar açık', 'Günde 3 kez Sprechen', 'Her ay otomatik yenilenir'], monthBtn: 'Aylığı seç',
    best: 'EN AVANTAJLI',
    fine: 'Fiyatlar bölgeye göre değişir ve uygulamada yerel para biriminizle gösterilir.',
  },
  final: { h2a: 'Sınava daha önce', h2em: 'girmiş gibi girin.', p: 'Uygulamayı indirin ve ilk tam deneme sınavınızı bugün yapın. Sınav 1 ücretsiz, hesap gerekmez.' },
  footer: {
    privacy: 'Gizlilik Politikası',
    contact: 'İletişim',
    disclaimer: 'German Exam Simulator bağımsız bir hazırlık aracıdır; telc gGmbH, g.a.s.t. e.V. veya Goethe-Institut ile bağlantılı değildir ve bu kurumlar tarafından onaylanmamış ya da desteklenmemektedir.',
    languages: 'Diller',
    exams: 'Sınav rehberleri',
  },

  exam: {
    crumbExams: 'Sınavlar',
    written: 'Yazılı sınav',
    oral: 'Sözlü sınav',
    passMark: 'Geçme notu',
    glanceTitle: 'Sınav günü bir bakışta',
    glanceNote: 'Sınav merkezine göre sözlü sınav, yazılı sınavla aynı gün ya da başka bir gün yapılır.',
    prepLabel: 'Hazırlık',
    whoTitle: 'Bu sınava kimler girer?',
    modulesTitle: 'Bölüm bölüm',
    modulesLead: 'Her modülün sizden ne istediği, sınavdaki sırasıyla.',
    scoringTitle: 'Nasıl puanlanır?',
    tipsTitle: 'Nasıl hazırlanılır?',
    faqTitle: 'Sorular ve cevaplar',
    ctaTitle: (e) => `${e.short} sınavının tamamını deneyin`,
    ctaText: 'Tüm bölümleriyle süreli deneme sınavları; yapay zekâ partnerle Sprechen dahil, sertifika gibi puanlanır. Sınav 1 ücretsiz, hesap gerekmez.',
    relatedTitle: 'Diğer sınavlar',
    checked: 'Eylül 2026’da resmî sınav formatıyla karşılaştırıldı.',
    faqDuration: (e, d) => {
      const t = timeline(e);
      const parts = t.written.map((b) => `${b.mods.map((m) => m.de).join(' + ')} ${d.fx.min(b.minutes, b.approx)}`);
      const prep = t.oral.find((b) => b.prep);
      return {
        q: `${e.short} sınavı ne kadar sürer?`,
        a: `Yazılı sınav ${e.written} dakika sürer: ${d.fx.list(parts)}. Sözlü sınav yaklaşık ${e.oral} dakika sürer${prep ? `; öncesinde ${prep.minutes} dakika hazırlık süresi vardır` : ''}.`,
      };
    },
    faqPass: (e, copy) => ({
      q: e.id === 'dtz' ? 'DTZ’de hangi sonuca ihtiyacım var?' : `${e.short} sınavını geçmek için kaç puan gerekir?`,
      a: copy.scoring,
    }),
    faqApp: (e) => ({
      q: `${e.short} sınavına evde nasıl hazırlanabilirim?`,
      a: `German Exam Simulator’da gerçek sınavla aynı bölümlere ve sürelere sahip tam ${e.short} deneme sınavları var; yapay zekâ partnerle Sprechen de dahil. Sonuçlar sertifikadaki gibi puanlanır. Sınav 1 ücretsizdir ve hesap gerektirmez.`,
    }),
  },

  exams: {
    'telc-a1': {
      title: 'telc A1 Sınavı (Start Deutsch 1): Yapısı, Puanlama ve İpuçları 2026',
      description: 'telc A1 sınavı: 65 dakikalık yazılı bölüm, küçük grupla 15 dakikalık konuşma sınavı ve 60 puandan 36 geçme notu. Tüm ayrıntılar ve ipuçları.',
      h1: 'telc A1 sınavı: yapısı, puanlama ve hazırlık',
      lede: 'Start Deutsch 1 / telc Deutsch A1, basit günlük durumlarla Almanca başa çıkıp çıkamadığınızı ölçer: kendinizi tanıtmak, kısa anonsları anlamak ve form doldurmak.',
      purpose: 'A1’e girenlerin çoğu eş veya aile birleşimi vizesi için girer; Alman temsilcilikleri bunun için genellikle temel düzeyde Almanca belgesi ister. telc ve Goethe-Institut, Start Deutsch 1’de aynı görevleri ve aynı puanlamayı kullanır; yani hazırlık birebir aynıdır.',
      modules: SD1_MODULES,
      scoring: 'Hören, Lesen, Schreiben ve Sprechen 15’er puan değerindedir. Sadece toplam puan önemlidir: 60 puandan 36 alırsanız geçersiniz; yani güçlü bir Sprechen, zayıf bir Lesen’i telafi edebilir.',
      tips: SD1_TIPS,
      faq: [
        { q: 'telc A1 ile Goethe A1 aynı mı?', a: 'İkisi de Start Deutsch 1’dir; görevler ve puanlama aynıdır. telc sonucu 60 puan üzerinden verir, Goethe-Institut ise 100’e çevirir. Geçme sınırı ikisinde de %60’tır.' },
        { q: 'Eş vizesi için A1 gerekli mi?', a: 'Çoğu durumda evet. Eş veya aile birleşimi vizesi için Alman temsilcilikleri genellikle Start Deutsch 1 gibi bir A1 sertifikası ister. Ülkenize özel kuralları temsilcilikten öğrenin.' },
      ],
    },
    'telc-a2': {
      title: 'telc A2 Sınavı (Start Deutsch 2): Yapısı, Puanlama ve İpuçları 2026',
      description: 'telc A2 sınavı: 70 dakika Hören, Lesen ve Schreiben, partnerle 15 dakikalık konuşma sınavı ve 60 puandan 36 geçme notu.',
      h1: 'telc A2 sınavı: yapısı, puanlama ve hazırlık',
      lede: 'Start Deutsch 2 / telc Deutsch A2, rutin durumları Almanca yönetebildiğinizi gösterir: randevular, alışveriş ve işten, okuldan ya da doktordan gelen kısa mesajlar.',
      purpose: 'Birçok kişi A2’yi A1 ile B1 arasında bir ara hedef olarak alır. Bazı işverenler ve eğitim programları bu seviyeyi ister; B1’e kaydolmadan önce de iyi bir ölçüdür.',
      modules: {
        hoeren: {
          summary: 'Telefon mesajları, radyo anonsları ve daha uzun bir konuşma.',
          teile: [
            'Telefon mesajları. Saat ya da numara gibi önemli bilgilerle kısa notları tamamlarsınız.',
            'Haberler, hava durumu ya da trafik gibi kısa radyo anonsları.',
            'Beş görevli bir günlük konuşma.',
          ],
        },
        lesen: { summary: 'Her biri beş görevli üç bölüm. Kısa mektuplar, duyurular ve ilanlar okursunuz.' },
        schreiben: {
          summary: 'Bir form doldurun, ardından kısa bir kişisel mesaj yazın.',
          teile: [
            'Kişisel bilgilerle bir form doldurun.',
            'Verilen noktalara değinen kısa bir kişisel mesaj yazın, örneğin bir arkadaşa ya da iş arkadaşına e-posta.',
          ],
        },
        sprechen: {
          summary: 'Partner ve sınav görevlisiyle bir sohbet; genellikle yazılı sınavdan hemen sonra ve hazırlık süresi olmadan.',
          teile: [
            'Kendinizle ilgili sorular sorun ve cevaplayın.',
            'Kendinizden ve günlük hayatınızdan bahsedin.',
            'Partnerinizle bir konuda anlaşın, örneğin bir buluşma saati.',
          ],
        },
      },
      scoring: 'Hören, Lesen, Schreiben ve Sprechen 15’er puan değerindedir. Sadece toplam puan önemlidir: 60 puandan 36 alırsanız geçersiniz.',
      tips: [
        { t: 'Telefon notu almayı çalışın', d: 'Telefon mesajları Hören’in büyük bir kısmını oluşturur. İsimleri, saatleri ve numaraları ilk dinleyişte yakalamayı çalışın.' },
        { t: '50 dakikayı planlayın', d: 'Lesen ve Schreiben aynı zaman dilimini paylaşır. Çoğu aday okumaya fazla zaman ayırır; form ve mesaj için en az 15 dakika bırakın.' },
        { t: 'Mesajdaki her noktayı cevaplayın', d: 'Mesaj öncelikle içeriğe göre puanlanır. Her noktaya ayrı ve net bir cümle yazın; hitap ve kapanışı unutmayın.' },
        { t: 'Plan yapmayı prova edin', d: 'Sprechen Teil 3’te partnerinizle pazarlık edersiniz. Öneri, kabul ve ret kalıplarını çalışın: Wie wäre es mit …? Das passt mir gut. Leider kann ich da nicht.' },
      ],
      faq: [
        { q: 'Konuşma sınavından önce hazırlık süresi var mı?', a: 'Genellikle hayır. Sözlü sınav çoğunlukla yazılı sınavın hemen ardından yapılır; bu yüzden not almadan cevap vermeyi çalışın.' },
        { q: 'telc A2 ile Goethe A2 arasındaki fark ne?', a: 'İkisi de A2 seviyesini ölçer ama görevleri ve puanlaması farklıdır. telc A2 60 puan üzerinden değerlendirilir ve toplam puan için tek bir geçme sınırı vardır. Goethe A2 ise her beceriye 25 puan verir ve hem yazılı hem sözlü bölümde asgari puan ister.' },
      ],
    },
    'telc-b1': {
      title: 'telc B1 Sınavı (Zertifikat Deutsch): Yapısı, Puanlama ve İpuçları 2026',
      description: 'telc B1: 150 dakikalık yazılı sınav, 20 dakika hazırlığın ardından 15 dakikalık sözlü sınav. 225 yazılı puandan 135, 75 sözlü puandan 45 ile geçilir.',
      h1: 'telc B1 sınavı: yapısı, puanlama ve hazırlık',
      lede: 'Zertifikat Deutsch / telc Deutsch B1, Almanca günlük durumların çoğunu tek başınıza halledebildiğinizi gösterir: işte, resmî dairelerde ve sohbette.',
      purpose: 'B1, Alman vatandaşlığı ve çoğu durumda süresiz oturum izni (Niederlassungserlaubnis) için gereken seviyedir. Birçok işveren de bu seviyeyi ister.',
      modules: {
        lesen: {
          summary: 'Genel anlamı, ayrıntıyı ve hızlı taramayı ölçen üç okuma görevi.',
          teile: [
            'Globalverstehen: beş kısa metni on başlık arasından doğru olanla eşleştirin.',
            'Detailverstehen: uzunca bir metin okuyup beş soruyu cevaplayın (a, b veya c).',
            'Selektives Verstehen: on duruma, on iki ilan arasından doğru ilanı bulun.',
          ],
        },
        sprachbausteine: {
          summary: 'Bağlam içinde dil bilgisi ve kelime: boşluklu iki mektup.',
          teile: [
            'On boşluklu bir mektup. Her boşluk için a, b veya c’yi seçersiniz.',
            'On boşluklu ikinci bir mektup; boşlukları bir kelime listesinden doldurursunuz.',
          ],
        },
        hoeren: {
          summary: 'Radyo, anonslar ve konuşmalar; genel anlam, ayrıntı ve belirli bilgi açısından.',
          teile: [
            'Globalverstehen: her biri bir ifadeli beş kısa metin, richtig ya da falsch.',
            'Detailverstehen: uzunca bir konuşma ya da röportaj, on ifade, richtig ya da falsch.',
            'Selektives Verstehen: beş kısa anons ya da mesaj, richtig ya da falsch.',
          ],
        },
        schreiben: {
          summary: 'Bir duruma cevap veren ve dört yönlendirme noktasını (Leitpunkte) kapsayan kişisel ya da yarı resmî bir mektup.',
        },
        sprechen: {
          summary: 'Tüm görev kâğıtlarıyla 20 dakikalık hazırlığın ardından, iki sınav görevlisi önünde yapılan ikili sınav.',
          teile: [
            'Kontaktaufnahme: soru sorup cevaplayarak partnerinizi tanıyın.',
            'Gespräch über ein Thema: ikiniz de farklı bir kısa metin okudunuz; metninizi anlatır ve konuyu tartışırsınız.',
            'Gemeinsam etwas planen: birlikte bir etkinlik planlayıp ayrıntılarda anlaşın.',
          ],
        },
      },
      scoring: 'Yazılı ve sözlü bölümler ayrı puanlanır: yazılıda 225 puandan 135, sözlüde 75 puandan 45 almanız gerekir. Sözlü sınavda Teil 1 sadece 15 puan, Teil 2 ve Teil 3 ise 30’ar puan değerindedir.',
      tips: [
        { t: 'Sprachbausteine okuma sürenizi yemesin', d: 'Leseverstehen ve Sprachbausteine 90 dakikayı paylaşır. Her bölüm için kendinize süre sınırı koyun ki sondaki ilan görevi aceleye gelmesin.' },
        { t: '20 dakikalık hazırlığı iyi kullanın', d: 'Sözlü sınavdan önce tüm görev kâğıtlarını görürsünüz. Teil 2’deki metniniz için anahtar kelimeler, Teil 3’teki plan için fikirler not edin; tam cümle yazmayın.' },
        { t: 'Dört Leitpunkt’un hepsine değinin', d: 'Mektup, her yönlendirme noktasına değinip değinmediğinize göre puanlanır. Her nokta için kısa bir paragraf planlayın, uygun bir hitap ve kapanış ekleyin.' },
        { t: 'En çok Teil 2 ve Teil 3’ü çalışın', d: 'Bu ikisi 75 sözlü puanın 60’ını oluşturur. Kısa bir metni kendi cümlelerinizle anlatmayı ve partnerinizin önerilerine karşılık vermeyi çalışın.' },
      ],
      faq: [
        { q: 'Sadece kaldığım bölümü tekrar edebilir miyim?', a: 'Evet. Yazılı ya da sözlü bölümden birini geçtiyseniz diğerini tek başına tekrarlayabilirsiniz; bu genellikle bir kez ve belirli bir süre içinde mümkündür. Kesin koşulları sınav merkezinize sorun.' },
        { q: 'telc B1 vatandaşlık için kabul ediliyor mu?', a: 'Evet. telc B1 sertifikası vatandaşlık başvurusunda dil belgesi olarak kabul edilir; Goethe-Zertifikat B1 (dört modülün tamamı) ve B1 seviyesindeki bir DTZ sonucu da öyle.' },
      ],
    },
    dtz: {
      title: 'DTZ Sınavı (Deutsch-Test für Zuwanderer): Yapısı ve Puanlama 2026',
      description: 'DTZ: 100 dakikalık yazılı sınav ve yaklaşık 16 dakikalık konuşma. Tek sınav, sonuç A2 veya B1. Puanlama nasıl işler, B1 için ne gerekir?',
      h1: 'DTZ sınavı: yapısı, puanlama ve B1’e giden yol',
      lede: 'Deutsch-Test für Zuwanderer, uyum kursunun (Integrationskurs) Almanca bitirme sınavıdır. Tek bir sınava girersiniz; sonuç, A2’ye mi yoksa B1’e mi ulaştığınızı gösterir.',
      purpose: 'B1 seviyesindeki bir DTZ sonucu, vatandaşlık ve süresiz oturum izni için dil belgesi olarak geçerlidir. Sınav, Federal Göç ve Mülteciler Dairesi (BAMF) adına geliştirilmiştir.',
      modules: {
        hoeren: {
          summary: 'Toplam 20 görevli dört bölüm. Her kayıt yalnızca bir kez çalınır.',
          teile: [
            'Kısa anonslar, örneğin telefonda.',
            'Haberler, hava durumu ya da trafik gibi kısa radyo metinleri.',
            'Dört günlük konuşma.',
            'Birkaç kişi bir konu hakkındaki görüşünü söyler; siz de ifadeleri eşleştirirsiniz.',
          ],
        },
        lesen: {
          summary: 'Rehber panolardan resmî mektuba kadar, 25 görevli beş bölüm.',
          teile: [
            'Bir bina panosu ya da katalog gibi rehberler ve listeler.',
            'İlanlar: her durum için doğru ilanı bulun.',
            'Basın metinleri ve resmî duyurular.',
            'Bilgilendirme broşürleri.',
            'Boşluklu bir resmî mektup.',
          ],
        },
        schreiben: {
          summary: 'Bir mektup ya da e-posta. A veya B görevini seçer ve dört noktanın hepsine değinirsiniz; örneğin ev sahibine, bir resmî daireye ya da bir şirkete.',
        },
        sprechen: {
          summary: 'Yaklaşık 16 dakikalık ikili sınav. B1’e ulaşıp ulaşamayacağınızı Sprechen belirler.',
          teile: [
            'Kendinizi tanıtın; ardından sınav görevlisi ek sorular sorar.',
            'Bir resmi anlatın ve konuyla ilgili kendi deneyiminizden bahsedin.',
            'Partnerinizle birlikte bir şey planlayın.',
          ],
        },
      },
      scoring: 'Tek sınav, iki seviye. Sprechen’de B1’e ulaşır, ayrıca Hören + Lesen’de ya da Schreiben’de de B1 alırsanız sonucunuz B1 olur. Hören + Lesen’de B1, 45 puandan 33’te, A2 ise 20’de başlar.',
      tips: [
        { t: 'Önce Sprechen', d: 'Sözlü sınavda B1 yoksa, ne kadar iyi yazarsanız yazın sertifikada B1 yazmaz. Üç bölümü de sesli çalışın, mümkünse bir partnerle.' },
        { t: 'Sınavdaki gibi bir kez dinleyin', d: 'Her kayıt yalnızca bir kez çalınır. Her metinden önce soruları okuyun ve kayıtları yalnızca bir kez dinleyerek çalışın.' },
        { t: 'Dört noktayı taslak olarak kullanın', d: 'Schreiben’de görevdeki her nokta bir cevap ister. Her nokta için bir iki cümle yazın, resmî bir hitap ve kapanış kullanın.' },
        { t: 'Sınırları bilin', d: 'Hören + Lesen’de B1 için 45 puandan 33, A2 için 20 puan gerekir. Her deneme sınavında puanınızı sayın ki ne kadar kaldığını bilin.' },
      ],
      faq: [
        { q: 'Vatandaşlık için DTZ’den hangi sonuç gerekiyor?', a: 'Vatandaşlık için B1 gerekir. DTZ’de bu, Sprechen’de B1 ve ayrıca Hören + Lesen’de ya da Schreiben’de B1 demektir.' },
        { q: 'DTZ, telc B1’den daha mı kolay?', a: 'Daha kolay değil, farklı. DTZ, A2 ve B1’i tek sınavda ölçüp sizi bir seviyeye yerleştirir; telc B1 ise yalnızca B1 seviyesinde, geçilen ya da kalınan bir sınavdır.' },
      ],
    },
    'goethe-a1': {
      title: 'Goethe A1 Sınavı (Start Deutsch 1): Yapısı, Puanlama ve İpuçları 2026',
      description: 'Goethe-Zertifikat A1: Start Deutsch 1. Hören, Lesen ve Schreiben yaklaşık 65 dakika, Sprechen yaklaşık 15 dakika sürer. 100 puandan 60 ile geçilir.',
      h1: 'Goethe A1 sınavı: yapısı, puanlama ve hazırlık',
      lede: 'Goethe-Zertifikat A1: Start Deutsch 1, kendinizi tanıtmaktan kısa anonsları anlamaya kadar basit günlük durumlarla Almanca başa çıkıp çıkamadığınızı ölçer.',
      purpose: 'Alman temsilciliklerinin eş veya aile birleşimi vizesi için temel Almanca belgesi olarak kabul ettiği sertifikalardan biridir. Görevler, telc’in Start Deutsch 1 sınavıyla aynıdır.',
      modules: SD1_MODULES,
      scoring: 'Hören, Lesen, Schreiben ve Sprechen 25’er puan değerindedir. Sadece toplam puan önemlidir: 100 puandan 60 alırsanız geçersiniz.',
      tips: SD1_TIPS,
      faq: [
        { q: 'Goethe A1 modüllerine ayrı ayrı girebilir miyim?', a: 'Hayır. Goethe B1’in aksine Start Deutsch 1 bir bütün olarak yapılır: dört bölümün hepsine birden girersiniz.' },
        { q: 'Goethe A1 ile telc A1 aynı mı?', a: 'İkisi de Start Deutsch 1’dir; görevler ve puanlama aynıdır. Goethe-Institut sonucu 100 puan, telc ise 60 puan üzerinden verir. Geçme sınırı ikisinde de %60’tır.' },
      ],
    },
    'goethe-a2': {
      title: 'Goethe A2 Sınavı: Yapısı, Puanlama ve İpuçları 2026',
      description: 'Goethe-Zertifikat A2: Lesen, Hören ve Schreiben yaklaşık 90 dakika, Sprechen yaklaşık 15 dakika. 100 puandan 60 ile geçilir; en az 45 yazılı ve 15 sözlü puan gerekir.',
      h1: 'Goethe A2 sınavı: yapısı, puanlama ve hazırlık',
      lede: 'Goethe-Zertifikat A2, bir bilgi panosunu okumaktan randevu ayarlamaya kadar tanıdık, rutin durumlarla Almanca başa çıkıp çıkamadığınızı ölçer.',
      purpose: 'A2, A1 ile B1 arasında sık seçilen bir ara hedeftir. Bazı işverenler ve eğitim programları bu seviyeyi ister; Goethe sertifikaları dünya çapında tanınır.',
      modules: {
        lesen: {
          summary: 'Dört bölüm: bir gazete haberi, bir bilgi panosu, bir e-posta ve ilanlar.',
          teile: [
            'Kısa bir gazete haberi, beş soru (a, b veya c).',
            'Örneğin bir mağazanın kat rehberi gibi bir bilgi panosu, beş soru.',
            'Bir e-posta, beş soru (a, b veya c).',
            'İlanlar: beş durumu doğru ilanla eşleştirin.',
          ],
        },
        hoeren: { summary: 'Her biri beş görevli dört bölüm: radyo programları, konuşmalar, telesekreter mesajları ve anonslar.' },
        schreiben: {
          summary: 'İki kısa metin: biri bir arkadaşa, biri yarı resmî.',
          teile: [
            '20–30 kelimelik bir kısa mesaj (SMS).',
            '30–40 kelimelik bir e-posta, örneğin bir öğretmene ya da iş arkadaşına.',
          ],
        },
        sprechen: {
          summary: 'Yaklaşık 15 dakikalık ikili sınav.',
          teile: [
            'Kelime kartlarıyla partnerinize kendisiyle ilgili sorular sorun ve onun sorularını cevaplayın.',
            'Hayatınızdan bahsedin: bir karttaki soruyu cevaplayın, örneğin hafta sonlarınızı nasıl geçirdiğinizi.',
            'Birlikte bir şey planlayın, örneğin ajandalarınıza bakarak buluşmak için bir zaman bulun.',
          ],
        },
      },
      scoring: 'Her beceri 25 puan değerindedir. Toplamda 100 puandan 60 almanız gerekir; bunun en az 45’i (75 üzerinden) yazılı bölümden, en az 15’i (25 üzerinden) Sprechen’den gelmelidir. Yani güçlü bir yazılı bölüm zayıf bir sözlüyü kurtaramaz.',
      tips: [
        { t: 'Kelimelerinizi sayın', d: 'SMS 20–30, e-posta 30–40 kelime ister. Bu aralıkları tutturmayı çalışın ki süre yetmeden her noktaya değinebilesiniz.' },
        { t: 'Bilgi panosunu tarayın', d: 'Lesen Teil 2, hangi katta ne satıldığı gibi bilgileri hızlı bulmakla ilgilidir. Her satırı okumak yerine anahtar kelimeleri arayın.' },
        { t: 'Hayatınızı A2 cümleleriyle hazırlayın', d: 'Sprechen Teil 2’de kendinizden bahsedersiniz. İş, aile, boş zaman ve yaşadığınız yer hakkında basit cümleler hazır olsun.' },
        { t: 'Randevu ayarlamayı çalışın', d: 'Teil 3 bir randevu görevidir. Hast du am Montag Zeit? ve Um 10 Uhr kann ich leider nicht gibi kalıpları öğrenin.' },
      ],
      faq: [
        { q: 'İyi bir yazılı sonuç zayıf bir Sprechen’i telafi eder mi?', a: 'Sadece kısmen. Yazılı bölümde ne kadar iyi olursanız olun, Sprechen’de 25 puandan en az 15 almanız gerekir.' },
        { q: 'Goethe A2 sınavı modüler mi?', a: 'Hayır. Goethe B1’in aksine A2 sınavı bir bütün olarak yapılır.' },
      ],
    },
    'goethe-b1': {
      title: 'Goethe B1 Sınavı: Yapısı, Puanlama ve İpuçları 2026',
      description: 'Goethe-Zertifikat B1: ayrı puanlanan dört modül, her biri 100 puandan 60 ile geçilir. Lesen 65 dk, Hören 40, Schreiben 60, Sprechen 15.',
      h1: 'Goethe B1 sınavı: yapısı, puanlama ve hazırlık',
      lede: 'Goethe-Zertifikat B1, Almancayı bağımsız kullanabildiğinizi gösterir: bir tartışmanın ana noktalarını takip etmek, görüşünüzü içeren bir e-posta yazmak ve kısa bir sunum yapmak.',
      purpose: 'B1, Alman vatandaşlığı ve çoğu durumda süresiz oturum izni için gereken seviyedir. Goethe B1 modülerdir: dört modüle birlikte ya da tek tek girebilirsiniz.',
      modules: {
        lesen: {
          summary: '30 görevli beş bölüm: bir blog yazısı, basın haberleri, ilanlar, okur yorumları ve bina kuralları.',
          teile: [
            'Bir blog yazısı ya da e-posta: altı ifade, richtig ya da falsch.',
            'İki basın haberi, her birinde üç soru (a, b veya c).',
            'İlanlar: yedi durum için on ilan arasından doğru olanı bulun.',
            'Bir konu hakkında yedi okur yorumu: kişi konudan yana mı, değil mi (ja ya da nein)?',
            'Bina kuralları gibi kurallar veya talimatlar, dört soru (a, b veya c).',
          ],
        },
        hoeren: {
          summary: '30 görevli dört bölüm: kısa anonslar, bir konuşma, bir sohbet ve bir radyo tartışması.',
          teile: [
            'Anons ya da mesaj gibi beş kısa metin, her birinde iki görev. İki kez dinlenir.',
            'Örneğin rehberli bir tur gibi bir konuşma, beş soru. Bir kez dinlenir.',
            'Yedi richtig/falsch ifadeli bir sohbet. Bir kez dinlenir.',
            'Bir radyo tartışması: sekiz ifadeyi konuşmacılarla eşleştirin. İki kez dinlenir.',
          ],
        },
        schreiben: {
          summary: '60 dakikada iki e-posta ve bir forum yazısı.',
          teile: [
            'Bir arkadaşa yaklaşık 80 kelimelik gayriresmî bir e-posta.',
            'Bir konu hakkındaki görüşünüzü anlattığınız, yaklaşık 80 kelimelik bir forum yazısı.',
            'Yaklaşık 40 kelimelik kısa ve resmî bir e-posta, örneğin özür dilemek ya da bir şey rica etmek için.',
          ],
        },
        sprechen: {
          summary: '15 dakikalık hazırlığın ardından yapılan ikili sınav.',
          teile: [
            'Partnerinizle birlikte bir şey planlayın.',
            'Beş slayt eşliğinde bir konu hakkında kısa bir sunum yapın.',
            'Partnerinizin sunumuna geri bildirim verip bir soru sorun, kendi sunumunuzla ilgili soruları cevaplayın.',
          ],
        },
      },
      scoring: 'Her modül 100 puan üzerinden ayrı puanlanır ve 60 puandan itibaren geçilir. Sprechen’de Teil 2’deki sunum tek başına 100 puanın 40’ını getirir.',
      tips: [
        { t: 'Lesen’de saate dikkat', d: '30 görev için 65 dakika dardır. İlan görevini (Teil 3) tarayarak çözün ve basın haberleri için yeterli zaman bırakın.' },
        { t: 'Kelime sayısını tutturun', d: 'Aufgabe 1 ve 2 yaklaşık 80, Aufgabe 3 yaklaşık 40 kelime ister. Her noktayı cevaplayın: eksik bir nokta, birkaç dil bilgisi hatasından daha çok puan kaybettirir.' },
        { t: 'Sunumunuzu yapılandırın', d: 'Teil 2, 40 puan değerindedir. Beş slaytı izleyin: konu, kendi deneyiminiz, ülkenizdeki durum, görüşünüzle birlikte artılar ve eksiler, kapanış.' },
        { t: 'Partnerinize bir soru hazırlayın', d: 'Teil 3’te partnerinizin sunumuna karşılık verirsiniz. O konuşurken soru sorabileceğiniz bir ayrıntıyı not edin.' },
      ],
      faq: [
        { q: 'Goethe B1 modüllerine ayrı ayrı girebilir miyim?', a: 'Evet. Sınav modülerdir: dört modüle aynı gün ya da tek tek girebilirsiniz; geçtiğiniz her modül ayrıca belgelenir.' },
        { q: 'Vatandaşlık için dört modülün hepsi gerekli mi?', a: 'Evet. Vatandaşlık ve süresiz oturum izni için makamlar dört becerinin hepsinde B1 bekler; yani her modülü geçmiş olmanız gerekir.' },
      ],
    },
  },
};
