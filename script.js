// المشروعات الافتراضية
const defaultProjects = [
    { id: 1, title: 'كمبوند ريفيرا السكني', desc: 'مجمع متكامل يضم عمارات سكنية منظمة بتصميمات عصرية ومساحات مريحة للعائلات.', price: 'تبدأ الأسعار من 4,500,000 ج.م', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600', gallery: [] },
    { id: 2, title: 'كمبوند النخيل السكني', desc: 'مشروع سكنى هادئ يتألف من عدة عمارات مع تنظيم ممتاز ومداخل راقية.', price: 'تبدأ الأسعار من 5,200,000 ج.م', img: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=600', gallery: [] },
    { id: 3, title: 'مشروع دار الأمان السكني', desc: 'مجتمع عمراني مصغر يضم عمارات سكنية متجاورة في موقع حيوي يخدم الأسر.', price: 'تبدأ الأسعار من 3,800,000 ج.م', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=600', gallery: [] }
];

function getProjects() {
    const saved = localStorage.getItem('almotaheda_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
}

// تطبيق إعدادات النصوص والسلايدر والتواصل
document.addEventListener('DOMContentLoaded', () => {
    // 1. تطبيق النصوص العامة
    const settings = JSON.parse(localStorage.getItem('almotaheda_settings')) || {
        heroTitle: 'نبني مستقبل الاستثمار والسكن الفاخر مع المتحدة',
        heroDesc: 'نبتكر مجتمعات سكنية متكاملة ومشاريع استثمارية واعدة بمواصفات عالمية وأسعار تنافسية.',
        aboutTitle: 'من نحن؟ شركة المتحدة للتطوير العقاري',
        aboutDesc: 'نحن شركة رائدة في مجال التطوير العقاري وبناء المجمعات السكنية المتكاملة.',
        phone: '19888',
        whatsapp: '201000000000'
    };

    const titleEl = document.getElementById('dyn-hero-title');
    const descEl = document.getElementById('dyn-hero-desc');
    if (titleEl) titleEl.innerHTML = `${settings.heroTitle.replace('المتحدة', '<span>المتحدة</span>')}`;
    if (descEl) descEl.textContent = settings.heroDesc;

    const aboutT = document.getElementById('dyn-about-title');
    const aboutD = document.getElementById('dyn-about-desc');
    if (aboutT) aboutT.textContent = settings.aboutTitle;
    if (aboutD) aboutD.textContent = settings.aboutDesc;

    const contactEl = document.getElementById('dyn-contact-info');
    if (contactEl) {
        contactEl.innerHTML = `
            <p>📍 المقر الرئيسي: التجمع السكني الإداري - مصر</p>
            <p>📞 الخط الساخن: ${settings.phone}</p>
            <p>💬 واتساب المبيعات: ${settings.whatsapp}</p>
            <p>✉️ البريد الإلكتروني: sales@almotaheda-realestate.com</p>
        `;
    }

    // ربط زر الواتساب العائم برقم الهاتف المدخل من الأدمن
    const whatsappBtn = document.getElementById('whatsapp-float-btn');
    if (whatsappBtn && settings.whatsapp) {
        whatsappBtn.href = `https://wa.me/${settings.whatsapp}?text=مرحباً، أرغب في الاستفسار عن مشروعات شركة المتحدة العقارية`;
    }

    // 2. إعداد سلايدر الصور الخلفية للواجهة
    const defaultSlides = [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400',
        'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1400',
        'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1400',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1400'
    ];
    const slidesArr = JSON.parse(localStorage.getItem('almotaheda_hero_slides')) || defaultSlides;
    const sliderContainer = document.getElementById('hero-slider-container');

    if (sliderContainer) {
        sliderContainer.innerHTML = '';
        slidesArr.forEach((url, idx) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `bg-slide ${idx === 0 ? 'active' : ''}`;
            slideDiv.style.backgroundImage = `url('${url}')`;
            sliderContainer.appendChild(slideDiv);
        });

        let currentSlide = 0;
        const slides = sliderContainer.querySelectorAll('.bg-slide');
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4500);
        }
    }

    // 3. عرض المشروعات في الصفحة الرئيسية مع توجيه لصفحة التفاصيل
    const container = document.getElementById('projects-container');
    if (container) {
        const projectsData = getProjects();
        container.innerHTML = '';

        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.img}" alt="${project.title}">
                <div class="project-body">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="project-footer">
                        <span class="price">${project.price}</span>
                        <a href="project.html?id=${project.id}" class="details-btn" style="text-decoration:none; display:inline-block;">تفاصيل المشروع</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
});

// وظائف النافذة المنبثقة
function showCustomModal(title, message) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = message;
    document.getElementById('site-modal').classList.add('active');
}

function closeCustomModal() {
    document.getElementById('site-modal').classList.remove('active');
}