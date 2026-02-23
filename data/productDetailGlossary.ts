/**
 * Sözlük: Türkçe ürün detay metinleri → EN / AR.
 * getProductDetail locale ile çağrıldığında bu sözlük uygulanır.
 */
export type LocaleProduct = "en" | "ar";

export const productDetailGlossary: Record<string, { en: string; ar: string }> = {
  // Kategoriler
  "Ray Spot": { en: "Track Spot", ar: "سبوت ريل" },
  "Sıva Üstü": { en: "Surface Mounted", ar: "سطح الجدار" },
  "Sıva Altı": { en: "Recessed", ar: "مدمج في السقف" },
  "Dış Mekan": { en: "Outdoor", ar: "الخارجي" },
  "Endüstriyel Aydınlatma": { en: "Industrial Lighting", ar: "الإضاءة الصناعية" },
  Linear: { en: "Linear", ar: "خطي" },
  Magnet: { en: "Magnet", ar: "مغناطيسي" },
  Aplik: { en: "Wall Light", ar: "جدارية" },
  Sarkıt: { en: "Pendant", ar: "معلقة" },

  // Kullanım alanları
  Dekorasyon: { en: "Decoration", ar: "ديكور" },
  Süpermarketler: { en: "Supermarkets", ar: "السوبرماركت" },
  Mağazalar: { en: "Stores", ar: "المتاجر" },
  Evler: { en: "Homes", ar: "المنازل" },
  Fabrikalar: { en: "Factories", ar: "المصانع" },
  Otoparklar: { en: "Parking Lots", ar: "مواقف السيارات" },
  Tüneller: { en: "Tunnels", ar: "الأنفاق" },
  Garajlar: { en: "Garages", ar: "الجراجات" },
  "Şantiye Alanları": { en: "Construction Sites", ar: "مواقع البناء" },
  Depolar: { en: "Warehouses", ar: "المستودعات" },
  "Nemli ve Tozlu Dış Ortamlar": { en: "Humid and Dusty Outdoor Areas", ar: "المناطق الخارجية الرطبة والمغبرة" },
  Ofis: { en: "Office", ar: "المكتب" },
  vb: { en: "etc.", ar: "إلخ." },

  // Özellik etiketleri
  Gövde: { en: "Body", ar: "الهيكل" },
  "Reflektör Tipi": { en: "Reflector Type", ar: "نوع العاكس" },
  "Uygulama Şekli": { en: "Application Type", ar: "طريقة التطبيق" },
  "Boyama Tipi": { en: "Finish Type", ar: "نوع الطلاء" },
  "Kullanım Şekli": { en: "Usage Type", ar: "نوع الاستخدام" },

  // Özellik değerleri (ortak)
  "Alüminyum enjeksiyon gövde ve enjeksiyon kafa": {
    en: "Aluminium die-cast body and head",
    ar: "هيكل ورأس من الألومنيوم المصبوب",
  },
  "Yüksek saflıkta alüminyum reflektör": {
    en: "High-purity aluminium reflector",
    ar: "عاكس ألومنيوم عالي النقاء",
  },
  "Elektronik balast ile soket veya rozanslı": {
    en: "Socket or driver with electronic ballast",
    ar: "مقبس أو مشغل مع بالاست إلكتروني",
  },
  "Elektrostatik toz boya": { en: "Electrostatic powder coating", ar: "طلاء إلكتروستاتيكي مسحوقي" },

  // Teknik özellik etiketleri
  "Sürücü Akımı": { en: "Driver Current", ar: "تيار السائق" },
  Gerilim: { en: "Voltage", ar: "الجهد" },
  Frekans: { en: "Frequency", ar: "التردد" },
  "Aktif Güç": { en: "Active Power", ar: "الاستطاعة الفعالة" },
  Lümen: { en: "Luminous Flux", ar: "التدفق الضوئي" },
  "Işık Kaynağı": { en: "Light Source", ar: "مصدر الضوء" },
  "Mid Power LED": { en: "Mid Power LED", ar: "ليد متوسط القدرة" },

  // İndirilebilir medya
  Datasheet: { en: "Datasheet", ar: "ورقة البيانات" },
  "Kullanım Kılavuzu": { en: "User Manual", ar: "دليل الاستخدام" },
  "2D Çizim": { en: "2D Drawing", ar: "رسم ثنائي الأبعاد" },
  "3D Çizim": { en: "3D Drawing", ar: "رسم ثلاثي الأبعاد" },
  "LDT Dosyaları": { en: "LDT Files", ar: "ملفات LDT" },

  // Renk seçenekleri
  Siyah: { en: "Black", ar: "أسود" },
  Beyaz: { en: "White", ar: "أبيض" },
  RAL: { en: "RAL", ar: "RAL" },

  // Accordion başlıkları (veri tarafında kullanılıyorsa)
  "Montaj ve Güvenlik Uyarıları": { en: "Mounting and Safety Warnings", ar: "تحذيرات التركيب والسلامة" },
  "Önemli Uyarılar": { en: "Important Warnings", ar: "تحذيرات هامة" },
  "Garanti Şartları": { en: "Warranty Terms", ar: "شروط الضمان" },
  "GARANTİ BELGESİ | Garanti Şartları": {
    en: "WARRANTY CERTIFICATE | Warranty Terms",
    ar: "شهادة الضمان | شروط الضمان",
  },

  // Ortak uyarı / garanti cümleleri (kısa)
  "Ray spotunuzu;": { en: "Your track spot;", ar: "سبوت الريل الخاص بك؛" },
  "Teslim alırken, fiziksel bir hasar olup olmadığını kontrol ediniz. Nakliye hasarlı ürünlerin değişimini kargodan ya da ambardan talep ediniz ve ürün ile birlikte gelmesi gereken aksesuarlar varsa tam olup olmadığını kontrol ediniz.": {
    en: "When receiving, check for any physical damage. Request replacement of transport-damaged products from the carrier or warehouse and verify that any accessories that should come with the product are complete.",
    ar: "عند الاستلام، تحقق من أي ضرر مادي. اطلب استبدال المنتجات التالفة أثناء النقل من الناقل أو المستودع وتأكد من اكتمال أي ملحقات يجب أن تأتي مع المنتج.",
  },
  "Orijinal kutusunu veya paketini, aksesuar ve faturasını daha sonraki servis ihtiyacında kullanmak üzere saklayınız.": {
    en: "Keep the original box or packaging, accessories and invoice for future service needs.",
    ar: "احتفظ بالصندوق أو التغليف الأصلي والملحقات والفاتورة لاحتياجات الخدمة المستقبلية.",
  },
  "Ürün barkodunun, model ve seri numarasının zarar görmemesine dikkat ediniz.": {
    en: "Ensure that the product barcode, model and serial number are not damaged.",
    ar: "تأكد من عدم تلف الرمز الشريطي للمنتج والموديل والرقم التسلسلي.",
  },
  "Bunların okunmaması veya yıpranmış olması durumunda ürününüz garanti kapsamına girmemektedir.": {
    en: "If these cannot be read or are worn, your product is not covered by warranty.",
    ar: "إذا تعذر قراءتها أو كانت بالية، فإن منتجك غير مشمول بالضمان.",
  },
  "Ürün kullanım amaçları haricinde kullanılmamalıdır.": {
    en: "The product must not be used for purposes other than its intended use.",
    ar: "يجب ألا يُستخدم المنتج لأغراض غير الاستخدام المقصود.",
  },
  "Satıcı firma, ürünün usulüne uygun olmayan bir şekilde kullanılması sonucu ortaya çıkabilecek yaralanma veya hasar görme vakalarında sorumluluk almaz.": {
    en: "The seller is not liable for injury or damage resulting from improper use of the product.",
    ar: "البائع غير مسؤول عن الإصابة أو الضرر الناتج عن الاستخدام غير السليم للمنتج.",
  },
  "Elektrik bağlantıları sadece ama sadece uzman personel tarafından yapılmalıdır.": {
    en: "Electrical connections must be made only by qualified personnel.",
    ar: "يجب أن تتم التوصيلات الكهربائية فقط من قبل شخص مؤهل.",
  },
  "Kurulurken elektrik bağlantısının kapalı olduğundan emin olunuz.": {
    en: "Ensure the power supply is switched off during installation.",
    ar: "تأكد من إيقاف التيار الكهربائي أثناء التثبيت.",
  },
  "Güç kablolarının hasarlı olduğu durumda ürünü kullanmayınız. Aksi takdirde ölüm, ciddi yaralanma veya maddi hasara neden olabilir.": {
    en: "Do not use the product if the power cables are damaged. Otherwise it may cause death, serious injury or material damage.",
    ar: "لا تستخدم المنتج إذا كانت كابلات الطاقة تالفة. وإلا قد يتسبب في الوفاة أو إصابة خطيرة أو أضرار مادية.",
  },
  "Montajına başlamadan önce kabloların ve ürünün dış çeperlerinin hasarlı olmadığından emin olunuz.": {
    en: "Before starting installation, ensure that the cables and the product's outer surfaces are not damaged.",
    ar: "قبل بدء التثبيت، تأكد من أن الكابلات والأسطح الخارجية للمنتج غير تالفة.",
  },
  "Etiket üzerinde belirtilen çalışma geriliminden yüksek bir gerilim almadığından emin olunuz.": {
    en: "Ensure that the supply voltage does not exceed the operating voltage stated on the label.",
    ar: "تأكد من أن جهد التغذية لا يتجاوز جهد التشغيل المذكور على الملصق.",
  },
  "Uyuşmazlık durumunda meydana gelebilecek arızalarda, satıcı firma sorumlu tutulamaz ve arıza garanti kapsamında değerlendirilemez.": {
    en: "In case of incompatibility, the seller cannot be held responsible for malfunctions and such faults are not covered by warranty.",
    ar: "في حالة عدم التوافق، لا يمكن تحميل البائع مسؤولية الأعطال ولا تُغطى هذه الأعطال بالضمان.",
  },
  "Montaj için yalnızca firmamızın belirlediği ek aparatlar kullanılmalıdır.": {
    en: "Only the additional accessories specified by our company shall be used for mounting.",
    ar: "يجب استخدام الملحقات الإضافية المحددة من شركتنا فقط للتركيب.",
  },
  "Şebeke bağlantısı ilgili ülkenin tesisat yönetmeliğine uygun bağlantı malzemeleriyle yapılmalıdır.": {
    en: "Mains connection must be made with materials complying with the relevant country's electrical regulations.",
    ar: "يجب أن يتم توصيل الشبكة بمواد متوافقة مع لوائح الكهرباء في البلد المعني.",
  },
  "Elektrik kaçağı olan yerlerde kullanmayın.": {
    en: "Do not use in areas with electrical leakage.",
    ar: "لا تستخدم في الأماكن التي بها تسرب كهربائي.",
  },
  "Kablo bağlantı noktaları bağlantı klemensleri veya eriyen bant ile mutlaka yalıtılmalıdır.": {
    en: "Cable connection points must be insulated with terminal blocks or heat shrink tubing.",
    ar: "يجب عزل نقاط توصيل الكابلات بواسطة كتل طرفية أو أنابيب تقلص حراري.",
  },
  "Tadilat, tamir, oynama veya herhangi, bir fiziksel müdahalede bulunmayınız. Bu işlem sonucu maddi hasar oluşabileceği gibi, ürün garantisi de geçersiz kalacaktır.": {
    en: "Do not modify, repair, tamper with or physically interfere with the product. This may cause material damage and will void the product warranty.",
    ar: "لا تعدل أو تصلح أو تعبث أو تتدخل جسدياً في المنتج. قد يتسبب ذلك في أضرار مادية وسيلغي ضمان المنتج.",
  },
  "Etanj armatür üzerinde meydana gelen herhangi bir arıza durumunda uzman yetkili servisimizle irtibata geçiniz.": {
    en: "In case of any malfunction of the luminaire, contact our authorised service.",
    ar: "في حالة أي عطل في الثريا، اتصل بخدمتنا المعتمدة.",
  },
  "Yetkili teknik servisimiz dışında ürüne kimsenin müdahale etmesine izin vermeyiniz. Bu tür müdahaleler sonucu ürün tümüyle garanti kapsamı dışında kalır.": {
    en: "Do not allow anyone other than our authorised technical service to interfere with the product. Such interference will void the warranty entirely.",
    ar: "لا تسمح لأي شخص غير خدمتنا الفنية المعتمدة بالتدخل في المنتج. مثل هذا التدخل يلغي الضمان بالكامل.",
  },
  "Bu ürünün harici bükülgen kablo veya kordonu hasarlanırsa bir tehlikeden kaçınmak için yetkili kişi tarafından değiştirilmesi gerekir.": {
    en: "If the product's flexible cable or cord is damaged, it must be replaced by an authorised person to avoid hazard.",
    ar: "إذا تلف كابل أو سلك المنتج المرن، يجب استبداله من قبل شخص مؤهل لتجنب الخطر.",
  },
  "Ürün çalışır durumdayken yüzeyi sıcak olduğu için ürünün enerjisi kesilmelidir ve soğumadan dokunulmamalıdır. Ürün çalışır durumdayken direkt olarak bakmayınız.": {
    en: "When the product is in operation its surface is hot; disconnect power and do not touch until cool. Do not look directly at the product when it is on.",
    ar: "عند تشغيل المنتج يكون سطحه ساخناً؛ افصل التيار ولا تلمسه حتى يبرد. لا تنظر مباشرة إلى المنتج وهو يعمل.",
  },
  "Yüzeyi alkol, benzin gibi yanıcı maddelerle temizlemeyiniz.": {
    en: "Do not clean the surface with flammable substances such as alcohol or petrol.",
    ar: "لا تنظف السطح بمواد قابلة للاشتعال مثل الكحول أو البنزين.",
  },
  "Çocukların ulaşamayacakları yerlerde ve ürün kutusu içinde muhafaza ediniz.": {
    en: "Keep out of reach of children and store in the product box.",
    ar: "احفظه بعيداً عن متناول الأطفال وفي صندوق المنتج.",
  },
  "Masialux Polikarbon Etanj Armatür": {
    en: "Masialux polycarbonate enclosure luminaire",
    ar: "ثريا ماسيالوكس بغلاف بولي كربونات",
  },
  "Masialux Alüminyum Etanj Armatür": {
    en: "Masialux aluminium enclosure luminaire",
    ar: "ثريا ماسيالوكس بغلاف ألومنيوم",
  },
};


/**
 * Tek bir metni locale'e göre sözlükten çevirir. Yoksa orijinali döner.
 */
export function translateWithGlossary(text: string | undefined, locale: LocaleProduct): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (!trimmed) return text;
  const entry = productDetailGlossary[trimmed];
  if (entry) return locale === "en" ? entry.en : entry.ar;
  return text;
}
