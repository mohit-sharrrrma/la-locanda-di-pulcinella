/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Star,
  ChevronRight,
  Pizza,
  Leaf
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<{name: string, desc: string, price: string, img: string, tags?: string[]} | null>(null);
  const [activeCategory, setActiveCategory] = useState('Pizze Rosse');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const menuCategories = [
    {
      name: 'Pizze Rosse',
      items: [
        {
          name: "Margherita",
          desc: "Sauce tomate San Marzano, fior di latte, basilic frais, huile d'olive extra vierge.",
          price: "13€",
          img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop",
          tags: ["Végétarien"]
        },
        {
          name: "Margherita D.O.P",
          desc: "Sauce tomate San Marzano, mozzarella di bufala campana D.O.P, basilic frais, huile d'olive.",
          price: "16€",
          img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=1974&auto=format&fit=crop",
          tags: ["Végétarien"]
        },
        {
          name: "Vegetariana",
          desc: "Sauce tomate, fior di latte, légumes de saison grillés, huile d'olive.",
          price: "15€",
          img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
          tags: ["Végétarien"]
        },
        {
          name: "Burratina",
          desc: "Sauce tomate, tomates cerises, burrata entière fraîche, roquette, huile d'olive.",
          price: "18€",
          img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
          tags: ["Végétarien"]
        }
      ]
    },
    {
      name: 'Pizze Bianche',
      items: [
        {
          name: "Quattro Formaggi",
          desc: "Fior di latte, gorgonzola, provola fumée, parmigiano reggiano.",
          price: "16€",
          img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
          tags: ["Végétarien"]
        }
      ]
    },
    {
      name: 'Pâte Intégrale',
      items: [
        {
          name: "Vegana",
          desc: "Pâte à la farine intégrale, sauce tomate, légumes grillés, olives, basilic.",
          price: "15€",
          img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=2080&auto=format&fit=crop",
          tags: ["Végan"]
        }
      ]
    }
  ];

  const activeItems = menuCategories.find(c => c.name === activeCategory)?.items || [];

  return (
    <div className="min-h-screen bg-[var(--color-dough)] text-[var(--color-ink)] font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pizza className={`w-8 h-8 ${isScrolled ? 'text-[var(--color-pizza-red)]' : 'text-white'}`} />
            <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-[var(--color-ink)]' : 'text-white'}`}>
              La Locanda di Pulcinella
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 font-medium text-sm tracking-wide uppercase ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
            <a href="#histoire" className="hover:text-[var(--color-pizza-red)] transition-colors">Notre Histoire</a>
            <a href="#menu" className="hover:text-[var(--color-pizza-red)] transition-colors">Menu</a>
            <a href="#contact" className="hover:text-[var(--color-pizza-red)] transition-colors">Contact</a>
            <a href="https://lalocandadipulcinella.com/fr/commandes" target="_blank" rel="noreferrer" className="bg-[var(--color-pizza-red)] hover:bg-[var(--color-pizza-red-dark)] text-white px-6 py-2.5 rounded-full transition-colors flex items-center gap-2">
              Commander
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-[var(--color-ink)]' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-[var(--color-ink)]' : 'text-white'}`} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-serif text-center">
              <a href="#histoire" onClick={() => setMobileMenuOpen(false)}>Notre Histoire</a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href="https://lalocandadipulcinella.com/fr/commandes" target="_blank" rel="noreferrer" className="bg-[var(--color-pizza-red)] text-white px-8 py-4 rounded-full mt-4 text-lg font-sans uppercase tracking-wide inline-block">
                Commander
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pizza Details Modal */}
      <AnimatePresence>
        {selectedPizza && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPizza(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPizza(null)}
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white backdrop-blur-md p-2 rounded-full transition-colors shadow-sm"
              >
                <X className="w-6 h-6 text-[var(--color-ink)]" />
              </button>
              <div className="md:w-1/2 aspect-square md:aspect-auto relative">
                <img 
                  src={selectedPizza.img} 
                  alt={selectedPizza.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[var(--color-dough)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-4xl">{selectedPizza.name}</h3>
                  <span className="font-serif text-2xl text-[var(--color-pizza-red)]">{selectedPizza.price}</span>
                </div>
                
                {selectedPizza.tags && selectedPizza.tags.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {selectedPizza.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <Leaf className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-600 text-lg mb-8 leading-relaxed">{selectedPizza.desc}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="font-medium text-[var(--color-ink)]">Taille</span>
                    <span className="text-gray-500">Classique Napolitaine</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="font-medium text-[var(--color-ink)]">Cuisson</span>
                    <span className="text-gray-500">Four traditionnel</span>
                  </div>
                </div>

                <a 
                  href="https://lalocandadipulcinella.com/fr/commandes"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[var(--color-pizza-red)] hover:bg-[var(--color-pizza-red-dark)] text-white px-8 py-4 rounded-full text-lg font-semibold uppercase tracking-wider transition-colors text-center block"
                  onClick={() => setSelectedPizza(null)}
                >
                  Ajouter à la commande - {selectedPizza.price}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop" 
            alt="Pizza Napolitaine Authentique" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[var(--color-dough)] uppercase tracking-[0.2em] text-sm font-semibold mb-6 block">
              L'un des meilleurs restaurants de Paris
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              La Locanda di Pulcinella
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Une cuisine de qualité, rassemblant les plus délicieuses saveurs issues d'Italie, au cœur du 18ème arrondissement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://lalocandadipulcinella.com/fr/commandes" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-[var(--color-pizza-red)] hover:bg-[var(--color-pizza-red-dark)] text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all transform hover:scale-105 text-center">
                Livraison & À emporter
              </a>
              <a href="https://lalocandadipulcinella.com/fr/reservations" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all text-center">
                Réserver une table
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="histoire" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop" 
                alt="Chef préparant la pizza" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-xs">
              <p className="font-serif text-2xl italic text-[var(--color-ink)]">
                "La véritable saveur de Naples, ici à Paris."
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Notre Histoire</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Situé au 17 Rue Damrémont, La Locanda di Pulcinella est votre restaurant italien de référence à Paris. Nous mettons un point d'honneur à vous offrir une expérience culinaire authentique.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Nos pizzas sont préparées dans le plus pur respect de la tradition napolitaine : une pâte levée longuement pour une légèreté incomparable, garnie d'ingrédients frais et cuite à la perfection.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-serif text-2xl text-[var(--color-pizza-red)] mb-2">100%</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Fait Maison</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-[var(--color-pizza-red)] mb-2">D.O.P</h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Produits d'Origine</p>
              </div>
            </div>
            <a href="https://lalocandadipulcinella.com/fr/histoire" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[var(--color-pizza-red)] font-semibold hover:gap-4 transition-all">
              Découvrir notre histoire <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Notre Menu</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8">Découvrez nos spécialités, des classiques Pizze Rosse aux créations originales.</p>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {menuCategories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === category.name 
                      ? 'bg-[var(--color-pizza-red)] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeItems.map((pizza, i) => (
                <motion.div 
                  key={pizza.name} 
                  variants={fadeIn} 
                  className="group cursor-pointer bg-[var(--color-dough)] rounded-3xl p-4 hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedPizza(pizza)}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                    <img 
                      src={pizza.img} 
                      alt={pizza.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button className="bg-white text-[var(--color-ink)] px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-2xl">{pizza.name}</h3>
                      <span className="font-serif text-xl text-[var(--color-pizza-red)]">{pizza.price}</span>
                    </div>
                    {pizza.tags && pizza.tags.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {pizza.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[var(--color-basil)] text-xs font-semibold uppercase tracking-wider">
                            <Leaf className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{pizza.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <div className="text-center mt-16">
            <a href="https://lalocandadipulcinella.com/fr/menu/4627334592745963563" target="_blank" rel="noreferrer" className="inline-block border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors">
              Voir la carte complète
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-[var(--color-ink)] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-[var(--color-pizza-red)] text-[var(--color-pizza-red)]" />
            ))}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
            "Une vraie pépite dans le 18ème ! La pâte est incroyable, les ingrédients sont frais et l'accueil est chaleureux. On se croirait à Naples."
          </h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold">
            — Avis Client
          </p>
        </div>
      </section>

      {/* Visit Us / Footer */}
      <footer id="contact" className="bg-[var(--color-dough)] pt-24 pb-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Pizza className="w-8 h-8 text-[var(--color-pizza-red)]" />
                <span className="font-serif text-2xl font-bold tracking-tight">
                  La Locanda di Pulcinella
                </span>
              </div>
              <p className="text-gray-500 max-w-sm mb-8">
                Votre restaurant situé à Paris. Retrouvez une cuisine de qualité, rassemblant les plus délicieuses saveurs issues d'Italie.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[var(--color-pizza-red)] hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[var(--color-pizza-red)] hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl mb-6">Nous Trouver</h4>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--color-pizza-red)] shrink-0 mt-0.5" />
                  <a href="https://www.google.com/maps/dir/?api=1&destination=48.8884146,2.3328307" target="_blank" rel="noreferrer" className="hover:text-[var(--color-pizza-red)] transition-colors">
                    17 Rue Damrémont<br/>75018 Paris
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--color-pizza-red)] shrink-0" />
                  <a href="tel:+33142230948" className="hover:text-[var(--color-pizza-red)] transition-colors">
                    +33 1 42 23 09 48
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-xl mb-6">Informations</h4>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-basil)]"></div>
                  <span>Terrasse disponible</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-basil)]"></div>
                  <span>Accès PMR</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-basil)]"></div>
                  <span>Idéal pour les familles</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} La Locanda di Pulcinella. Créé par Centralapp Studio.</p>
            <div className="flex gap-6">
              <a href="https://lalocandadipulcinella.com/fr/mentions-legales" className="hover:text-[var(--color-ink)]">Mentions légales</a>
              <a href="https://lalocandadipulcinella.com/fr/protection-des-donnees" className="hover:text-[var(--color-ink)]">Protection des données</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
