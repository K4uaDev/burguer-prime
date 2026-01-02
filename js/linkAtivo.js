const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".link-usuario");

const observerOptions = {
  root: null,
  threshold: 0.6, // 60% da seção precisa estar visível
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Remove a classe 'ativo' de todos os links
      navLinks.forEach((link) => link.classList.remove("ativo"));

      // Adiciona apenas no link que aponta para a seção visível
      const activeLink = document.querySelector(
        `.link-usuario[href="#${entry.target.id}"]`
      );
      if (activeLink) {
        activeLink.classList.add("ativo");
      }
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));
