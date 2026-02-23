export type BlogLocale = "tr" | "en" | "ar";

export interface BlogPostContent {
  title: string;
  excerpt: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  date: string;
  image: string;
  content: Record<BlogLocale, BlogPostContent>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "led-aydinlatma-trendleri-2025",
    date: "2025-02-01",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
    content: {
      tr: {
        title: "LED Aydınlatma Trendleri 2025",
        excerpt:
          "Yeni nesil LED teknolojileri, akıllı aydınlatma sistemleri ve mekân tasarımında öne çıkan trendler; sektörün nereye evrildiğini anlamak için rehber.",
        body: [
          "2025 yılında LED aydınlatma sektörü, enerji verimliliğinin ötesinde kullanıcı deneyimi ve mekânla bütünleşen çözümler sunuyor. Artık sadece ışık kaynağı değil; renk sıcaklığı ayarlanabilir, insan odaklı (HCL) ve akıllı senaryolarla yönetilebilir sistemler talep görüyor.",
          "Mimari aydınlatmada çizgisel (linear) ürünler ve gizli entegrasyon öne çıkıyor. Tavan ve duvar birleşimlerinde devam eden şerit LED’ler, ofis ve perakende mekânlarda sade bir görünüm ve homojen aydınlatma sağlıyor. Aynı zamanda ray spot ve sıva altı armatürlerde daha kompakt formlar ve yüksek lümen çıkışı öne çıkan özellikler arasında.",
          "Sürdürülebilirlik, üreticiler ve proje sahipleri için belirleyici olmaya devam ediyor. Düşük karbon ayak izi, uzun ömür ve geri dönüştürülebilir malzeme kullanımı hem sertifikasyonlarda hem de ihale şartnamelerinde daha sık aranıyor. LED’ler bu beklentiyi uzun kullanım ömrü ve düşük enerji tüketimiyle karşılıyor.",
          "Son olarak, konut ve ticari projelerde Wi‑Fi ve Bluetooth tabanlı akıllı kontrol sistemleri yaygınlaşıyor. Tek bir uygulama üzerinden aydınlatma senaryolarını yönetmek, enerji tasarrufu sağlamak ve konforu artırmak mümkün. Asialux olarak bu trendleri ürün gamımızda ve proje çözümlerimizde takip ediyoruz.",
        ],
      },
      en: {
        title: "LED Lighting Trends 2025",
        excerpt:
          "Next-generation LED technologies, smart lighting systems, and key trends in spatial design: a guide to where the industry is heading.",
        body: [
          "In 2025, the LED lighting sector is delivering more than energy efficiency: it is about user experience and solutions that integrate with the space. Products are no longer just light sources; tunable colour temperature, human-centric (HCL) and smart scenario-based systems are in demand.",
          "In architectural lighting, linear products and concealed integration stand out. Continuous strip LEDs along ceiling and wall junctions provide a clean look and even illumination in offices and retail. At the same time, track spots and recessed luminaires are trending towards more compact forms and higher lumen output.",
          "Sustainability remains a key factor for manufacturers and project owners. Low carbon footprint, long life and recyclable materials are increasingly required in certifications and tender specifications. LEDs meet these expectations with long service life and low energy consumption.",
          "Finally, Wi‑Fi and Bluetooth-based smart control systems are becoming common in residential and commercial projects. Managing lighting scenarios, saving energy and improving comfort from a single app is now standard. At Asialux we follow these trends in our product range and project solutions.",
        ],
      },
      ar: {
        title: "اتجاهات إضاءة LED 2025",
        excerpt:
          "تقنيات LED من الجيل الجديد وأنظمة الإضاءة الذكية والاتجاهات البارزة في تصميم الفضاء: دليل لفهم اتجاه القطاع.",
        body: [
          "في عام 2025، يقدم قطاع إضاءة LED أكثر من كفاءة الطاقة: إنه يركز على تجربة المستخدم والحلول المتكاملة مع الفضاء. المنتجات لم تعد مجرد مصدر ضوء؛ الأنظمة القابلة لضبط درجة حرارة اللون والمركزة على الإنسان (HCL) والذكية حسب السيناريو مطلوبة.",
          "في الإضاءة المعمارية، تبرز المنتجات الخطية والتكامل المخفي. شرائط LED المستمرة عند تقاطعات السقف والجدار توفر مظهراً أنيقاً وإضاءة متجانسة في المكاتب والتجزئة. في الوقت نفسه، تميل سبوتات الريل والثريات المدمجة إلى أشكال أصغر وإخراج لومن أعلى.",
          "الاستدامة لا تزال عاملاً حاسماً للمصنعين وأصحاب المشاريع. البصمة الكربونية المنخفضة والعمر الطويل والمواد القابلة لإعادة التدوير مطلوبة بشكل متزايد في الشهادات ومواصفات المناقصات. تلبي مصابيح LED هذه التوقعات بعمر خدمة طويل واستهلاك منخفض للطاقة.",
          "أخيراً، أنظمة التحكم الذكية القائمة على Wi‑Fi و Bluetooth أصبحت شائعة في المشاريع السكنية والتجارية. إدارة سيناريوهات الإضاءة وتوفير الطاقة وتحسين الراحة من تطبيق واحد أصبح معياراً. في أسيا لوكس نتابع هذه الاتجاهات في مجموعتنا من المنتجات وحلول المشاريع.",
        ],
      },
    },
  },
  {
    slug: "dis-mekan-aydinlatma-ipuclari",
    date: "2025-01-15",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
    content: {
      tr: {
        title: "Dış Mekan Aydınlatması İpuçları",
        excerpt:
          "Peyzaj, cephe ve güvenlik aydınlatmasında doğru ürün seçimi, IP sınıfları ve proje uygulama önerileri.",
        body: [
          "Dış mekân aydınlatması hem estetik hem işlevsel hedefleri bir arada karşılamalıdır. Yaya yolları, otoparklar ve girişlerde yeterli ve yansımaya yol açmayan düzgün dağılımlı ışık, güvenlik ve konforu artırır. Cephe ve peyzajda ise vurgulama ve atmosfer ön plandadır.",
          "Ürün seçiminde IP (koruma sınıfı) kritiktir. Toz ve suya karşı dayanım, ürünün ömrünü ve güvenilirliğini doğrudan etkiler. Dış mekân için en az IP65, tamamen açık alanlar veya yıkanan bölgeler için IP66 ve üzeri tercih edilmelidir. Ayrıca UV ve sıcaklık değişimine dayanıklı malzeme ve conta kullanımı önemlidir.",
          "Enerji verimliliği için LED dış mekân armatürleri ve sensörlü veya zaman ayarlı sistemler kullanılabilir. Hareket sensörü özellikle güvenlik ve tasarruf açısından anlamlıdır. Işık kirliliğini azaltmak adına aşağı yönlü (downlight) veya perdeli armatürler tercih edilmeli; gökyüzüne doğru ışık kaçışı engellenmelidir.",
          "Proje aşamasında çevre aydınlık seviyeleri, kullanım senaryoları ve bakım erişimi dikkate alınmalıdır. Asialux dış mekân ürün gamında aplik, kazıklı ve gömme tipi armatürlerle farklı ihtiyaçlara uygun çözümler sunuyoruz.",
        ],
      },
      en: {
        title: "Outdoor Lighting Tips",
        excerpt:
          "Right product selection for landscape, façade and security lighting, IP ratings, and practical project advice.",
        body: [
          "Outdoor lighting should meet both aesthetic and functional goals. Adequate, well-distributed light with minimal glare on paths, car parks and entrances improves safety and comfort. On façades and in landscape, accent and atmosphere take the lead.",
          "IP (ingress protection) rating is critical when selecting products. Resistance to dust and water directly affects product life and reliability. For outdoor use, at least IP65 is recommended; IP66 and above for fully exposed or wash-down areas. UV and temperature-resistant materials and gaskets are also important.",
          "For energy efficiency, LED outdoor luminaires and sensor- or time-based controls are effective. Motion sensors are especially useful for security and savings. To reduce light pollution, prefer downlight or shielded luminaires and avoid upward light spill.",
          "At the project stage, ambient light levels, use scenarios and maintenance access should be considered. In the Asialux outdoor range we offer wall, bollard and recessed luminaires to suit different needs.",
        ],
      },
      ar: {
        title: "نصائح إضاءة الخارجية",
        excerpt:
          "اختيار المنتج المناسب لإضاءة المشهد والواجهة والأمان، ودرجات الحماية IP ونصائح تطبيق المشاريع.",
        body: [
          "يجب أن تلبي الإضاءة الخارجية الأهداف الجمالية والوظيفية معاً. الضوء الكافي والمُوزَّع جيداً مع الحد الأدنى من الوهج على الممرات ومواقف السيارات والمداخل يحسّن السلامة والراحة. على الواجهات وفي المشهد، يكون التركيز والأجواء في المقدمة.",
          "تصنيف IP (الحماية من الدخول) حاسم عند اختيار المنتجات. مقاومة الغبار والماء تؤثر مباشرة على عمر المنتج وموثوقيته. للاستخدام الخارجي يُوصى بـ IP65 على الأقل؛ IP66 وما فوق للمناطق المكشوفة أو المعرّضة للغسل. المواد والجوانات المقاومة للأشعة فوق البنفسجية ودرجة الحرارة مهمة أيضاً.",
          "لتحقيق كفاءة الطاقة، ثريات LED الخارجية وأنظمة التحكم بالحساسات أو بالوقت فعّالة. حساسات الحركة مفيدة خاصة للأمان والتوفير. للحد من التلوث الضوئي يُفضّل استخدام الثريات السفلية أو المحمية وتجنب تسرب الضوء نحو الأعلى.",
          "في مرحلة المشروع يجب مراعاة مستويات الإضاءة المحيطة وسيناريوهات الاستخدام ووصول الصيانة. في تشكيلة أسيا لوكس الخارجية نقدم ثريات جدارية وعمودية ومدمجة لتناسب احتياجات مختلفة.",
        ],
      },
    },
  },
  {
    slug: "enerji-tasarruflu-aydinlatma",
    date: "2025-01-05",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    content: {
      tr: {
        title: "Enerji Tasarruflu Aydınlatma Çözümleri",
        excerpt:
          "LED dönüşümü, doğru lümen seçimi ve kontrol sistemleriyle elektrik tüketimini ve maliyeti düşürme rehberi.",
        body: [
          "Aydınlatma, ofis ve perakende binalarında toplam elektrik tüketiminin önemli bir bölümünü oluşturuyor. LED’e geçiş, aynı aydınlık seviyesinde geleneksel sistemlere göre %50–70’e varan enerji tasarrufu sağlayabiliyor. Özellikle uzun çalışma süreli mekânlarda yatırım kendini kısa sürede amorti ediyor.",
          "Doğru ürün seçiminde lümen (ışık çıkışı) ve lümen/watt verimliliği önemlidir. Sadece watt’a bakmak yanıltıcı olabilir; aynı güçte farklı verimlilikte ürünler bulunabiliyor. Proje hedefi, mekândaki aydınlık seviyesi (lux) ve homojen dağılım olmalı; buna göre armatür sayısı ve konumu belirlenmelidir.",
          "Dimmer ve sensör entegrasyonu tasarrufu daha da artırır. Boş alanlarda ışığın kısılması veya kapatılması, gün ışığına göre ayarlama (daylight harvesting) ve hareket sensörleri özellikle ofis ve depolar için anlamlıdır. Akıllı aydınlatma sistemleriyle senaryo bazlı kontrol de mümkündür.",
          "Asialux ürün gamında yüksek verimli LED armatürler, uzun ömür ve düşük bakım maliyeti ile enerji tasarruflu çözümler sunuyoruz. Proje bazlı öneri ve teknik hesaplama için ekibimizle iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Energy-Efficient Lighting Solutions",
        excerpt:
          "A guide to reducing electricity use and cost with LED conversion, correct lumen choice and control systems.",
        body: [
          "Lighting accounts for a significant share of total electricity use in office and retail buildings. Switching to LED can deliver 50–70% energy savings compared with traditional systems at the same light levels. In spaces with long operating hours, the investment pays back quickly.",
          "When selecting products, lumen output and lumens-per-watt efficiency matter. Focusing only on watts can be misleading; products with the same power can have different efficiencies. The project goal should be target illuminance (lux) and even distribution; the number and position of luminaires should be planned accordingly.",
          "Dimmer and sensor integration increases savings further. Dimming or switching off in unoccupied areas, daylight harvesting and motion sensors are especially valuable in offices and warehouses. Scenario-based control is also possible with smart lighting systems.",
          "In the Asialux range we offer high-efficiency LED luminaires with long life and low maintenance cost for energy-efficient solutions. Contact our team for project-specific advice and technical calculations.",
        ],
      },
      ar: {
        title: "حلول الإضاءة الموفرة للطاقة",
        excerpt:
          "دليل لتقليل استهلاك الكهرباء والتكلفة عبر التحول إلى LED واختيار اللومن الصحيح وأنظمة التحكم.",
        body: [
          "تشكل الإضاءة حصة كبيرة من إجمالي استهلاك الكهرباء في المباني المكتبية والتجارية. التحول إلى LED يمكن أن يوفر 50–70٪ من الطاقة مقارنة بالأنظمة التقليدية عند نفس مستويات الإضاءة. في الأماكن ذات ساعات التشغيل الطويلة، الاستثمار يؤتي ثماره بسرعة.",
          "عند اختيار المنتجات، مخرجات اللومن وكفاءة لومن/واط مهمة. الاعتماد فقط على الواط قد يكون مضللاً؛ منتجات بنفس القدرة قد تكون بكفاءات مختلفة. هدف المشروع يجب أن يكون المستوى المستهدف للإضاءة (لوكس) والتوزيع المتجانس؛ يجب تخطيط عدد وموضع الثريات وفقاً لذلك.",
          "تكامل المخفت والحساسات يزيد التوفير أكثر. تخفيف أو إطفاء الضوء في المناطق غير المستخدمة، وجمع ضوء النهار، وحساسات الحركة مفيدة خاصة في المكاتب والمستودعات. التحكم القائم على السيناريو ممكن أيضاً مع أنظمة الإضاءة الذكية.",
          "في تشكيلة أسيا لوكس نقدم ثريات LED عالية الكفاءة بعمر طويل وتكلفة صيانة منخفضة لحلول موفرة للطاقة. تواصل مع فريقنا للحصول على مشورة خاصة بالمشروع وحسابات تقنية.",
        ],
      },
    },
  },
  {
    slug: "ofis-aydinlatmasinda-verimlilik",
    date: "2025-01-28",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    content: {
      tr: {
        title: "Ofis Aydınlatmasında Verimlilik ve Konfor",
        excerpt:
          "Çalışma performansı ve göz sağlığı için ofis aydınlatmasında dikkat edilmesi gerekenler ve güncel standartlar.",
        body: [
          "Ofis aydınlatması, çalışanların görsel konforu ve üretkenliği üzerinde doğrudan etkiye sahiptir. Yetersiz veya kötü dağılımlı ışık göz yorgunluğu ve baş ağrısına yol açabilir; aşırı parlaklık ve yansıma ise ekran üzerinde rahatsız edici olabilir. Bu nedenle hem yatay (masa) hem dikey (duvar, ekran çevresi) aydınlık seviyeleri standartlara uygun planlanmalıdır.",
          "Günümüzde ofis projelerinde genellikle 300–500 lux düzeyinde genel aydınlatma hedeflenir; detaylı işlerde bu değer 750 lux’e kadar çıkabilir. Homojen dağılım için tavan tipi armatürler (sıva altı, sıva üstü veya lineer) sık kullanılır. UGR (birleşik kamaşma sınıfı) değeri düşük ürünler, bilgisayar kullanımı olan ofislerde tercih edilmelidir.",
          "Renk sıcaklığı olarak 4000 K (nötr beyaz) ofis ortamları için yaygındır; daha sıcak tonlar dinlenme alanlarında kullanılabilir. İnsan odaklı aydınlatma (HCL) uygulamalarında gün içinde renk sıcaklığı ve yoğunluk değiştirilerek biyoritme destek verilebiliyor.",
          "Asialux ofis aydınlatması çözümlerinde panel, lineer ve ray spot ürünleriyle geniş bir seçenek sunuyoruz. Projenize özel öneri ve aydınlık hesapları için bizimle iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Efficiency and Comfort in Office Lighting",
        excerpt:
          "What to consider in office lighting for performance and eye comfort, and current standards.",
        body: [
          "Office lighting has a direct impact on visual comfort and productivity. Insufficient or poorly distributed light can cause eye strain and headaches; excessive brightness and glare can be distracting on screens. Therefore both horizontal (desk) and vertical (wall, around screen) illuminance should be planned in line with standards.",
          "Today office projects typically target 300–500 lux general lighting; for detailed tasks this can go up to 750 lux. Recessed, surface-mounted or linear ceiling luminaires are commonly used for even distribution. Products with low UGR (unified glare rating) are preferred in offices with computer use.",
          "A colour temperature of 4000 K (neutral white) is common for offices; warmer tones can be used in breakout areas. In human-centric lighting (HCL) applications, colour temperature and intensity can be varied through the day to support circadian rhythm.",
          "In Asialux office lighting solutions we offer a wide choice of panel, linear and track spot products. Contact us for project-specific advice and illuminance calculations.",
        ],
      },
      ar: {
        title: "الكفاءة والراحة في إضاءة المكاتب",
        excerpt:
          "ما يجب مراعاته في إضاءة المكاتب من أجل الأداء وراحة العين والمعايير الحالية.",
        body: [
          "إضاءة المكاتب لها تأثير مباشر على الراحة البصرية والإنتاجية. الضوء غير الكافي أو الموزع بشكل سيء يسبب إجهاد العين والصداع؛ السطوع والوهج الزائدان قد يكونان مزعجين على الشاشات. لذلك يجب تخطيط الإضاءة الأفقية (المكتب) والعمودية (الجدار، حول الشاشة) وفقاً للمعايير.",
          "اليوم تستهدف مشاريع المكاتب عادة 300–500 لوكس إضاءة عامة؛ للأعمال التفصيلية يمكن أن تصل إلى 750 لوكس. الثريات السقفية المدمجة أو السطحية أو الخطية شائعة للتوزيع المتجانس. المنتجات ذات UGR (معدل الوهج الموحد) المنخفض مُفضّلة في المكاتب التي تستخدم الحاسوب.",
          "درجة حرارة لون 4000 K (أبيض محايد) شائعة للمكاتب؛ الدرجات الأدفأ يمكن استخدامها في مناطق الاستراحة. في تطبيقات الإضاءة المركزة على الإنسان (HCL) يمكن تغيير درجة حرارة اللون والشدة خلال اليوم لدعم الإيقاع اليومي.",
          "في حلول أسيا لوكس لإضاءة المكاتب نقدم تشكيلة واسعة من منتجات اللوحات والخطية وسبوت الريل. تواصل معنا للحصول على مشورة خاصة بالمشروع وحسابات الإضاءة.",
        ],
      },
    },
  },
  {
    slug: "tavan-aydinlatmasi-secimi",
    date: "2025-01-20",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80",
    content: {
      tr: {
        title: "Tavan Aydınlatması Seçerken Dikkat Edilecekler",
        excerpt:
          "Sıva altı, sıva üstü ve asma tavan uygulamalarında doğru armatür seçimi ve montaj önerileri.",
        body: [
          "Tavan aydınlatması, mekânın genel atmosferini ve işlevselliğini belirleyen ana unsurdur. Seçim yaparken tavan yüksekliği, kullanım amacı ve mevcut tesisat (asma tavan, beton tavan vb.) dikkate alınmalıdır. Yanlış seçim yetersiz aydınlatma veya gereksiz enerji tüketimine yol açabilir.",
          "Sıva altı (gömme) armatürler, düz ve modern bir görünüm istenen ofis, mağaza ve konut projelerinde sık kullanılır. Montaj öncesi çerçeve ve boşluk ölçüleri doğru planlanmalı; yangına dayanımlı tavanlarda ilgili standartlara uygun ürünler tercih edilmelidir. Sıva üstü armatürler ise tadilatı kolay ve hızlı çözümler sunar; özellikle mevcut tavanın delinmesinin istenmediği durumlarda idealdir.",
          "Asma tavan (alçıpan, mineral vb.) uygulamalarında armatürün ağırlığı ve boyutu taşıma kapasitesi ile uyumlu olmalıdır. Lineer ve panel ürünler bu tür uygulamalarda homojen aydınlatma ve estetik bütünlük sağlar. Ray spot sistemleri ise yönlendirilebilir ışık ile vurgulama ve esneklik sunar.",
          "Asialux tavan aydınlatması ürün gamında sıva altı, sıva üstü, lineer ve ray spot seçenekleriyle projenize uygun çözümü bulabilirsiniz. Teknik çizim ve montaj detayları için kataloglarımıza ve ekibimize ulaşabilirsiniz.",
        ],
      },
      en: {
        title: "What to Consider When Choosing Ceiling Lighting",
        excerpt:
          "Right luminaire choice and mounting advice for recessed, surface-mounted and suspended ceiling applications.",
        body: [
          "Ceiling lighting is the main element that defines the overall atmosphere and functionality of a space. When choosing, consider ceiling height, purpose of use and existing construction (suspended ceiling, concrete, etc.). Wrong choices can lead to insufficient light or unnecessary energy use.",
          "Recessed (flush) luminaires are common in offices, retail and residential projects where a flat, modern look is desired. Frame and cut-out dimensions must be planned correctly before installation; in fire-rated ceilings, products complying with relevant standards should be used. Surface-mounted luminaires offer easy, quick retrofit solutions and are ideal where drilling the existing ceiling is not desired.",
          "In suspended ceiling (gypsum, mineral, etc.) applications, luminaire weight and size must match load capacity. Linear and panel products provide even lighting and visual continuity in such applications. Track spot systems offer accent and flexibility with directional light.",
          "In the Asialux ceiling lighting range you can find the right solution for your project with recessed, surface-mounted, linear and track spot options. Contact our catalogues and team for technical drawings and mounting details.",
        ],
      },
      ar: {
        title: "ما يجب مراعاته عند اختيار إضاءة السقف",
        excerpt:
          "اختيار الثريا المناسبة ونصائح التركيب لتطبيقات السقف المدمج والسطحية والمعلقة.",
        body: [
          "إضاءة السقف هي العنصر الرئيسي الذي يحدد الأجواء العامة ووظيفة المكان. عند الاختيار يجب مراعاة ارتفاع السقف والغرض من الاستخدام والبناء الموجود (سقف معلق، خرسانة، إلخ). الاختيارات الخاطئة تؤدي إلى إضاءة غير كافية أو استهلاك طاقة غير ضروري.",
          "الثريات المدمجة (فلاش) شائعة في المكاتب والتجزئة والسكن حيث يُراد مظهر مسطح وعصري. يجب تخطيط أبعاد الإطار والقطع بشكل صحيح قبل التركيب؛ في الأسقف المقاومة للحريق يجب استخدام منتجات متوافقة مع المعايير ذات الصلة. الثريات السطحية توفر حلول إعادة تأهيل سهلة وسريعة وهي مثالية حيث لا يُراد حفر السقف الموجود.",
          "في تطبيقات السقف المعلق (جص، معدني، إلخ) يجب أن يتوافق وزن وحجم الثريا مع قدرة التحمل. منتجات الخطية واللوحات توفر إضاءة متجانسة واستمرارية بصرية. أنظمة سبوت الريل توفر التركيز والمرونة مع الضوء الاتجاهي.",
          "في تشكيلة أسيا لوكس لإضاءة السقف يمكنك إيجاد الحل المناسب لمشروعك مع خيارات مدمجة وسطحية وخطية وسبوت ريل. تواصل مع كتالوجاتنا وفريقنا للرسومات التقنية وتفاصيل التركيب.",
        ],
      },
    },
  },
  {
    slug: "led-urunlerde-garanti-ve-omur",
    date: "2025-01-10",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    content: {
      tr: {
        title: "LED Ürünlerde Garanti ve Ömür",
        excerpt:
          "LED armatürlerde kullanım ömrü (L70, L80), garanti süreleri ve doğru beklenti oluşturma.",
        body: [
          "LED aydınlatma ürünlerinde ‘ömür’ kavramı, geleneksel ampullerdekinden farklı tanımlanır. Üreticiler genellikle L70 veya L80 değerini verir: bu, belirli çalışma saatleri sonunda ışık çıkışının başlangıçtaki değerin %70 veya %80’ine düşeceği anlamına gelir. Örneğin ‘L80 / 50.000 saat’ ifadesi, 50.000 saat sonunda lümenin %80’inin korunacağını belirtir.",
          "Garanti süreleri marka ve ürün grubuna göre değişir; 2 yıl ile 5 yıl arasında yaygındır. Garanti kapsamı genellikle üretim ve malzeme hatalarını kapsar; uygunsuz kullanım, fiziksel hasar veya elektrik kaynaklı arızalar hariç tutulabilir. Satın almadan önce garanti belgesini ve istisnaları okumak önemlidir.",
          "Ürünün gerçek ömrünü etkileyen faktörler arasında çalışma sıcaklığı, sürücü kalitesi ve ısı yönetimi sayılabilir. İyi tasarlanmış armatürlerde ısı, LED çipleri ve sürücüden uzaklaştırılarak performans ve ömür korunur. Bu nedenle kaliteli ve belgeli ürünler uzun vadede daha ekonomik olabilir.",
          "Asialux ürünlerinde garanti koşulları ve teknik ömür bilgileri ürün detay sayfalarında ve kullanım kılavuzlarında yer alır. Sorularınız için satış ve teknik destek ekibimizle iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Warranty and Lifespan in LED Products",
        excerpt:
          "LED luminaire lifespan (L70, L80), warranty periods and setting the right expectations.",
        body: [
          "In LED lighting products, ‘lifespan’ is defined differently from traditional bulbs. Manufacturers typically quote L70 or L80: this means that after a given number of operating hours, light output will fall to 70% or 80% of the initial value. For example, ‘L80 / 50,000 hours’ means that 80% of lumens will be maintained after 50,000 hours.",
          "Warranty periods vary by brand and product group; 2 to 5 years is common. Warranty usually covers manufacturing and material defects; improper use, physical damage or electrical faults may be excluded. It is important to read the warranty document and exclusions before purchase.",
          "Factors that affect actual product life include operating temperature, driver quality and thermal management. In well-designed luminaires, heat is removed from the LED chips and driver to preserve performance and life. Therefore quality, certified products can be more economical in the long run.",
          "Warranty terms and technical lifespan information for Asialux products are given on product detail pages and in user manuals. Contact our sales and technical support team for any questions.",
        ],
      },
      ar: {
        title: "الضمان والعمر الافتراضي في منتجات LED",
        excerpt:
          "العمر الافتراضي لثريات LED (L70, L80)، فترات الضمان وتحديد التوقعات الصحيحة.",
        body: [
          "في منتجات إضاءة LED، يُعرَّف «العمر الافتراضي» بشكل مختلف عن المصابيح التقليدية. المصنعون يذكرون عادة L70 أو L80: أي أنه بعد عدد معين من ساعات التشغيل، سينخفض إخراج الضوء إلى 70٪ أو 80٪ من القيمة الأولية. على سبيل المثال، «L80 / 50,000 ساعة» تعني أن 80٪ من اللومن ستُحفظ بعد 50,000 ساعة.",
          "فترات الضمان تختلف حسب العلامة التجارية ومجموعة المنتج؛ 2 إلى 5 سنوات شائعة. الضمان يغطي عادة عيوب التصنيع والمواد؛ الاستخدام غير السليم أو التلف المادي أو الأعطال الكهربائية قد تُستثنى. من المهم قراءة وثيقة الضمان والاستثناءات قبل الشراء.",
          "العوامل التي تؤثر على العمر الفعلي للمنتج تشمل درجة حرارة التشغيل وجودة السائق وإدارة الحرارة. في الثريات المصممة جيداً، يتم إزالة الحرارة من رقائق LED والسائق للحفاظ على الأداء والعمر. لذلك المنتجات عالية الجودة والمعتمدة قد تكون أكثر اقتصاداً على المدى الطويل.",
          "شروط الضمان ومعلومات العمر الافتراضي التقني لمنتجات أسيا لوكس متوفرة في صفحات تفاصيل المنتج وكتيبات الاستخدام. تواصل مع فريق المبيعات والدعم الفني لأي استفسارات.",
        ],
      },
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostContent(
  post: BlogPost,
  locale: string
): BlogPostContent | undefined {
  const loc = locale === "en" || locale === "ar" ? locale : "tr";
  return post.content[loc];
}
