
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Beaker, Heart, ListChecks, TestTube, Wheat, Droplets, Candy, CheckCircle, AlertTriangle, Leaf } from 'lucide-react';

// Dropdown Menu Component (now displays description with HTML formatting and images)
function DropdownMenu({ title, icon: Icon, description, image, imageAlt, isOpen, onToggle }) {
  // Function to process description and convert HTML tags
  const processDescription = (desc) => {
    return desc
      .split('\n')
      .map((line, index) => {
        if (line.trim() === '') return <br key={index} />;
        
        // Process HTML tags
        const processedLine = line
          .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
          .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>');
        
        return (
          <p 
            key={index} 
            dangerouslySetInnerHTML={{ __html: processedLine }}
            className="leading-relaxed"
          />
        );
      });
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-lime-50/50 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-lime-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 text-left">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-600 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="border-t border-gray-100"
          >
            <div className="p-6 bg-gradient-to-br from-gray-50/50 to-white/50 text-gray-700 space-y-4">
              {image && (
                <div className="mb-4">
                  <img 
                    src={image} 
                    alt={imageAlt || 'Experiment image'} 
                    className="w-full max-w-md mx-auto rounded-lg shadow-md border border-gray-200"
                  />
                  {imageAlt && (
                    <p className="text-sm text-gray-500 text-center mt-2 italic">
                      {imageAlt}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {processDescription(description)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const dropdownData = [
  {
    key: 'reducing-sugars',
    title: 'Reducing Sugars (Benedict’s Test)',
    icon: Candy,
    description: `
      <b>Description:</b> Benedict’s solution detects <i>reducing sugars</i> such as glucose and fructose. When heated with these sugars, the copper(II) ions in Benedict’s reagent are reduced to copper(I) oxide, forming a colour change from blue → green → yellow → orange → brick-red depending on the sugar concentration.<br><br>
      <b>Method:</b>
      <ul>
        <li>2 mL of Sprite was placed in a clean test tube.</li>
        <li>2 mL of Benedict’s solution was added.</li>
        <li>The mixture was heated in a water bath at ~80°C for approximately 10 minutes.</li>
      </ul>
      <b>Results:</b><br>
      - <b>Trial 1:</b> Solution turned dark red after heating.<br>
      - <b>Trial 2:</b> Solution also turned brick-red<br><br>
      <b>Interpretation:</b> The colour change from blue to dark red indicates a <b>high concentration of reducing sugars</b>, approximately 60% sugar by composition.<br><br>
      <b>Conclusion:</b> The Sprite sample contains a <b>very high amount of reducing sugars</b> (mainly glucose and fructose), which is makes sense with the nutrition facts of the soft drink.<br><br>
      <div class="flex flex-col md:flex-row gap-3">
        <img src="/biochem-photos/benedict-1.jpeg" alt="Benedict’s test trial 1 showing brick-red precipitate indicating high reducing sugar concentration" class="rounded-lg shadow-md w-full md:w-1/2">
        <img src="/biochem-photos/benedict-2.jpeg" alt="Benedict’s test trial 2 showing similar brick-red precipitate confirming high reducing sugar levels" class="rounded-lg shadow-md w-full md:w-1/2">
      </div>
    `
  },
  {
    key: 'starch-test',
    title: 'Starch (Iodine Test)',
    icon: Wheat,
    description: `
      <b>Description:</b> Iodine solution reacts with starch to form a <b>blue-black complex</b>. If starch is absent, the iodine remains <b>yellow or orange-brown</b>.<br><br>
      <b>Method:</b>
      <ul>
        <li>2 mL of Sprite was placed in a clean test tube.</li>
        <li>3 drops of iodine solution were added and gently mixed.</li>
      </ul>
      <b>Results:</b><br>
      - <b>Trial 1:</b> Solution remained dark yellow (no blue-black colour formed).<br>
      - <b>Trial 2:</b> Solution again stayed clear yellow.<br><br>
      <b>Interpretation:</b> No blue-black colour indicates <b>absence of starch</b> in Sprite.<br><br>
      <b>Conclusion:</b> Sprite does not contain any starch which is consistent with its composition as a simple sugar-based drink without complex carbohydrates.<br><br>
      <div class="flex flex-col md:flex-row gap-3">
        <img src="/biochem-photos/lygol-1.jpeg" alt="Iodine test trial 1 showing yellow colour indicating absence of starch" class="rounded-lg shadow-md w-full md:w-1/2">
        <img src="/biochem-photos/lygol-2.jpeg" alt="Iodine test trial 2 showing similar yellow result confirming no starch present" class="rounded-lg shadow-md w-full md:w-1/2">
      </div>
    `
  },
  {
    key: 'fat-test',
    title: 'Fat (Emulsion Test)',
    icon: Droplets,
    description: `
      <b>Description:</b> Fats and oils are soluble in ethanol but not in water. When an ethanol extract of the food sample is added to water, a <b>milky or cloudy emulsion</b> forms if lipids are present.<br><br>
      <b>Method:</b>
      <ul>
        <li>2 mL of Sprite was mixed with 2 mL of ethanol in a test tube.</li>
        <li>After shaking, distilled water was added.</li>
      </ul>
      <b>Results:</b><br>
      - <b>Trial 1:</b> Mixture remained completely clear.<br>
      - <b>Trial 2:</b> Again, the solution stayed transparent with no cloudy layer.<br><br>
      <b>Interpretation:</b> The absence of a milky emulsion indicates <b>no lipids present</b>.<br><br>
      <b>Conclusion:</b> Sprite does not contain fats or oils, consistent with its nutritional label (0g fat). Bonus: have a look at the 3D model for nutrition label facts.<br><br>
      <div class="flex flex-col md:flex-row gap-3">
        <img src="/biochem-photos/emulsion-1.jpeg" alt="Ethanol emulsion test trial 1 showing clear solution indicating no fat" class="rounded-lg shadow-md w-full md:w-1/2">
        <img src="/biochem-photos/emulsion-2.jpeg" alt="Ethanol emulsion test trial 2 showing clear solution confirming absence of fats" class="rounded-lg shadow-md w-full md:w-1/2">
      </div>
    `
  },
  {
    key: 'protein-test',
    title: 'Protein (Biuret Test)',
    icon: TestTube,
    description: `
      <b>Description:</b> The Biuret test detects the presence of <b>peptide bonds</b> in proteins. When Biuret reagent (a mixture of copper sulfate and sodium hydroxide) reacts with proteins, it turns from <b>blue to purple</b>.<br><br>
      <b>Method:</b>
      <ul>
        <li>2 mL of Sprite was placed in a test tube.</li>
        <li>2 mL of Biuret reagent was added and mixed.</li>
      </ul>
      <b>Results:</b><br>
      - <b>Trial 1:</b> Solution remained light blue.<br>
      - <b>Trial 2:</b> Solution became dark blue.<br><br>
      <b>Interpretation:</b> The absence of a purple/violet colour indicates <b>no proteins or amino acids</b> present in Sprite.<br><br>
      <b>Conclusion:</b> Sprite contains <b>no protein</b>, as expected for a carbonated sugar solution.<br><br>
      <div class="flex flex-col md:flex-row gap-3">
        <img src="/biochem-photos/protein-1.jpeg" alt="Biuret test trial 1 showing blue solution indicating negative protein test" class="rounded-lg shadow-md w-full md:w-1/2">
        <img src="/biochem-photos/protein-2.jpeg" alt="Biuret test trial 2 showing similar blue result confirming no protein present" class="rounded-lg shadow-md w-full md:w-1/2">
      </div>
    `
  },
    {
    key: 'sprite-ingredients-full',
    title: 'Ingredients in a Classic Sprite',
    icon: Leaf,
    image: '/biochem-photos/chemical.png',
    imageAlt: 'A phenylalanine molecule',
    description: `
        <h2 class="fw-bold">Key Ingredients:</h2>
        <ul>
            <li><b>Carbonated Water:</b> Water infused with carbon dioxide for fizziness and a refreshing taste.</li>
            <li><b>Sugar (Sucrose/Glucose-Fructose Syrup):</b> Sweetens the drink and serves as the main energy source.</li>
            <li><b>Citric Acid (330):</b> Provides tartness, enhances the lemon-lime flavour, and acts as a preservative.</li>
            <li><b>Natural Flavours:</b> Extracts from lemon and lime that create Sprite's characteristic citrus taste.</li>
            <li><b>Sodium Citrate (331):</b> Functions as a buffering agent to control acidity and stabilize the flavour.</li>
            <li><b>Potassium Sorbate (202):</b> A common **preservative** that inhibits the growth of mould and yeast.</li>
            <li><b>Sodium Benzoate (211):</b> Another widely used **preservative** that controls bacteria, typically used in acidic drinks.</li>
            <li><b>Phenylalanine:</b> This amino acid is a required disclosure warning when the artificial sweetener Aspartame is used in *Diet/Zero* versions.</li>
        </ul>
        
        <hr>

        <p class="fw-bold">Nutritional Evaluation:</p>
        <p>Sprite is a source of empty calories (mainly sugar) with no essential nutrients. The high sugar content and sweeteners suggest that the drink is not a healthy choice.</p>
    `
},

  {
    key: 'errors',
    title: 'Potential Sources of Error',
    icon: AlertTriangle,
    description: `
      <b>Random Errors:</b>
      <ul>
        <li>Measurement inaccuracies due to lack of precise measuring equipment. Liquids were poured by estimation rather than using pipettes or measuring cylinders.</li>
        <li>The water bath temperature may not have been consistent due to the heating device (it was a bit weird to use) which could affect the reaction rates.</li>
      </ul>
      <b>Personal Errors:</b>
      <ul>
        <li>Inconsistent timing between trials: test tubes were left for “about 10 minutes” rather than an exact duration.</li>
      </ul>
      <b>Systematic Errors:</b>
      <ul>
        <li>The heating device used for the water bath may not have been the exact temperature we set it at (we did not test the temperature with a thermometer) which could cause uneven heating.</li>
      </ul>
    `
  },
  {
    key: 'conclusion',
    title: 'Overall Conclusion',
    icon: CheckCircle,
    description: `
        The tests on the Sprite showed these results:
        <ul>
            <li><b>Reducing sugars:</b> High amount.</li>
            <li><b>Starch:</b> None found.</li>
            <li><b>Fats:</b> Also none found.</li>
            <li><b>Proteins:</b> Not detected.</li>
        </ul>
        
        <p class="fw-bold">What the results suggest:</p>
        <p>The results make sense when you look at what Sprite is. It's mostly just sugar and water. The tests confirmed that Sprite is a high-sugar drink with no fats or protein. This shows that the energy you get from Sprite is only from simple carbs (the sugars), and it doesn't have any of the important building blocks like protein or fats.</p>
        
        <p class="fw-bold">Final Summary:</p>
        <p>This experiment proved that Sprite is mainly a source of quick energy because of the sugar it contains. It doesn't have other important nutrients. The whole experiment worked well with two trials and confirmed the facts we already knew from the nutrition label.</p>
    `
},
  {
    key: 'references',
    title: 'References',
    icon: ListChecks,
    description: `
      <ul>
        <li>https://www.coca-cola.com/us/en/brands/sprite/products#accordion-ecc962e3be-item-3d52d39708</li>
        <li>https://microbenotes.com/biuret-test-for-protein/</li>
        <li>https://smartlabel.coca-colaproductfacts.com/nutrition/index.html?upc=049000028928</li>
        <li>https://www.healthline.com/nutrition/phenylalanine</li>
      </ul>
    `
  }
];


  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent mb-4">
              Sprite - Biochemistry
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Science Project by Henry Sheffield
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Model Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-8"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Interactive Sprite 3D Model
              </h2>
              <div className="h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden bg-gray-100">
                <iframe
                  title="Sprite Can"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src="https://sketchfab.com/models/b69ee5b78260437d930201d67a8ab8e5/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_watermark=0&ui_annotations=0&ui_animations=0"
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div className="mt-6 p-4 bg-lime-50/50 rounded-xl border border-lime-200/50">
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  <span className="font-semibold text-gray-900">Note:</span> This 3D model represents an older American Sprite can design with slightly different ingredients compared to the current formulation used in our analysis.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dropdown Menus Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Biochemical Analysis Results
              </h2>
              <p className="text-gray-600">
                Click on each section below to explore detailed experimental results and conclusions
              </p>
            </div>

            {dropdownData.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
              >
                <DropdownMenu
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                  image={item.image}
                  imageAlt={item.imageAlt}
                  isOpen={openDropdowns[item.key]}
                  onToggle={() => toggleDropdown(item.key)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
        </div>
      </footer>
    </div>
  );
}
