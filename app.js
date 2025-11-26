/**
 * PORTFÓLIO NATALIA OLIVEIRA SANTOS
 * JavaScript para interatividade e funcionalidades
 */

// ============================================
// DADOS DO PORTFÓLIO (JSON)
// ============================================
const portfolioData = {
  "personalInfo": {
    "name": "Natalia Oliveira Santos",
    "age": 29,
    "location": "Campos dos Goytacazes, RJ",
    "profession": "Técnica de Enfermagem Pediátrica",
    "coren": "002.258.266",
    "maritalStatus": "Casada",
    "children": true
  },
  "contact": {
    "phone": "(22) 99942-7139",
    "email": "natyoliver486@gmail.com",
    "location": "Campos dos Goytacazes, RJ"
  },
  "education": [
    {
      "degree": "Técnica de Enfermagem",
      "institution": "Instituto Politécnico de Ensino (IPE)",
      "theoryGrade": 8.1,
      "practiceGrade": 9.8
    },
    {
      "course": "Semana do Curativo",
      "institution": "Qualis Educação Continuada e Consultoria",
      "date": "Novembro 2024"
    }
  ],
  "experience": [
    {
      "position": "Técnica de Enfermagem Pediátrica",
      "company": "CRVST - Prefeitura de Campos",
      "period": "Março - Agosto 2025",
      "description": "Acompanhamento especializado de crianças e adolescentes em situação de vulnerabilidade social durante internações hospitalares"
    },
    {
      "position": "Técnica de Enfermagem - Home Care",
      "company": "Cooperativa Actual",
      "period": "Agosto 2025 - Presente",
      "description": "Atendimento domiciliar especializado para idosos"
    }
  ],
  "competencies": {
    "technical": [
      "Cuidados pediátricos especializados",
      "Administração de medicamentos EV, VO, inalatória",
      "Punção venosa periférica",
      "Manejo de sondas nasoenterais",
      "Curativos especializados",
      "Monitorização clínica contínua"
    ],
    "critical": [
      "Identificação precoce de intercorrências",
      "Questionamento técnico fundamentado",
      "Gestão de crises",
      "Tomada de decisões baseadas em evidências"
    ],
    "multidisciplinary": [
      "Colaboração com equipe multidisciplinar",
      "Participação em rounds médicos",
      "Comunicação assertiva",
      "Interface equipe-família"
    ],
    "documentation": [
      "Relatórios técnicos detalhados",
      "Registro minucioso de procedimentos",
      "Documentação por períodos",
      "Continuidade do cuidado"
    ],
    "humanization": [
      "Abordagem centrada no paciente",
      "Acolhimento humanizado",
      "Comunicação empática",
      "Valores cristãos na prática"
    ]
  },
  "values": [
    "Valores Cristãos",
    "Compromisso Familiar",
    "Ética Profissional",
    "Educação Continuada"
  ],
  "testimonial": "Cuidar de crianças é um privilégio que exige não apenas competência técnica, mas sensibilidade, dedicação e compromisso com cada detalhe. É isso que me motiva a cada plantão."
};

// ============================================
// NAVEGAÇÃO E MENU
// ============================================

// Elementos do DOM
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Toggle do menu mobile
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Navegação suave e atualização de link ativo
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Ajuste para altura do navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Fechar menu mobile após clique
    navMenu.classList.remove('active');
    
    // Atualizar link ativo
    updateActiveLink(targetId);
  });
});

// Atualizar link ativo baseado na posição do scroll
window.addEventListener('scroll', () => {
  let currentSection = '';
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = '#' + section.getAttribute('id');
    }
  });
  
  if (currentSection) {
    updateActiveLink(currentSection);
  }
});

// Função para atualizar link ativo
function updateActiveLink(targetId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

// ============================================
// MODAL DE DEPOIMENTO
// ============================================

const testimonialBtn = document.getElementById('testimonialBtn');
const testimonialModal = document.getElementById('testimonialModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

// Abrir modal
if (testimonialBtn) {
  testimonialBtn.addEventListener('click', () => {
    testimonialModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll do body
  });
}

// Fechar modal
function closeModal() {
  testimonialModal.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll do body
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && testimonialModal.classList.contains('active')) {
    closeModal();
  }
});

// ============================================
// FILTRO DE COMPETÊNCIAS
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const competencyCards = document.querySelectorAll('.competency-card');

// Mapeamento de filtros para categorias
const filterMap = {
  'all': ['tecnica', 'critico', 'multidisciplinar', 'documentacao', 'humanizacao'],
  'tecnica': ['tecnica'],
  'critico': ['critico'],
  'multidisciplinar': ['multidisciplinar'],
  'documentacao': ['documentacao'],
  'humanizacao': ['humanizacao']
};

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remover classe active de todos os botões
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Adicionar classe active ao botão clicado
    button.classList.add('active');
    
    // Obter filtro selecionado
    const filter = button.getAttribute('data-filter');
    const allowedCategories = filterMap[filter] || [];
    
    // Filtrar cards
    filterCompetencyCards(allowedCategories);
  });
});

function filterCompetencyCards(allowedCategories) {
  competencyCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (allowedCategories.includes(cardCategory)) {
      card.classList.remove('hidden');
      // Animação suave de entrada
      card.style.animation = 'fadeIn 0.3s ease-in-out';
    } else {
      card.classList.add('hidden');
    }
  });
}

// Adicionar animação CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ============================================
// ANIMAÇÕES DE SCROLL (Intersection Observer)
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar elementos para animação
const animatedElements = document.querySelectorAll(
  '.card, .timeline-item, .experience-card, .competency-card, .impact-card, .challenge-card, .value-card'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ============================================
// UTILITÁRIOS
// ============================================

// Função para obter dados do portfólio
function getPortfolioData() {
  return portfolioData;
}

// Função para formatar telefone
function formatPhone(phone) {
  return phone.replace(/\D/g, '')
    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Função para validar email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Log de inicialização
console.log('Portfólio de Natalia Oliveira Santos inicializado');
console.log('Dados disponíveis:', portfolioData);

// ============================================
// EXPORTAR DADOS (para uso futuro/integração)
// ============================================

// Disponibilizar dados globalmente para integrações futuras
window.NataliaPortfolio = {
  data: portfolioData,
  getData: getPortfolioData,
  formatPhone: formatPhone,
  validateEmail: validateEmail
};