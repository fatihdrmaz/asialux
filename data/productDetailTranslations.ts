/**
 * Ürün bazlı çeviriler (EN / AR). Anahtar: categorySlug/productSlug
 * Eksik alanlar glossary ile doldurulur veya TR'de kalır.
 */
import type { ProductDetail, ProductFeature } from "./productDetails";

export type LocaleProduct = "en" | "ar";

type PartialDetail = Partial<
  Pick<
    ProductDetail,
    | "name"
    | "category"
    | "subtitle"
    | "description"
    | "usageAreas"
    | "features"
    | "technicalSpecs"
    | "mountingSafetyWarnings"
    | "importantWarnings"
    | "warrantyTerms"
    | "downloads"
    | "bodyColorOptions"
    | "lightColorOptions"
  >
>;

export const productDetailTranslations: Record<
  LocaleProduct,
  Record<string, PartialDetail>
> = {
  en: {
    "ray-spot/mr-1001": {
      name: "LUCA SERIES MR 1001 TRACK SPOT",
      category: "Track Spot",
      subtitle: "Masialux Luca Series LED Track Spot MR 1001 | 20W – 27W",
      description:
        "Masialux LED Track Spot MR 1001 provides directional lighting for retail, office and residential projects. It features a die-cast aluminium body, high-purity aluminium reflector and electrostatic powder coating.",
      usageAreas: ["Decoration", "Supermarkets", "Stores", "Homes"],
      features: [
        { label: "Body", value: "Aluminium die-cast body and head" },
        { label: "Reflector Type", value: "High-purity aluminium reflector" },
        { label: "Application Type", value: "Socket or driver with electronic ballast" },
        { label: "Finish Type", value: "Electrostatic powder coating" },
        { label: "Usage Type", value: "Track Spot" },
      ],
      technicalSpecs: [
        { label: "Driver Current", value: "500 mA – 800 mA" },
        { label: "Voltage", value: "220V" },
        { label: "Frequency", value: "50 Hz" },
        { label: "Active Power", value: "20W – 27W" },
        { label: "Luminous Flux", value: "2380 lm – 3150 lm" },
        { label: "Light Source", value: "Mid Power LED" },
      ],
      mountingSafetyWarnings: [
        "Your track spot;",
        "When receiving, check for any physical damage. Request replacement of transport-damaged products from the carrier or warehouse and verify that any accessories that should come with the product are complete.",
        "Keep the original box or packaging, accessories and invoice for future service needs.",
        "Ensure that the product barcode, model and serial number are not damaged.",
        "If these cannot be read or are worn, your product is not covered by warranty.",
        "The product must not be used for purposes other than its intended use.",
        "The seller is not liable for injury or damage resulting from improper use of the product.",
        "Electrical connections must be made only by qualified personnel.",
        "Ensure the power supply is switched off during installation.",
        "Do not use the product if the power cables are damaged. Otherwise it may cause death, serious injury or material damage.",
        "Before starting installation, ensure that the cables and the product's outer surfaces are not damaged.",
        "Ensure that the supply voltage does not exceed the operating voltage stated on the label.",
        "In case of incompatibility, the seller cannot be held responsible for malfunctions and such faults are not covered by warranty.",
        "Only the additional accessories specified by our company shall be used for mounting.",
        "Mains connection must be made with materials complying with the relevant country's electrical regulations.",
        "Do not use in areas with electrical leakage.",
        "Cable connection points must be insulated with terminal blocks or heat shrink tubing.",
        "Do not modify, repair, tamper with or physically interfere with the product. This may cause material damage and will void the product warranty.",
      ],
      importantWarnings: [
        "In case of any malfunction of the track spot, contact our authorised service.",
        "Do not allow anyone other than our authorised technical service to interfere with the product. Such interference will void the warranty entirely.",
        "If the product's flexible cable or cord is damaged, it must be replaced by an authorised person to avoid hazard.",
        "When the product is in operation its surface is hot; disconnect power and do not touch until cool. Do not look directly at the product when it is on.",
        "Do not clean the surface with flammable substances such as alcohol or petrol.",
        "Keep out of reach of children and store in the product box.",
      ],
      warrantyTerms: {
        title: "WARRANTY CERTIFICATE | Warranty Terms",
        items: [
          "Track spot;",
          "Warranty period starts from the invoice date and is 2 years.",
          "All parts are covered by warranty.",
          "If a defect is found, the consumer may, under Article 11 of the Consumer Protection Law No. 6502:",
          "a) Have it repaired free of charge.",
          "b) Request replacement with a new product if repair is not carried out.",
          "In case of free repair, the seller is obliged to carry out the repair without charging any labour, part replacement or other fees.",
          "If the product fails within the warranty period, the repair time is added to the warranty period. Repair time shall not exceed 20 working days.",
          "Defects arising from use contrary to the user manual are not covered by warranty.",
          "Defects due to electrical or user-related causes (power cuts, voltage fluctuations, use of unauthorised accessories, etc.), any intervention other than authorised service, damage to the warranty label, damage to the outer surface of the product, or use in dusty, humid or extreme temperatures, and damage from natural disasters are not covered by warranty.",
        ],
      },
      downloads: [
        { label: "Datasheet" },
        { label: "User Manual" },
        { label: "2D Drawing" },
        { label: "3D Drawing" },
        { label: "LDT Files" },
      ],
      bodyColorOptions: [
        { label: "Black", value: "black" },
        { label: "White", value: "white" },
        { label: "RAL", value: "ral" },
      ],
      lightColorOptions: [
        { label: "2700 K", kelvin: 2700 },
        { label: "3000 K", kelvin: 3000 },
        { label: "4000 K", kelvin: 4000 },
        { label: "6500 K", kelvin: 6500 },
      ],
    },
  },
  ar: {
    "ray-spot/mr-1001": {
      name: "سلسلة لوكا MR 1001 سبوت ريل",
      category: "سبوت ريل",
      subtitle: "ماسيالوكس سلسلة لوكا LED سبوت ريل MR 1001 | 20 واط – 27 واط",
      description:
        "ماسيالوكس LED سبوت ريل MR 1001 يوفر إضاءة اتجاهية لمشاريع البيع بالتجزئة والمكاتب والسكن. يتميز بهيكل من الألومنيوم المصبوب وعاكس ألومنيوم عالي النقاء وطلاء إلكتروستاتيكي مسحوقي.",
      usageAreas: ["ديكور", "السوبرماركت", "المتاجر", "المنازل"],
      features: [
        { label: "الهيكل", value: "هيكل ورأس من الألومنيوم المصبوب" },
        { label: "نوع العاكس", value: "عاكس ألومنيوم عالي النقاء" },
        { label: "طريقة التطبيق", value: "مقبس أو مشغل مع بالاست إلكتروني" },
        { label: "نوع الطلاء", value: "طلاء إلكتروستاتيكي مسحوقي" },
        { label: "نوع الاستخدام", value: "سبوت ريل" },
      ],
      technicalSpecs: [
        { label: "تيار السائق", value: "500 مللي أمبير – 800 مللي أمبير" },
        { label: "الجهد", value: "220 فولت" },
        { label: "التردد", value: "50 هرتز" },
        { label: "الاستطاعة الفعالة", value: "20 واط – 27 واط" },
        { label: "التدفق الضوئي", value: "2380 لومن – 3150 لومن" },
        { label: "مصدر الضوء", value: "ليد متوسط القدرة" },
      ],
      mountingSafetyWarnings: [
        "سبوت الريل الخاص بك؛",
        "عند الاستلام، تحقق من أي ضرر مادي. اطلب استبدال المنتجات التالفة أثناء النقل من الناقل أو المستودع وتأكد من اكتمال أي ملحقات يجب أن تأتي مع المنتج.",
        "احتفظ بالصندوق أو التغليف الأصلي والملحقات والفاتورة لاحتياجات الخدمة المستقبلية.",
        "تأكد من عدم تلف الرمز الشريطي للمنتج والموديل والرقم التسلسلي.",
        "إذا تعذر قراءتها أو كانت بالية، فإن منتجك غير مشمول بالضمان.",
        "يجب ألا يُستخدم المنتج لأغراض غير الاستخدام المقصود.",
        "البائع غير مسؤول عن الإصابة أو الضرر الناتج عن الاستخدام غير السليم للمنتج.",
        "يجب أن تتم التوصيلات الكهربائية فقط من قبل شخص مؤهل.",
        "تأكد من إيقاف التيار الكهربائي أثناء التثبيت.",
        "لا تستخدم المنتج إذا كانت كابلات الطاقة تالفة. قد يتسبب ذلك في الوفاة أو إصابة خطيرة أو أضرار مادية.",
        "قبل بدء التثبيت، تأكد من أن الكابلات والأسطح الخارجية للمنتج غير تالفة.",
        "تأكد من أن جهد التغذية لا يتجاوز جهد التشغيل المذكور على الملصق.",
        "في حالة عدم التوافق، لا يمكن تحميل البائع مسؤولية الأعطال ولا تُغطى هذه الأعطال بالضمان.",
        "يجب استخدام الملحقات الإضافية المحددة من شركتنا فقط للتركيب.",
        "يجب أن يتم توصيل الشبكة بمواد متوافقة مع لوائح الكهرباء في البلد المعني.",
        "لا تستخدم في الأماكن التي بها تسرب كهربائي.",
        "يجب عزل نقاط توصيل الكابلات بواسطة كتل طرفية أو أنابيب تقلص حراري.",
        "لا تعدل أو تصلح أو تعبث أو تتدخل جسدياً في المنتج. قد يتسبب ذلك في أضرار مادية وسيلغي ضمان المنتج.",
      ],
      importantWarnings: [
        "في حالة أي عطل في سبوت الريل، اتصل بخدمتنا المعتمدة.",
        "لا تسمح لأي شخص غير خدمتنا الفنية المعتمدة بالتدخل في المنتج. مثل هذا التدخل يلغي الضمان بالكامل.",
        "إذا تلف كابل أو سلك المنتج المرن، يجب استبداله من قبل شخص مؤهل لتجنب الخطر.",
        "عند تشغيل المنتج يكون سطحه ساخناً؛ افصل التيار ولا تلمسه حتى يبرد. لا تنظر مباشرة إلى المنتج وهو يعمل.",
        "لا تنظف السطح بمواد قابلة للاشتعال مثل الكحول أو البنزين.",
        "احفظه بعيداً عن متناول الأطفال وفي صندوق المنتج.",
      ],
      warrantyTerms: {
        title: "شهادة الضمان | شروط الضمان",
        items: [
          "سبوت الريل؛",
          "تبدأ فترة الضمان من تاريخ الفاتورة وهي سنتان.",
          "جميع الأجزاء مشمولة بالضمان.",
          "في حال اكتشاف عيب، يجوز للمستهلك بموجب المادة 11 من قانون حماية المستهلك:",
          "أ) إصلاحه مجاناً.",
          "ب) طلب استبداله بمنتج جديد إذا لم يتم الإصلاح.",
          "في حالة الإصلاح المجاني، البائع ملزم بإجراء الإصلاح دون تحصيل أي رسوم عمل أو قطع غيار أو غيرها.",
          "إذا تعطل المنتج خلال فترة الضمان، يُضاف وقت الإصلاح إلى فترة الضمان. لا يتجاوز وقت الإصلاح 20 يوماً عمل.",
          "العيوب الناتجة عن الاستخدام المخالف لكتيب الاستخدام غير مشمولة بالضمان.",
          "العيوب بسبب كهربائي أو مستخدم (انقطاع التيار، تقلبات الجهد، استخدام ملحقات غير معتمدة، إلخ)، أي تدخل غير الخدمة المعتمدة، تلف ملصق الضمان، تلف السطح الخارجي للمنتج، أو الاستخدام في بيئة مغبرة أو رطبة أو حرارة قصوى، والأضرار الناتجة عن كوارث طبيعية غير مشمولة بالضمان.",
        ],
      },
      downloads: [
        { label: "ورقة البيانات" },
        { label: "دليل الاستخدام" },
        { label: "رسم ثنائي الأبعاد" },
        { label: "رسم ثلاثي الأبعاد" },
        { label: "ملفات LDT" },
      ],
      bodyColorOptions: [
        { label: "أسود", value: "black" },
        { label: "أبيض", value: "white" },
        { label: "RAL", value: "ral" },
      ],
      lightColorOptions: [
        { label: "2700 K", kelvin: 2700 },
        { label: "3000 K", kelvin: 3000 },
        { label: "4000 K", kelvin: 4000 },
        { label: "6500 K", kelvin: 6500 },
      ],
    },
  },
};
