import { useState } from 'react';
import { TriParticleCanvas } from './components/TriParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecsBento } from './components/SpecsBento';
import { BlueprintExplorer } from './components/BlueprintExplorer';
import { KitConfigurator } from './components/KitConfigurator';
import { ConceptGallery } from './components/ConceptGallery';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PreorderModal } from './components/PreorderModal';
import type { RobotEdition } from './data/robotData';

export function App() {
  const [selectedEdition, setSelectedEdition] = useState<RobotEdition['id']>('pro');
  const [selectedFinish, setSelectedFinish] = useState<string>('obsidian');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [preorderOpen, setPreorderOpen] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="relative min-h-screen bg-[#050507] bg-tech-grid text-[#F4F5F8]">
      <TriParticleCanvas />
      <Navbar onOpenPreorder={() => setPreorderOpen(true)} />

      <main>
        <Hero onOpenPreorder={() => setPreorderOpen(true)} />
        <SpecsBento />
        <BlueprintExplorer />
        <KitConfigurator
          selectedEdition={selectedEdition}
          onSelectEdition={setSelectedEdition}
          selectedFinish={selectedFinish}
          onSelectFinish={setSelectedFinish}
          selectedAddons={selectedAddons}
          onToggleAddon={toggleAddon}
          onProceedOrder={() => setPreorderOpen(true)}
        />
        <ConceptGallery />
        <FaqSection />
      </main>

      <Footer onOpenPreorder={() => setPreorderOpen(true)} />

      <PreorderModal
        open={preorderOpen}
        onClose={() => setPreorderOpen(false)}
        selectedEdition={selectedEdition}
        selectedFinish={selectedFinish}
        selectedAddons={selectedAddons}
      />
    </div>
  );
}

export default App;
