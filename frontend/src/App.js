import "@/App.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Target, 
  Heart,
  Users,
  Zap,
  Menu,
  X
} from "lucide-react";

// Assets - Updated with correct URLs
const LOGO_URL = "https://customer-assets.emergentagent.com/job_taekwondo-landing/artifacts/d80gezzv_image.png";
const HERO_BG_URL = "https://customer-assets.emergentagent.com/job_taekwondo-landing/artifacts/58wfbeb0_Fundo%20site.png";
const WILLIAM_URL = "https://customer-assets.emergentagent.com/job_taekwondo-landing/artifacts/cgifsr9u_William%20%281%29.png";
const WHATSAPP_URL = "https://wa.me/553199490457?text=Ol%C3%A1%2C%20professor%20William!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20gratuita.";
const INSTAGRAM_URL = "https://www.instagram.com/equipefidelistkd/";
const WHATSAPP_ICON_URL = "https://customer-assets.emergentagent.com/job_taekwondo-landing/artifacts/7fxu00vt_image.png";

// Gallery Images
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1734189230018-490c04c78001?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1758778933112-af9fde620101?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1765303191119-89d0221d5c0b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1769095216189-0ae27b6cc726?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1769095213266-4e8a64c8f874?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  "https://images.unsplash.com/photo-1758778932701-76ef06971b93?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
];

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24 }) => (
  <img 
    src={WHATSAPP_ICON_URL} 
    alt="WhatsApp" 
    style={{ width: size, height: size, objectFit: 'contain' }}
  />
);

// Split Button Component with diagonal animation
const SplitButton = ({ children, href, className = "", testId }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      // Navigate after animation
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }, 400);
    e.preventDefault();
  };

  return (
    <button
      onClick={handleClick}
      className={`split-button relative overflow-hidden ${className} ${isClicked ? 'is-clicked' : ''}`}
      data-testid={testId}
    >
      <span className="split-button-top">{children}</span>
      <span className="split-button-bottom">{children}</span>
      <span className="split-button-content">{children}</span>
    </button>
  );
};

// Premium Animation Variants - Slide from sides
const slideFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.8, 0.25, 1] 
    } 
  }
};

const slideFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.8, 0.25, 1] 
    } 
  }
};

const slideFromBottom = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.8, 0.25, 1] 
    } 
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.8, 0.25, 1] 
    } 
  }
};

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/95 navbar-blur border-b border-white/5 py-3" 
          : "bg-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img 
            src={LOGO_URL} 
            alt="CT Fidelis" 
            className={`transition-all duration-300 ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-12'} w-auto`}
            data-testid="navbar-logo"
          />
        </a>
        
        <SplitButton
          href={WHATSAPP_URL}
          className="hidden md:flex items-center gap-2 btn-premium bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider px-8 py-3 text-sm"
          testId="navbar-cta-btn"
        >
          <WhatsAppIcon size={18} />
          Agendar
        </SplitButton>

        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/98 navbar-blur border-t border-white/5 px-6 py-6"
        >
          <SplitButton
            href={WHATSAPP_URL}
            className="flex items-center justify-center gap-2 w-full btn-premium bg-red-600 text-white font-bold uppercase tracking-wider px-8 py-4 text-sm"
            testId="mobile-cta-btn"
          >
            <WhatsAppIcon size={18} />
            Agendar Aula Gratuita
          </SplitButton>
        </motion.div>
      )}
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 hero-bg"
          style={{ 
            backgroundImage: `url(${HERO_BG_URL})`,
          }}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay z-10" />
      
      {/* Red Glow */}
      <div className="absolute inset-0 red-glow-bg z-10" />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 max-w-6xl mx-auto px-6 lg:px-12 py-32 text-center"
      >
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span 
              className="inline-block badge-premium bg-red-600/20 border border-red-500/50 text-red-400 font-semibold uppercase tracking-[0.2em] text-xs px-6 py-2"
              data-testid="hero-badge"
            >
              Transformação Real
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] text-glow-strong tracking-wide"
            data-testid="hero-title"
          >
            Molde Seu Corpo
            <br />
            <span className="text-red-500">Construa Seu Caráter</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light"
            data-testid="hero-subtitle"
          >
            Disciplina, força e respeito. Uma jornada para a vida.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <SplitButton
              href={WHATSAPP_URL}
              className="inline-flex items-center gap-3 btn-premium bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-sm md:text-base px-10 md:px-14 py-4 md:py-5"
              testId="hero-cta-btn"
            >
              <WhatsAppIcon size={22} />
              Aula Gratuita
            </SplitButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-20" />
    </section>
  );
};

// Audience Card Component
const AudienceCard = ({ title, description, benefits, Icon, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = index === 0 ? slideFromLeft : slideFromRight;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="card-premium p-8 md:p-10"
      data-testid={`audience-card-${index}`}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-red-600/30 to-red-900/20 border border-red-500/30 flex items-center justify-center">
          <Icon className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{title}</h3>
      </div>
      
      <p className="text-neutral-400 mb-8 text-base leading-relaxed">{description}</p>
      
      <ul className="space-y-4">
        <li className="flex items-center gap-4 text-neutral-200">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          <span className="text-sm md:text-base">{benefits[0]}</span>
        </li>
        <li className="flex items-center gap-4 text-neutral-200">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          <span className="text-sm md:text-base">{benefits[1]}</span>
        </li>
        <li className="flex items-center gap-4 text-neutral-200">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          <span className="text-sm md:text-base">{benefits[2]}</span>
        </li>
        <li className="flex items-center gap-4 text-neutral-200">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          <span className="text-sm md:text-base">{benefits[3]}</span>
        </li>
      </ul>
    </motion.div>
  );
};

// Target Audience Section
const TargetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-36 bg-[#050505] relative"
      data-testid="target-section"
    >
      <div className="section-divider w-full mb-24" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideFromBottom}
          className="text-center mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-wide" data-testid="target-title">
            Para Quem É o{" "}
            <span className="text-red-500">CT Fidelis</span>?
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto font-light">
            Seja você pai buscando o melhor para seu filho ou adulto em busca de transformação.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <AudienceCard 
            title="Para Seus Filhos"
            description="Disciplina, respeito e foco longe das telas. Desenvolva valores que acompanharão seus filhos por toda a vida."
            benefits={["Foco nos estudos", "Disciplina e respeito", "Autoconfiança", "Valores para a vida"]}
            Icon={Users}
            index={0}
          />
          <AudienceCard 
            title="Para Você"
            description="Condicionamento físico, defesa pessoal e alívio do stress. Transforme seu corpo e sua mente."
            benefits={["Força e agilidade", "Defesa pessoal real", "Alívio do estresse", "Comunidade vencedora"]}
            Icon={Zap}
            index={1}
          />
        </div>
      </div>
    </section>
  );
};

// Pillar Card Component
const PillarCard = ({ title, desc, Icon, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.8, 0.25, 1] }}
      className="pillar-card flex items-start gap-5 p-5 bg-neutral-900/30 border border-white/5"
      data-testid={`pillar-${index}`}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-red-600/30 to-red-900/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-red-500" />
      </div>
      <div>
        <h4 className="font-bold text-white mb-1 text-sm uppercase tracking-wider">{title}</h4>
        <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

// Authority Section (William)
const AuthoritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-36 bg-[#080808] relative overflow-hidden"
      data-testid="authority-section"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideFromLeft}
            className="space-y-10 order-2 lg:order-1"
          >
            <div>
              <span className="inline-block badge-premium bg-red-600/20 border border-red-500/50 text-red-400 font-semibold uppercase tracking-[0.2em] text-xs px-4 py-1.5 mb-6">
                Liderança
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-wide" data-testid="authority-title">
                William{" "}
                <span className="text-red-500">Fidelis</span>
              </h2>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                Dedicação baseada em honestidade e firmeza. Mais de 15 anos formando campeões no tatame e na vida.
              </p>
            </div>

            {/* Pillars */}
            <div className="space-y-4">
              <PillarCard title="Técnica Impecável" desc="Fundamentos sólidos e movimentos precisos" Icon={Target} index={0} />
              <PillarCard title="Disciplina Inegociável" desc="Comprometimento total com a excelência" Icon={Shield} index={1} />
              <PillarCard title="Respeito Mútuo" desc="Base de toda relação no tatame e na vida" Icon={Heart} index={2} />
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-5"
            >
              <div className="quote-line flex-shrink-0" />
              <div>
                <p className="text-lg md:text-xl lg:text-2xl text-white italic font-light leading-relaxed" data-testid="authority-quote">
                  "Cada aluno é um campeão em formação"
                </p>
                <cite className="text-neutral-500 text-sm mt-3 block not-italic">— Professor William Fidelis</cite>
              </div>
            </motion.div>
          </motion.div>

          {/* Image - Smaller on mobile */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideFromRight}
            className="relative order-1 lg:order-2"
          >
            <div className="william-image-container aspect-square md:aspect-[3/4] max-h-[350px] md:max-h-none bg-neutral-900 overflow-hidden mx-auto w-full max-w-[280px] md:max-w-none">
              <img 
                src={WILLIAM_URL}
                alt="Professor William Fidelis"
                className="w-full h-full object-cover object-top"
                data-testid="william-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border border-red-600/20 -z-10 max-w-[280px] md:max-w-none mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Image Carousel Section - Smaller cards with preview
const CarouselSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  // Touch/drag handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  // Calculate card width percentage (70% for main card, showing 15% on each side)
  const cardWidth = 70; // percentage
  const gap = 2; // percentage gap between cards

  return (
    <section 
      ref={ref}
      className="py-24 md:py-36 bg-[#050505] overflow-hidden"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideFromBottom}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-wide" data-testid="gallery-title">
            Veja a{" "}
            <span className="text-red-500">Energia</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg font-light">
            Conheça a rotina de treinos e a dedicação dos nossos atletas.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Carousel Track */}
          <div 
            className="relative overflow-hidden py-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="flex items-center"
              animate={{ 
                x: `calc(-${currentIndex * (cardWidth + gap)}% + ${(100 - cardWidth) / 2}%)` 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
              }}
            >
              {GALLERY_IMAGES.map((src, index) => {
                const isActive = index === currentIndex;
                const distance = Math.abs(index - currentIndex);
                
                return (
                  <motion.div 
                    key={index}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${cardWidth}%` }}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => goToSlide(index)}
                    data-testid={`carousel-slide-${index}`}
                  >
                    <div 
                      className={`carousel-card aspect-[4/3] overflow-hidden bg-neutral-900 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isActive ? 'shadow-2xl shadow-red-900/20' : ''
                      }`}
                    >
                      <img 
                        src={src}
                        alt={`Treino CT Fidelis ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading={index <= 2 ? "eager" : "lazy"}
                      />
                      {/* Overlay for non-active */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {GALLERY_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-red-500' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                data-testid={`carousel-dot-${index}`}
                aria-label={`Ir para foto ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-0.5 bg-white/10 overflow-hidden rounded-full max-w-md mx-auto">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: "0%" }}
              animate={{ width: isAutoPlaying ? "100%" : `${(currentIndex / (GALLERY_IMAGES.length - 1)) * 100}%` }}
              transition={{ 
                duration: isAutoPlaying ? 4 : 0.3,
                ease: "linear"
              }}
              key={isAutoPlaying ? currentIndex : 'manual'}
            />
          </div>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-14"
        >
          <SplitButton
            href={INSTAGRAM_URL}
            className="inline-flex items-center gap-3 btn-premium border border-white/20 hover:border-red-500/50 text-white font-semibold uppercase tracking-wider text-sm px-10 py-4 transition-all hover:bg-red-600/10"
            testId="instagram-btn"
          >
            <Instagram size={18} />
            @equipefidelistkd
          </SplitButton>
        </motion.div>
      </div>
    </section>
  );
};

// Final CTA Section
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-36 bg-[#080808] relative overflow-hidden"
      data-testid="cta-section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 red-glow-bg" />
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={scaleIn}
          className="space-y-10"
        >
          {/* Title */}
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white text-glow-strong tracking-wide"
            data-testid="cta-title"
          >
            Seu Primeiro{" "}
            <span className="text-red-500">Passo</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 font-light">
            Aula gratuita. Sem custos.{" "}
            <span className="text-white font-medium">Sem compromisso.</span>
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SplitButton
              href={WHATSAPP_URL}
              className="inline-flex items-center gap-3 btn-premium bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-base md:text-lg px-12 md:px-16 py-5 md:py-6"
              testId="cta-main-btn"
            >
              <WhatsAppIcon size={26} />
              Agendar Agora
            </SplitButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-20 bg-[#050505] border-t border-white/5" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Logo & Description */}
          <div className="space-y-6">
            <img 
              src={LOGO_URL} 
              alt="CT Fidelis" 
              className="h-12 w-auto"
              data-testid="footer-logo"
            />
            <p className="text-neutral-500 text-sm leading-relaxed">
              Formando campeões desde 2009.
              <br />
              Taekwondo em Belo Horizonte.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+553199490457"
                  className="flex items-center gap-4 text-neutral-400 hover:text-red-500 transition-colors text-sm"
                  data-testid="footer-phone"
                >
                  <Phone size={16} />
                  (31) 99490-4574
                </a>
              </li>
              <li>
                <a 
                  href="mailto:williamf.silva157@gmail.com"
                  className="flex items-center gap-4 text-neutral-400 hover:text-red-500 transition-colors text-sm"
                  data-testid="footer-email"
                >
                  <Mail size={16} />
                  williamf.silva157@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-4 text-neutral-400 text-sm">
                  <MapPin size={16} />
                  Belo Horizonte, MG
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Redes Sociais</h4>
            <div className="flex gap-4">
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500/50 transition-all"
                data-testid="footer-instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center hover:border-green-500/50 transition-all"
                data-testid="footer-whatsapp"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-neutral-600 text-xs tracking-wide">
            © {new Date().getFullYear()} CT Fidelis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Float Button
const WhatsAppFloat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        scale: visible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
      className="whatsapp-float w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl"
      data-testid="whatsapp-float-btn"
      aria-label="Contato via WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  );
};

// Main App
function App() {
  return (
    <div className="App">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <HeroSection />
        <TargetSection />
        <AuthoritySection />
        <CarouselSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
