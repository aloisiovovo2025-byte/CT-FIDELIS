import "@/App.css";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  MessageCircle, 
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

// Assets
const LOGO_URL = "https://customer-assets.emergentagent.com/job_taekwondo-landing/artifacts/d80gezzv_image.png";
const WILLIAM_URL = "https://customer-assets.emergentagent.com/job_taekwondo-landing/artifacts/npkxbt9c_image.png";
const WHATSAPP_URL = "https://wa.me/553199490457?text=Ol%C3%A1%2C%20professor%20William!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20gratuita.";
const INSTAGRAM_URL = "https://www.instagram.com/equipefidelistkd/";

// Gallery Images
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1734189230018-490c04c78001?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1758778933112-af9fde620101?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1765303191119-89d0221d5c0b?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1769095216189-0ae27b6cc726?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1769095213266-4e8a64c8f874?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1758778932701-76ef06971b93?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 navbar-blur border-b border-white/5" 
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img 
            src={LOGO_URL} 
            alt="CT Fidelis" 
            className="h-10 md:h-12 w-auto"
            data-testid="navbar-logo"
          />
        </a>
        
        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block btn-skew bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider px-8 py-3"
          data-testid="navbar-cta-btn"
        >
          <span>Agendar</span>
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 navbar-blur border-t border-white/10 px-6 py-6"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full btn-skew bg-red-600 text-white font-bold uppercase tracking-wider px-8 py-4 text-center"
            data-testid="mobile-cta-btn"
          >
            <span>Agendar Aula Gratuita</span>
          </a>
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${WILLIAM_URL})`,
            filter: "brightness(0.6)"
          }}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay z-10" />

      {/* Red Glow */}
      <div className="absolute inset-0 red-glow-bg z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-32 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <span 
              className="inline-block bg-red-600/20 border border-red-600/50 text-red-500 font-bold uppercase tracking-widest text-sm px-6 py-2 badge-pulse"
              data-testid="hero-badge"
            >
              Transformação Real
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight text-glow"
            data-testid="hero-title"
          >
            Molde Seu Corpo<br />
            <span className="text-red-500">Construa Seu Caráter</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto"
            data-testid="hero-subtitle"
          >
            Disciplina, força e respeito. Uma jornada para a vida.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-skew bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-lg px-12 py-5"
              data-testid="hero-cta-btn"
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={24} />
                Aula Gratuita
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20" />
    </section>
  );
};

// Target Audience Section
const TargetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const audiences = [
    {
      title: "Para Seus Filhos",
      Icon: Users,
      description: "Disciplina, respeito e foco longe das telas.",
      benefits: [
        "Foco nos estudos",
        "Disciplina e respeito",
        "Autoconfiança",
        "Valores para a vida"
      ]
    },
    {
      title: "Para Você",
      Icon: Zap,
      description: "Condicionamento físico, defesa pessoal e alívio do stress.",
      benefits: [
        "Força e agilidade",
        "Defesa pessoal real",
        "Alívio do estresse",
        "Comunidade vencedora"
      ]
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 bg-[#050505] relative"
      data-testid="target-section"
    >
      {/* Section Divider */}
      <div className="section-divider w-full mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4" data-testid="target-title">
            Para Quem É o <span className="text-red-500">CT Fidelis</span>?
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Seja você pai buscando o melhor para seu filho ou adulto em busca de transformação.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="feature-card bg-neutral-900/50 border border-white/10 p-8 md:p-10"
              data-testid={`audience-card-${index}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-red-600/20 border border-red-600/50 flex items-center justify-center">
                  <audience.Icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">{audience.title}</h3>
              </div>
              
              <p className="text-neutral-400 mb-6">{audience.description}</p>
              
              <ul className="space-y-3">
                {audience.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <div className="w-2 h-2 bg-red-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Authority Section (William)
const AuthoritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    { Icon: Target, title: "Técnica Impecável", desc: "Fundamentos sólidos e movimentos precisos" },
    { Icon: Shield, title: "Disciplina Inegociável", desc: "Comprometimento total com a excelência" },
    { Icon: Heart, title: "Respeito Mútuo", desc: "Base de toda relação no tatame e na vida" }
  ];

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden"
      data-testid="authority-section"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block bg-red-600/20 border border-red-600/50 text-red-500 font-bold uppercase tracking-widest text-sm px-4 py-1 mb-4">
                Liderança
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4" data-testid="authority-title">
                William <span className="text-red-500">Fidelis</span>
              </h2>
              <p className="text-neutral-400 text-lg">
                Dedicação baseada em honestidade e firmeza. Mais de 15 anos formando campeões no tatame e na vida.
              </p>
            </div>

            {/* Pillars */}
            <div className="space-y-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-neutral-900/50 border border-white/5 hover:border-red-600/30 transition-colors"
                  data-testid={`pillar-${index}`}
                >
                  <div className="w-12 h-12 bg-red-600/20 flex items-center justify-center flex-shrink-0">
                    <pillar.Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{pillar.title}</h4>
                    <p className="text-neutral-400 text-sm">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="border-l-4 border-red-600 pl-6 py-4"
            >
              <p className="text-xl md:text-2xl text-white italic font-light" data-testid="authority-quote">
                "Cada aluno é um campeão em formação"
              </p>
              <cite className="text-neutral-400 text-sm mt-2 block">— Mestre William Fidelis</cite>
            </motion.blockquote>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-neutral-900 border border-red-600/30 overflow-hidden">
              <img 
                src={WILLIAM_URL}
                alt="Mestre William Fidelis"
                className="w-full h-full object-cover"
                data-testid="william-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-red-600/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Social Proof / Gallery Section
const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 bg-[#050505]"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4" data-testid="gallery-title">
            Veja a <span className="text-red-500">Energia</span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Conheça a rotina de treinos e a dedicação dos nossos atletas.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="gallery-item aspect-square bg-neutral-900"
              data-testid={`gallery-item-${index}`}
            >
              <img 
                src={img}
                alt={`Treino CT Fidelis ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-skew border border-white/20 hover:border-red-500 text-white font-bold uppercase tracking-wider px-8 py-4 transition-all hover:bg-white/5"
            data-testid="instagram-btn"
          >
            <span className="flex items-center gap-3">
              <Instagram size={20} />
              @equipefidelistkd
            </span>
          </a>
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
      className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden"
      data-testid="cta-section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 red-glow-bg opacity-50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <span 
              className="inline-block bg-red-600/20 border border-red-600/50 text-red-500 font-bold uppercase tracking-widest text-sm px-6 py-2 badge-pulse"
              data-testid="cta-badge"
            >
              Vagas Limitadas
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-4xl lg:text-6xl font-black text-white text-glow"
            data-testid="cta-title"
          >
            Seu Primeiro <span className="text-red-500">Passo</span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-neutral-300"
          >
            Aula gratuita. Sem custos. <span className="text-white font-semibold">Sem compromisso.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-skew bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider text-xl px-16 py-6"
              data-testid="cta-main-btn"
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={28} />
                Agendar Agora
              </span>
            </a>
          </motion.div>

          {/* Urgency */}
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-red-400 font-semibold"
            data-testid="cta-urgency"
          >
            Apenas 5 vagas esta semana
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-16 bg-[#050505] border-t border-white/5" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img 
              src={LOGO_URL} 
              alt="CT Fidelis" 
              className="h-12 w-auto"
              data-testid="footer-logo"
            />
            <p className="text-neutral-400">
              Formando campeões desde 2009.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wide">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+553199490457"
                  className="flex items-center gap-3 text-neutral-400 hover:text-red-500 transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone size={18} />
                  (31) 99490-4574
                </a>
              </li>
              <li>
                <a 
                  href="mailto:williamf.silva157@gmail.com"
                  className="flex items-center gap-3 text-neutral-400 hover:text-red-500 transition-colors"
                  data-testid="footer-email"
                >
                  <Mail size={18} />
                  williamf.silva157@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-neutral-400">
                  <MapPin size={18} />
                  Belo Horizonte, MG
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wide">Redes Sociais</h4>
            <div className="flex gap-4">
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all"
                data-testid="footer-instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-green-500 hover:border-green-500 transition-all"
                data-testid="footer-whatsapp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} CT Fidelis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// WhatsApp Float Button
const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
      data-testid="whatsapp-float-btn"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
};

// Main App
function App() {
  return (
    <div className="App">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <TargetSection />
        <AuthoritySection />
        <GallerySection />
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  );
}

export default App;
