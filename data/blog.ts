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
        title: "LED Aydınlatma Trendleri 2025: Akıllı Sistemler ve Mimari Aydınlatma",
        excerpt:
          "2025 LED aydınlatma trendleri: insan odaklı aydınlatma (HCL), akıllı kontrol sistemleri, çizgisel LED ve sürdürülebilirlik. Sektör rehberi.",
        body: [
          "LED aydınlatma sektörü 2025 yılında yalnızca enerji verimliliği değil, kullanıcı deneyimi ve mekânla bütünleşen çözümler sunuyor. Artık aydınlatma ürünleri sadece ışık kaynağı olarak değil; renk sıcaklığı ayarlanabilir, insan odaklı (HCL – Human Centric Lighting) ve akıllı senaryolarla yönetilebilir sistemler olarak talep görüyor. Bu yazıda 2025 LED aydınlatma trendlerini, mimari aydınlatma uygulamalarını ve proje seçiminde dikkat edilmesi gerekenleri özetliyoruz.",
          "Mimari aydınlatmada çizgisel (linear) LED ürünler ve gizli entegrasyon öne çıkıyor. Tavan ve duvar birleşimlerinde devam eden şerit LED uygulamaları, ofis ve perakende mekânlarda sade bir görünüm ve homojen aydınlatma sağlıyor. Ray spot ve sıva altı armatürlerde ise daha kompakt formlar ve yüksek lümen çıkışı (lm/W) öne çıkan özellikler arasında. Özellikle ticari projelerde görünmez veya minimum görünür armatür tercihi, mekânın estetiğini bozmadan yeterli aydınlık seviyesine ulaşmayı mümkün kılıyor.",
          "İnsan odaklı aydınlatma (HCL), ofis ve sağlık yapılarında giderek daha fazla talep görüyor. Gün içinde renk sıcaklığı ve yoğunluğun değiştirilmesiyle biyoritme destek veren sistemler, çalışan verimliliği ve konforu artırıyor. Tunable white (ayarlanabilir beyaz) LED armatürler bu uygulamaların temelini oluşturuyor.",
          "Sürdürülebilirlik, üreticiler ve proje sahipleri için belirleyici olmaya devam ediyor. Düşük karbon ayak izi, uzun kullanım ömrü ve geri dönüştürülebilir malzeme kullanımı hem yeşil sertifikasyonlarda (LEED, BREEAM vb.) hem de ihale şartnamelerinde daha sık aranıyor. LED teknolojisi bu beklentiyi uzun ömür ve düşük enerji tüketimiyle karşılıyor; ayrıca bakım maliyetlerini de düşürüyor.",
          "Konut ve ticari projelerde Wi‑Fi ve Bluetooth tabanlı akıllı aydınlatma kontrol sistemleri yaygınlaşıyor. Tek bir uygulama üzerinden aydınlatma senaryolarını yönetmek, enerji tasarrufu sağlamak ve konforu artırmak mümkün. Hareket ve gün ışığı sensörleriyle entegre çalışan sistemler, boş alanlarda otomatik kısma veya kapatma ile tüketimi azaltıyor.",
          "Asialux olarak LED aydınlatma trendlerini ürün gamımızda ve proje çözümlerimizde takip ediyoruz. Sıva altı, sıva üstü, ray spot ve dış mekân ürünlerimizle projenize uygun teknik ve estetik çözümler sunuyoruz. Detaylı bilgi ve proje teklifi için iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "LED Lighting Trends 2025: Smart Systems and Architectural Lighting",
        excerpt:
          "2025 LED lighting trends: human-centric lighting (HCL), smart controls, linear LED and sustainability. Industry guide and best practices.",
        body: [
          "The LED lighting sector in 2025 delivers more than energy efficiency: it focuses on user experience and solutions that integrate with the space. Lighting products are no longer just light sources; tunable colour temperature, human-centric lighting (HCL) and smart scenario-based systems are in demand. This article summarises 2025 LED lighting trends, architectural lighting applications and what to consider when specifying projects.",
          "In architectural lighting, linear LED products and concealed integration stand out. Continuous strip LEDs along ceiling and wall junctions provide a clean look and even illumination in offices and retail. Track spots and recessed luminaires are trending towards more compact forms and higher lumen output (lm/W). In commercial projects, invisible or minimal-visibility luminaires allow sufficient illuminance without compromising the aesthetics of the space.",
          "Human-centric lighting (HCL) is increasingly requested in offices and healthcare buildings. Systems that adjust colour temperature and intensity through the day support circadian rhythm and improve occupant productivity and comfort. Tunable white LED luminaires form the basis of these applications.",
          "Sustainability remains a key factor for manufacturers and project owners. Low carbon footprint, long service life and recyclable materials are increasingly required in green certifications (LEED, BREEAM, etc.) and tender specifications. LED technology meets these expectations with long life and low energy consumption, and also reduces maintenance costs.",
          "Wi‑Fi and Bluetooth-based smart lighting control systems are becoming common in residential and commercial projects. Managing lighting scenarios, saving energy and improving comfort from a single app is now standard. Systems integrated with motion and daylight sensors reduce consumption by automatically dimming or switching off in unoccupied areas.",
          "At Asialux we follow LED lighting trends in our product range and project solutions. With recessed, surface-mounted, track spot and outdoor luminaires we offer technical and aesthetic solutions suited to your project. Contact us for detailed information and project proposals.",
        ],
      },
      ar: {
        title: "اتجاهات إضاءة LED 2025: الأنظمة الذكية والإضاءة المعمارية",
        excerpt:
          "اتجاهات إضاءة LED 2025: الإضاءة المركزة على الإنسان (HCL)، التحكم الذكي، LED الخطي والاستدامة. دليل القطاع وأفضل الممارسات.",
        body: [
          "قطاع إضاءة LED في عام 2025 يقدم أكثر من كفاءة الطاقة: يركز على تجربة المستخدم والحلول المتكاملة مع الفضاء. منتجات الإضاءة لم تعد مجرد مصدر ضوء؛ الأنظمة القابلة لضبط درجة حرارة اللون والمركزة على الإنسان (HCL) والذكية حسب السيناريو مطلوبة. تلخص هذه المقالة اتجاهات إضاءة LED 2025 وتطبيقات الإضاءة المعمارية وما يجب مراعاته عند تحديد المشاريع.",
          "في الإضاءة المعمارية، تبرز المنتجات الخطية لـ LED والتكامل المخفي. شرائط LED المستمرة عند تقاطعات السقف والجدار توفر مظهراً أنيقاً وإضاءة متجانسة في المكاتب والتجزئة. سبوتات الريل والثريات المدمجة تميل إلى أشكال أصغر وإخراج لومن أعلى (lm/W). في المشاريع التجارية، الثريات غير المرئية أو ذات الرؤية الدنيا تسمح بإضاءة كافية دون المساس بجماليات المكان.",
          "الإضاءة المركزة على الإنسان (HCL) مطلوبة بشكل متزايد في المكاتب والمباني الصحية. الأنظمة التي تضبط درجة حرارة اللون والشدة خلال اليوم تدعم الإيقاع اليومي وتحسن إنتاجية وراحة الشاغلين. ثريات LED ذات اللون الأبيض القابل للضبط تشكل أساس هذه التطبيقات.",
          "الاستدامة لا تزال عاملاً حاسماً للمصنعين وأصحاب المشاريع. البصمة الكربونية المنخفضة والعمر الطويل والمواد القابلة لإعادة التدوير مطلوبة بشكل متزايد في الشهادات الخضراء (LEED، BREEAM، إلخ) ومواصفات المناقصات. تقنية LED تلبي هذه التوقعات بعمر طويل واستهلاك منخفض للطاقة، وتقلل أيضاً تكاليف الصيانة.",
          "أنظمة التحكم الذكية القائمة على Wi‑Fi و Bluetooth أصبحت شائعة في المشاريع السكنية والتجارية. إدارة سيناريوهات الإضاءة وتوفير الطاقة وتحسين الراحة من تطبيق واحد أصبح معياراً. الأنظمة المدمجة مع حساسات الحركة وضوء النهار تقلل الاستهلاك عبر التخفيف أو الإطفاء التلقائي في المناطق غير المشغولة.",
          "في أسيا لوكس نتابع اتجاهات إضاءة LED في مجموعتنا من المنتجات وحلول المشاريع. مع الثريات المدمجة والسطحية وسبوت الريل والخارجية نقدم حلولاً تقنية وجمالية مناسبة لمشروعك. تواصل معنا للمعلومات التفصيلية وعروض المشاريع.",
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
        title: "Dış Mekan Aydınlatması İpuçları: IP Sınıfları, Peyzaj ve Cephe Aydınlatma",
        excerpt:
          "Dış mekân ve peyzaj aydınlatmasında IP koruma sınıfları, LED dış mekân armatürleri seçimi ve ışık kirliliği. Uygulama rehberi.",
        body: [
          "Dış mekân aydınlatması hem estetik hem işlevsel hedefleri bir arada karşılamalıdır. Yaya yolları, otoparklar ve girişlerde yeterli ve yansımaya yol açmayan düzgün dağılımlı ışık, güvenlik ve konforu artırır. Cephe ve peyzaj aydınlatmasında ise vurgulama ve atmosfer ön plandadır. Bu yazıda dış mekân LED aydınlatma ürünleri seçiminde dikkat edilecek IP sınıfları, uygulama önerileri ve proje aşamasında dikkat edilmesi gerekenleri özetliyoruz.",
          "Ürün seçiminde IP (ingress protection – koruma sınıfı) kritiktir. Toz ve suya karşı dayanım, dış mekân armatürünün ömrünü ve güvenilirliğini doğrudan etkiler. Dış mekân için en az IP65 önerilir; tamamen açık alanlar veya yıkanan bölgeler için IP66 ve üzeri tercih edilmelidir. UV ve sıcaklık değişimine dayanıklı malzeme ve conta kullanımı da önemlidir. Yanlış IP seçimi erken arızaya ve garanti dışı kalmana yol açabilir.",
          "Enerji verimliliği için LED dış mekân armatürleri ve sensörlü veya zaman ayarlı kontrol sistemleri kullanılabilir. Hareket sensörü özellikle güvenlik ve enerji tasarrufu açısından anlamlıdır. Işık kirliliğini azaltmak adına aşağı yönlü (downlight) veya perdeli armatürler tercih edilmeli; gökyüzüne doğru ışık kaçışı engellenmelidir. Bu hem çevre hem de yönetmelik uyumu açısından önem taşır.",
          "Proje aşamasında çevre aydınlık seviyeleri, kullanım senaryoları ve bakım erişimi dikkate alınmalıdır. Yol, cephe ve peyzaj aydınlatması için farklı armatür tipleri gerekebilir: aplik (duvar), kazıklı (bollard) ve gömme (recessed) dış mekân armatürleri farklı uygulama ihtiyaçlarına yanıt verir. Asialux dış mekân ürün gamında bu tiplerde çözümler sunuyoruz. Teknik ölçüm ve proje teklifi için iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Outdoor Lighting Tips: IP Ratings, Landscape and Façade Lighting",
        excerpt:
          "Outdoor and landscape lighting: IP protection ratings, LED outdoor luminaire selection and light pollution. Practical application guide.",
        body: [
          "Outdoor lighting should meet both aesthetic and functional goals. Adequate, well-distributed light with minimal glare on paths, car parks and entrances improves safety and comfort. On façades and in landscape lighting, accent and atmosphere take the lead. This article summarises IP ratings, application tips and what to consider at the project stage when selecting outdoor LED lighting products.",
          "IP (ingress protection) rating is critical when selecting outdoor luminaires. Resistance to dust and water directly affects product life and reliability. For outdoor use, at least IP65 is recommended; IP66 and above for fully exposed or wash-down areas. UV and temperature-resistant materials and gaskets are also important. Wrong IP choice can lead to premature failure and warranty exclusion.",
          "For energy efficiency, LED outdoor luminaires and sensor- or time-based control systems are effective. Motion sensors are especially useful for security and energy savings. To reduce light pollution, prefer downlight or shielded luminaires and avoid upward light spill; this matters both for the environment and for regulatory compliance.",
          "At the project stage, ambient light levels, use scenarios and maintenance access should be considered. Path, façade and landscape lighting may require different luminaire types: wall, bollard and recessed outdoor luminaires each suit different application needs. In the Asialux outdoor range we offer solutions in these categories. Contact us for technical calculations and project proposals.",
        ],
      },
      ar: {
        title: "نصائح إضاءة الخارجية: درجات IP وإضاءة المشهد والواجهة",
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
        title: "Enerji Tasarruflu Aydınlatma Çözümleri: LED, Lümen ve Akıllı Kontrol",
        excerpt:
          "Enerji tasarruflu aydınlatma: LED dönüşümü, lümen/watt verimliliği, dimmer ve sensör sistemleri. Ofis ve ticari binalar rehberi.",
        body: [
          "Aydınlatma, ofis ve perakende binalarında toplam elektrik tüketiminin önemli bir bölümünü oluşturuyor. LED’e geçiş, aynı aydınlık seviyesinde geleneksel sistemlere göre %50–70’e varan enerji tasarrufu sağlayabiliyor. Özellikle uzun çalışma süreli mekânlarda yatırım kendini kısa sürede amorti ediyor. Bu yazıda enerji tasarruflu aydınlatma için lümen seçimi, kontrol sistemleri ve proje bazlı önerileri özetliyoruz.",
          "Doğru ürün seçiminde lümen (ışık çıkışı) ve lümen/watt verimliliği önemlidir. Sadece watt’a bakmak yanıltıcı olabilir; aynı güçte farklı verimlilikte ürünler bulunabiliyor. Proje hedefi, mekândaki aydınlık seviyesi (lux) ve homojen dağılım olmalı; buna göre armatür sayısı ve konumu belirlenmelidir. Yüksek lm/W değeri uzun vadede hem enerji hem maliyet tasarrufu sağlar.",
          "Dimmer ve sensör entegrasyonu tasarrufu daha da artırır. Boş alanlarda ışığın kısılması veya kapatılması, gün ışığına göre ayarlama (daylight harvesting) ve hareket sensörleri özellikle ofis ve depolar için anlamlıdır. Akıllı aydınlatma sistemleriyle senaryo bazlı kontrol de mümkündür. DALI veya benzeri protokollerle tüm armatürler tek elden yönetilebilir.",
          "Asialux ürün gamında yüksek verimli LED armatürler, uzun ömür ve düşük bakım maliyeti ile enerji tasarruflu çözümler sunuyoruz. Proje bazlı öneri, aydınlık hesapları ve teknik hesaplama için ekibimizle iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Energy-Efficient Lighting Solutions: LED, Lumens and Smart Control",
        excerpt:
          "Energy-efficient lighting: LED conversion, lumens-per-watt efficiency, dimmer and sensor systems. Guide for offices and commercial buildings.",
        body: [
          "Lighting accounts for a significant share of total electricity use in office and retail buildings. Switching to LED can deliver 50–70% energy savings compared with traditional systems at the same light levels. In spaces with long operating hours, the investment pays back quickly. This article summarises lumen choice, control systems and project-level advice for energy-efficient lighting.",
          "When selecting products, lumen output and lumens-per-watt efficiency matter. Focusing only on watts can be misleading; products with the same power can have different efficiencies. The project goal should be target illuminance (lux) and even distribution; the number and position of luminaires should be planned accordingly. High lm/W delivers both energy and cost savings over time.",
          "Dimmer and sensor integration increases savings further. Dimming or switching off in unoccupied areas, daylight harvesting and motion sensors are especially valuable in offices and warehouses. Scenario-based control is also possible with smart lighting systems; DALI or similar protocols allow central management of all luminaires.",
          "In the Asialux range we offer high-efficiency LED luminaires with long life and low maintenance cost for energy-efficient solutions. Contact our team for project-specific advice, illuminance calculations and technical support.",
        ],
      },
      ar: {
        title: "حلول الإضاءة الموفرة للطاقة: LED واللومن والتحكم الذكي",
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
        title: "Ofis Aydınlatmasında Verimlilik ve Konfor: Lux, UGR ve HCL Rehberi",
        excerpt:
          "Ofis aydınlatması standartları: 300–500 lux, UGR kamaşma sınırı, renk sıcaklığı ve insan odaklı aydınlatma (HCL). Göz konforu ve verimlilik.",
        body: [
          "Ofis aydınlatması, çalışanların görsel konforu ve üretkenliği üzerinde doğrudan etkiye sahiptir. Yetersiz veya kötü dağılımlı ışık göz yorgunluğu ve baş ağrısına yol açabilir; aşırı parlaklık ve yansıma ise ekran üzerinde rahatsız edici olabilir. Bu nedenle hem yatay (masa) hem dikey (duvar, ekran çevresi) aydınlık seviyeleri standartlara uygun planlanmalıdır. Bu yazıda ofis aydınlatması için lux hedefleri, UGR ve HCL uygulamalarını özetliyoruz.",
          "Günümüzde ofis projelerinde genellikle 300–500 lux düzeyinde genel aydınlatma hedeflenir; detaylı işlerde bu değer 750 lux'e kadar çıkabilir. Homojen dağılım için tavan tipi armatürler (sıva altı, sıva üstü veya lineer) sık kullanılır. UGR (birleşik kamaşma sınıfı) değeri düşük ürünler, bilgisayar kullanımı olan ofislerde tercih edilmelidir; yüksek UGR ekran üzerinde yansıma ve rahatsızlık yaratır.",
          "Renk sıcaklığı olarak 4000 K (nötr beyaz) ofis ortamları için yaygındır; daha sıcak tonlar dinlenme alanlarında kullanılabilir. İnsan odaklı aydınlatma (HCL) uygulamalarında gün içinde renk sıcaklığı ve yoğunluk değiştirilerek biyoritme destek verilebiliyor. Tunable white ofis armatürleri bu uygulamaları mümkün kılar.",
          "Asialux ofis aydınlatması çözümlerinde panel, lineer ve ray spot ürünleriyle geniş bir seçenek sunuyoruz. Projenize özel öneri, aydınlık hesapları ve UGR değerleri için bizimle iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Efficiency and Comfort in Office Lighting: Lux, UGR and HCL Guide",
        excerpt:
          "Office lighting standards: 300–500 lux, UGR glare limits, colour temperature and human-centric lighting (HCL). Eye comfort and productivity.",
        body: [
          "Office lighting has a direct impact on visual comfort and productivity. Insufficient or poorly distributed light can cause eye strain and headaches; excessive brightness and glare can be distracting on screens. Therefore both horizontal (desk) and vertical (wall, around screen) illuminance should be planned in line with standards. This article summarises lux targets, UGR and HCL for office lighting.",
          "Today office projects typically target 300–500 lux general lighting; for detailed tasks this can go up to 750 lux. Recessed, surface-mounted or linear ceiling luminaires are commonly used for even distribution. Products with low UGR (unified glare rating) are preferred in offices with computer use; high UGR causes screen reflection and discomfort.",
          "A colour temperature of 4000 K (neutral white) is common for offices; warmer tones can be used in breakout areas. In human-centric lighting (HCL) applications, colour temperature and intensity can be varied through the day to support circadian rhythm. Tunable white office luminaires enable these applications.",
          "In Asialux office lighting solutions we offer a wide choice of panel, linear and track spot products. Contact us for project-specific advice, illuminance calculations and UGR values.",
        ],
      },
      ar: {
        title: "الكفاءة والراحة في إضاءة المكاتب: دليل اللوكس وUGR وHCL",
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
        title: "Tavan Aydınlatması Seçimi: Sıva Altı, Sıva Üstü ve Asma Tavan Rehberi",
        excerpt:
          "Tavan aydınlatması seçimi: sıva altı (gömme), sıva üstü ve asma tavan uygulamalarında LED armatür ve montaj önerileri. Teknik rehber.",
        body: [
          "Tavan aydınlatması, mekânın genel atmosferini ve işlevselliğini belirleyen ana unsurdur. Seçim yaparken tavan yüksekliği, kullanım amacı ve mevcut tesisat (asma tavan, beton tavan vb.) dikkate alınmalıdır. Yanlış seçim yetersiz aydınlatma veya gereksiz enerji tüketimine yol açabilir. Bu yazıda sıva altı, sıva üstü ve asma tavan uygulamalarında dikkat edilecekleri özetliyoruz.",
          "Sıva altı (gömme) armatürler, düz ve modern bir görünüm istenen ofis, mağaza ve konut projelerinde sık kullanılır. Montaj öncesi çerçeve ve boşluk ölçüleri doğru planlanmalı; yangına dayanımlı tavanlarda ilgili standartlara uygun ürünler tercih edilmelidir. Sıva üstü armatürler ise tadilatı kolay ve hızlı çözümler sunar; özellikle mevcut tavanın delinmesinin istenmediği durumlarda idealdir.",
          "Asma tavan (alçıpan, mineral vb.) uygulamalarında armatürün ağırlığı ve boyutu taşıma kapasitesi ile uyumlu olmalıdır. Lineer ve panel ürünler bu tür uygulamalarda homojen aydınlatma ve estetik bütünlük sağlar. Ray spot sistemleri ise yönlendirilebilir ışık ile vurgulama ve esneklik sunar; spot sayısı ve yeri sonradan değiştirilebilir.",
          "Asialux tavan aydınlatması ürün gamında sıva altı, sıva üstü, lineer ve ray spot seçenekleriyle projenize uygun çözümü bulabilirsiniz. Teknik çizim, montaj detayları ve aydınlık hesapları için kataloglarımıza ve ekibimize ulaşabilirsiniz.",
        ],
      },
      en: {
        title: "Ceiling Lighting Selection: Recessed, Surface-Mounted and Suspended Ceiling Guide",
        excerpt:
          "Ceiling lighting selection: recessed (flush), surface-mounted and suspended ceiling applications. LED luminaire and mounting guide.",
        body: [
          "Ceiling lighting is the main element that defines the overall atmosphere and functionality of a space. When choosing, consider ceiling height, purpose of use and existing construction (suspended ceiling, concrete, etc.). Wrong choices can lead to insufficient light or unnecessary energy use. This article summarises what to consider for recessed, surface-mounted and suspended ceiling applications.",
          "Recessed (flush) luminaires are common in offices, retail and residential projects where a flat, modern look is desired. Frame and cut-out dimensions must be planned correctly before installation; in fire-rated ceilings, products complying with relevant standards should be used. Surface-mounted luminaires offer easy, quick retrofit solutions and are ideal where drilling the existing ceiling is not desired.",
          "In suspended ceiling (gypsum, mineral, etc.) applications, luminaire weight and size must match load capacity. Linear and panel products provide even lighting and visual continuity in such applications. Track spot systems offer accent and flexibility with directional light; the number and position of spots can be changed later.",
          "In the Asialux ceiling lighting range you can find the right solution for your project with recessed, surface-mounted, linear and track spot options. Contact our catalogues and team for technical drawings, mounting details and illuminance calculations.",
        ],
      },
      ar: {
        title: "اختيار إضاءة السقف: دليل المدمج والسطحية والمعلقة",
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
        title: "LED Ürünlerde Garanti ve Ömür: L70, L80 ve Kullanım Ömrü Rehberi",
        excerpt:
          "LED armatür kullanım ömrü (L70, L80), garanti süreleri ve beklenti. LED ömrü nasıl okunur, garanti kapsamı ve ısı yönetimi.",
        body: [
          "LED aydınlatma ürünlerinde ‘ömür’ kavramı, geleneksel ampullerdekinden farklı tanımlanır. Üreticiler genellikle L70 veya L80 değerini verir: bu, belirli çalışma saatleri sonunda ışık çıkışının başlangıçtaki değerin %70 veya %80’ine düşeceği anlamına gelir. Örneğin ‘L80 / 50.000 saat’ ifadesi, 50.000 saat sonunda lümenin %80’inin korunacağını belirtir. Bu yazıda LED ömrü, garanti ve satın alma öncesi dikkat edilecekleri özetliyoruz.",
          "Garanti süreleri marka ve ürün grubuna göre değişir; 2 yıl ile 5 yıl arasında yaygındır. Garanti kapsamı genellikle üretim ve malzeme hatalarını kapsar; uygunsuz kullanım, fiziksel hasar veya elektrik kaynaklı arızalar hariç tutulabilir. Satın almadan önce garanti belgesini ve istisnaları okumak önemlidir. Proje bazlı uzun garanti talepleri için üreticiyle görüşülebilir.",
          "Ürünün gerçek ömrünü etkileyen faktörler arasında çalışma sıcaklığı, sürücü kalitesi ve ısı yönetimi sayılabilir. İyi tasarlanmış armatürlerde ısı, LED çipleri ve sürücüden uzaklaştırılarak performans ve ömür korunur. Bu nedenle kaliteli ve belgeli ürünler uzun vadede daha ekonomik olabilir. Yüksek ortam sıcaklığı veya kapalı armatür kullanımı ömrü kısaltabilir.",
          "Asialux ürünlerinde garanti koşulları ve teknik ömür bilgileri (L70/L80, saat) ürün detay sayfalarında ve kullanım kılavuzlarında yer alır. Sorularınız için satış ve teknik destek ekibimizle iletişime geçebilirsiniz.",
        ],
      },
      en: {
        title: "Warranty and Lifespan in LED Products: L70, L80 and Lifespan Guide",
        excerpt:
          "LED luminaire lifespan (L70, L80), warranty periods and what to expect. How to read LED lifespan, warranty scope and thermal management.",
        body: [
          "In LED lighting products, ‘lifespan’ is defined differently from traditional bulbs. Manufacturers typically quote L70 or L80: this means that after a given number of operating hours, light output will fall to 70% or 80% of the initial value. For example, ‘L80 / 50,000 hours’ means that 80% of lumens will be maintained after 50,000 hours. This article summarises LED lifespan, warranty and what to check before purchase.",
          "Warranty periods vary by brand and product group; 2 to 5 years is common. Warranty usually covers manufacturing and material defects; improper use, physical damage or electrical faults may be excluded. It is important to read the warranty document and exclusions before purchase. For project-specific extended warranty requests, the manufacturer can be consulted.",
          "Factors that affect actual product life include operating temperature, driver quality and thermal management. In well-designed luminaires, heat is removed from the LED chips and driver to preserve performance and life. Therefore quality, certified products can be more economical in the long run. High ambient temperature or enclosed luminaire use can shorten lifespan.",
          "Warranty terms and technical lifespan information (L70/L80, hours) for Asialux products are given on product detail pages and in user manuals. Contact our sales and technical support team for any questions.",
        ],
      },
      ar: {
        title: "الضمان والعمر الافتراضي في منتجات LED: دليل L70 وL80 والعمر",
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
